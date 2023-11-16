import os
from rest_framework import generics, response, permissions, pagination, viewsets
from django.shortcuts import render
from . import models
from . import serializers
from django.db.models import Count
from rest_framework.views import APIView
from django.apps import apps
from django.http import Http404
from rest_framework.response import Response
from .utils import get_model_fields_info
from .serializers import ModelFieldsInfoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserLoginSerializer
from django.contrib.auth import logout
from django.views import View
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from django.core.mail import send_mail
import secrets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.request import Request

class CompanyList(generics.ListCreateAPIView):
    queryset = models.Company.objects.all()
    serializer_class=serializers.CompanySerializer

    
class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Company.objects.all()
    serializer_class=serializers.CompanyDetailSerializer

class SailorList(generics.ListCreateAPIView):
    queryset = models.Company.objects.all()
    serializer_class=serializers.SailorSerializer

    
class SailorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Company.objects.all()
    serializer_class=serializers.SailorDetailSerializer


class ExperienceList(generics.ListCreateAPIView):
    queryset = models.Experience.objects.all()
    serializer_class=serializers.ExperienceSerializer


class ExperienceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Experience.objects.all()
    serializer_class=serializers.ExperienceDetailSerializer

class ExperienceDetailList(generics.ListCreateAPIView):
    queryset = models.Experience.objects.all()
    serializer_class=serializers.ExperienceDetailSerializer


class DestinationList(generics.ListCreateAPIView):
    queryset = models.Destination.objects.all()
    serializer_class=serializers.DestinationSerializer


class DestinationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Destination.objects.all()
    serializer_class=serializers.DestinationDetailSerializer


class RegionList(generics.ListCreateAPIView):
    queryset = models.Region.objects.all()
    serializer_class=serializers.RegionSerializer


class RegionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Region.objects.all()
    serializer_class=serializers.RegionDetailSerializer

class YachtTypeList(generics.ListCreateAPIView):
    queryset = models.YachtType.objects.all()
    serializer_class=serializers.YachtTypeSerializer


class YachtTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.YachtType.objects.all()
    serializer_class=serializers.YachtTypeDetailSerializer

class YachtList(generics.ListCreateAPIView):
    serializer_class=serializers.YachtSerializer
    queryset = models.Yacht.objects.all()


class YachtCompanyList(generics.ListAPIView):
    queryset = models.Yacht.objects.all()  # Queryset for all yachts
    serializer_class = serializers.YachtCompanySerializer  # Serializer for the response data

    def get_queryset(self):
        # Get the company's foreign key from the URL parameter 
        company_fk = self.kwargs['company_fk']
        
        # Filter yachts based on the company's foreign key
        return models.Yacht.objects.filter(company__id=company_fk)
    

class YachtDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Yacht.objects.all()
    serializer_class=serializers.YachtDetailSerializer

class YachtFields(generics.ListCreateAPIView):
    queryset = models.Yacht._meta.fields
    serializer_class=serializers.YachtFieldMetadataSerializer

class BookingStatusList(generics.ListCreateAPIView):
    queryset = models.BookingStatus.objects.all()
    serializer_class=serializers.BookingStatusSerializer


class BookingStatusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.BookingStatus.objects.all()
    serializer_class=serializers.BookingStatusDetailSerializer

class BookingList(generics.ListCreateAPIView):
    queryset = models.Booking.objects.all()
    serializer_class=serializers.BookingSerializer

class BookingCompanyList(generics.ListAPIView):
    queryset = models.Booking.objects.all()  # Queryset for all yachts
    serializer_class = serializers.BookingCompanySerializer  # Serializer for the response data

    def get_queryset(self):
        # Get the company's foreign key from the URL parameter 
        company_fk = self.kwargs['company_fk']
        
        # Step 1: Get the list of yacht IDs owned by the company
        yacht_ids_owned_by_company = models.Yacht.objects.filter(company__id=company_fk).values_list('id', flat=True)

        # Step 2: Filter the bookings based on the condition
        queryset = models.Booking.objects.filter(availability__yacht__id__in=yacht_ids_owned_by_company)

        return queryset

class BookingSailorList(generics.ListAPIView):
    queryset = models.Booking.objects.all()  # Queryset for all yachts
    serializer_class = serializers.BookingSailorSerializer  # Serializer for the response data

    def get_queryset(self):
        sailor_fk = self.kwargs['sailor_fk']
        queryset = models.Booking.objects.filter(sailor__id=sailor_fk)

        return queryset
    
class BookingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Booking.objects.all()
    serializer_class=serializers.BookingDetailSerializer

class BookingCreateView(generics.CreateAPIView):
    queryset = models.Booking.objects.all()
    serializer_class = serializers.BookingCreateSerializer



class AvailabilityList(generics.ListCreateAPIView):
    queryset = models.Availability.objects.all()
    serializer_class=serializers.AvailabilitySerializer

def send_booking_confirmation_email(booking, user):
    # Get sailor email using sailor_id
    sailor_email = user.email
    confirmation_url = f'http://localhost:8000/api/confirm_booking/{booking.confirmation_token}/'


 # Compose and send the email with the booking token
    subject = 'Booking Confirmation'
    message = f'Thank you for your booking. Your booking ID is {booking.id}. ' \
            f'Use the following link to confirm your booking: {confirmation_url}'

    from_email = 'your@email.com'  # Replace with your sender email address
    recipient_list = [sailor_email]


    send_mail(subject, message, from_email, recipient_list)

@api_view(('GET',))
@renderer_classes([TemplateHTMLRenderer, JSONRenderer])  # Set the appropriate renderer
def confirm_booking(request, token):
    # Find the booking associated with the token

    booking = get_object_or_404(models.Booking, confirmation_token=token)

        # Assuming 'confirmed' is a status in your BookingStatus model
    confirmed_status = models.BookingStatus.objects.get(status='Confirmed')
    
    # Perform the booking confirmation logic (e.g., change status)
    booking.status = confirmed_status
    booking.save()
    

    response_data = {'success': True, 'bookingId': booking.id}

    if 'text/html' in request.headers.get('Accept', ''):
        return Response(response_data, template_name='confirmation_template.html')
    else:
        # Otherwise, return JSON response
        return Response(response_data, status=status.HTTP_200_OK)

class AvailabilityCreateView(generics.CreateAPIView):
    queryset = models.Availability.objects.all()
    serializer_class=serializers.AvailabilitySerializer

    def perform_create(self, serializer):
        # Extract sailor ID and availability data from the request
        sailor_id = self.request.data.get("sailor_id")
        availability_data = self.request.data.get("availability")

        # Additional data for the booking
        booking_data = {
            'sailor': sailor_id,
            'status': 1,  # Assuming 1 is the ID of the "pending" status
            'confirmation_token': secrets.token_urlsafe(32),
        }

        # Create availability and associate it with the booking
        availability = serializer.save()
        booking_serializer = serializers.BookingCreateSerializer(data={'availability': availability.id, **booking_data})

        if booking_serializer.is_valid():
            booking = booking_serializer.save()
            send_booking_confirmation_email(booking, models.Sailor.objects.get(id=sailor_id).user)

            return Response(booking_serializer.data, status=status.HTTP_201_CREATED)
        else:
            availability.delete()  # Rollback availability creation if booking creation fails
            return Response(booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AvailabilityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Availability.objects.all()
    serializer_class=serializers.AvailabilityDetailSerializer


class ModelFieldsInfoView(APIView):
    def get(self, request, model_name):
        fields_info = get_model_fields_info(model_name)
        if fields_info is not None:
            serializer = ModelFieldsInfoSerializer(data={'model_name': model_name, 'fields_info': fields_info})
            if serializer.is_valid():
                return Response(serializer.data)
        return Response({'error': 'Model not found'}, status=404)

class SailorCreateView(generics.CreateAPIView):
    queryset = models.Sailor.objects.all()
    serializer_class = serializers.SailorSerializer


    def perform_create(self, serializer):
        # Create a new user
        print(self.request.data)
        user_serializer = serializers.UserCreationSerializer(data=self.request.data)

        if user_serializer.is_valid():
            user = models.User.objects.create_user(**user_serializer.validated_data)
            serializer.save(user=user)
        else:
            # Handle user creation validation errors
            # For example, return a response with validation errors
            return Response(user_serializer.errors, status=400)

class UserCreateView(generics.CreateAPIView):
    serializer_class = serializers.UserCreationSerializer

    def perform_create(self, serializer):
        # Check if the username already exists
        username = self.request.data.get("username")
        if models.User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # If the username does not exist, proceed with user creation
        serializer.save()
        return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)


    def get_serializer_context(self):
        # Determine the user type based on the request data (e.g., "Sailor" or "Company").
        user_type = self.request.data.get("user_type")
        user_data = self.request.data.get(user_type.lower())  # Extract specific user data

        print(self.request.data.get("user_type"))

        context = super().get_serializer_context()
        context.update({"user_type": user_type, "user_data": user_data})
        return context

class YachtCreateView(generics.ListCreateAPIView):
    queryset = models.Yacht.objects.all()
    serializer_class = serializers.YachtDetailSerializer

    parser_classes = [ MultiPartParser, FileUploadParser, ]

    def perform_create(self, serializer):
        print(self.request)

        img = self.request.FILES['image']  
        if img:
            serializer.save(image=img)
        else:
            serializer.save()
    
class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer

class LogoutView(View):
    def get(self, request, *args, **kwargs):
        # Perform any custom logic before logging the user out, if needed
        logout(request)