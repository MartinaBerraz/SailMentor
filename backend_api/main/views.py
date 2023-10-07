from rest_framework import generics, permissions, pagination, viewsets
from django.shortcuts import render
from . import models
from . import serializers
from django.db.models import Count


class CompanyList(generics.ListCreateAPIView):
    queryset = models.Company.objects.all()
    serializer_class=serializers.CompanySerializer


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Company.objects.all()
    serializer_class=serializers.CompanyDetailSerializer


class ExperienceList(generics.ListCreateAPIView):
    queryset = models.Experience.objects.annotate(yachts_count=Count('yacht'))
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