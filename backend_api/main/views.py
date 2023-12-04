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
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from django.contrib import messages
import random
import string
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.forms import PasswordResetForm
from django.utils import timezone
from datetime import timedelta
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

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
    queryset = models.Sailor.objects.all()
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

class ExperienceCreateView(generics.CreateAPIView):
    queryset = models.Experience.objects.all()
    serializer_class = serializers.ExperienceCreateSerializer



class AvailabilityList(generics.ListCreateAPIView):
    queryset = models.Availability.objects.all()
    serializer_class=serializers.AvailabilitySerializer


def send_reset_password_code(email, code, expires_at):

 # Compose and send the email with the verification code
    subject = 'Reset Password Validation'
    message = f'Use the following code to reset your password: {code}'
    f'take into account it expires at {expires_at}'


    from_email = 'your@email.com'  # Replace with your sender email address
    recipient_list = [email]


    send_mail(subject, message, from_email, recipient_list)

class PasswordResetCodeCreateView(generics.CreateAPIView):
    queryset = models.PasswordResetCode.objects.all()
    serializer_class = serializers.PasswordResetCodeSerializer

    def create(self, serializer):
        # Extract email from the request data
        email = self.request.data.get('email')

        # Check if the user with the provided email exists
        try:
            user = models.User.objects.get(email=email)
        except models.User.DoesNotExist:
            # Handle the case where the user does not exist
            return Response({'error': 'User with this email does not exist.'}, status=400)
        except models.User.MultipleObjectsReturned:
            # Handle the case where multiple users have the same email
            return Response({'error': 'Multiple users with this email.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate code and set expiration time
        code = ''.join(random.choices(string.digits, k=6))
        expires_at = timezone.now() + timedelta(minutes=5)
        serializer = serializers.PasswordResetCodeSerializer(data={'user': user.id, 'code': code, 'expires_at': expires_at})

        if serializer.is_valid():
            serializer.save()

            # Send the reset password code via email
            send_reset_password_code(email, code, expires_at)

            # You might want to include additional logic or response data here
            return Response({'message': 'Reset code created and sent successfully.'})
        else:
            # Handle serializer validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyResetCodeAPIView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        verification_code = request.data.get('verificationCode')
        new_password = request.data.get('newPassword')



        # Validate email and verification code
        if not email or not verification_code:
            return Response({'error': 'Verification code is required.'}, status=status.HTTP_400_BAD_REQUEST)
    
                # Validate email and verification code
        if not new_password:
            return Response({'error': 'You need to provide a new Password.'}, status=status.HTTP_400_BAD_REQUEST)
 

        try:
            user_code = models.PasswordResetCode.objects.get(user__email=email, code=verification_code)
            
        except models.PasswordResetCode.DoesNotExist:
            return Response({'error': 'Invalid verification code or email.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the code has expired
        if user_code.expires_at < timezone.now():
            return Response({'error': 'Verification code has expired.'}, status=status.HTTP_400_BAD_REQUEST)

         # Get the user associated with the reset code
        user = user_code.user

        # Set the new password for the user
        user.set_password(new_password)
        user.save()

        # Optionally, you may want to invalidate the code to prevent reuse
        user_code.delete()

        return Response({'message': 'Verification and password reset successful.'}, status=status.HTTP_200_OK)
    
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

class UnbookedAvailabilitiesList(generics.ListAPIView):
    serializer_class = serializers.AvailabilitySerializer

    def get_queryset(self):
        # Assuming you have a URL parameter 'yacht_id' to specify the yacht
        yacht_id = self.kwargs['yacht_id']

        # Get all availabilities for the specified yacht
        all_availabilities = models.Availability.objects.filter(yacht_id=yacht_id)

        # Get the availability IDs that are attached to a booking
        booked_availability_ids = all_availabilities.filter(booking__isnull=False).values_list('id', flat=True)

        # Filter out the availabilities that are attached to a booking
        unbooked_availabilities = all_availabilities.exclude(id__in=booked_availability_ids)

        return unbooked_availabilities
    
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
        

class ActivateUser(View):
    template_name = 'activation_status.html'  # Change this to your template path

    def get_context_data(self, **kwargs):
        context = {}
        context['activation_status'] = self.activation_status
        return context

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = models.User.objects.get(pk=uid)

            if user is not None and default_token_generator.check_token(user, token):
                # Activate the user
                user.is_active = True
                user.save()

                self.activation_status = 'success'
                messages.success(request, 'User activated successfully')
            else:
                self.activation_status = 'error'
                messages.error(request, 'Invalid activation link')

        except Exception as e:
            self.activation_status = 'error'
            messages.error(request, str(e))

        return render(request, self.template_name, self.get_context_data())

class UserCreateView(generics.CreateAPIView):
    serializer_class = serializers.UserCreationSerializer

    def perform_create(self, serializer):
        # Check if the username already exists
        username = self.request.data.get("username")
        if models.User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # If the username does not exist, proceed with user creation
        user = serializer.save(is_active=False)  # Set is_active to False by default

        # Send activation email
        self.send_activation_email(user)
        return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)
    
    def send_activation_email(self, user):
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        activation_link = f"http://localhost:8000/api/activate/{uid}/{token}/"

        subject = 'Activate your account'
        message = f'Thank you for signing up. Use the following link to activate your account: {activation_link}'
        send_mail(subject, message, 'from@example.com', [user.email])


    def get_serializer_context(self):
        # Determine the user type based on the request data (e.g., "Sailor" or "Company").
        user_type = self.request.data.get("user_type")
        user_data = self.request.data.get(user_type.lower())  # Extract specific user data

        print(self.request.data.get("user_type"))

        context = super().get_serializer_context()
        context.update({"user_type": user_type, "user_data": user_data})
        return context

class YachtCreateView(generics.ListCreateAPIView, generics.UpdateAPIView):
    queryset = models.Yacht.objects.all()
    serializer_class = serializers.YachtDetailSerializer

    parser_classes = [ MultiPartParser, FileUploadParser, ]

    def perform_create(self, serializer):
        yacht_id = self.request.data.get('id')
        
        if yacht_id:
            # If an ID is provided, call the perform_update logic
            return self.perform_update(serializer)
        
        img = self.request.FILES.get('image')
        serializer.save(image=img)
    
    def perform_update(self, serializer):
        img = self.request.FILES.get('image')
        serializer.save(image=img)

class YachtUpdateView(generics.UpdateAPIView):
    queryset = models.Yacht.objects.all()
    serializer_class = serializers.YachtDetailSerializer

    parser_classes = [ MultiPartParser, FileUploadParser, ]
    
    def perform_update(self, serializer):
        img = self.request.FILES.get('image', None)

        # Check if the image field is present in the request
        if img is not None:
            serializer.save(image=img)
        else:
            # If image field is not present, update other fields without modifying the image
            serializer.save()

class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer

class LogoutView(View):
    def get(self, request, *args, **kwargs):
        # Perform any custom logic before logging the user out, if needed
        logout(request)