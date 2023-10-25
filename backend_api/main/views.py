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
import logging

logger = logging.getLogger('myapp.logger')

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
    queryset = models.Yacht.objects.all()
    serializer_class=serializers.YachtSerializer


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


class BookingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Booking.objects.all()
    serializer_class=serializers.BookingDetailSerializer


class AvailabilityList(generics.ListCreateAPIView):
    queryset = models.Availability.objects.all()
    serializer_class=serializers.AvailabilitySerializer


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
        print("HOLAA")
        print(self.request.data)
        user_serializer = serializers.UserCreationSerializer(data=self.request.data)

        logger.info("This is an info message")
        if user_serializer.is_valid():
            user = models.User.objects.create_user(**user_serializer.validated_data)
            serializer.save(user=user)
        else:
            # Handle user creation validation errors
            # For example, return a response with validation errors
            return Response(user_serializer.errors, status=400)

class UserCreateView(generics.CreateAPIView):
    serializer_class = serializers.UserCreationSerializer

    def get_serializer_context(self):
        # Determine the user type based on the request data (e.g., "Sailor" or "Company").
        user_type = self.request.data.get("user_type")
        user_data = self.request.data.get(user_type.lower())  # Extract specific user data

        print(self.request.data.get("user_type"))

        context = super().get_serializer_context()
        context.update({"user_type": user_type, "user_data": user_data})
        return context

