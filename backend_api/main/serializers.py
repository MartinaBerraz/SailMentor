from rest_framework import serializers
from . import models

# Company serializers
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Company
        fields=['user','year_built','description']
    
    def __init__(self, *args, **kwargs):
        super(CompanySerializer, self).__init__(*args, **kwargs)

class CompanyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Company
        fields=['id','user','year_built','description']
    
    def __init__(self, *args, **kwargs):
        super(CompanyDetailSerializer, self).__init__(*args, **kwargs)

# Experience serializers
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Experience
        fields=['id','brief_description','precautions','destination','company','detailed_description','recommendation']
    
    def __init__(self, *args, **kwargs):
        super(ExperienceSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1 # it will fetch the relation, now we can see user data

class ExperienceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ExperienceImage
        fields=['id','experience','image']
    

class ExperienceDetailSerializer(serializers.ModelSerializer):
    experience_imgs=ExperienceImageSerializer(many=True,read_only=True)

    class Meta:
        model=models.Experience
        fields=['id','brief_description','precautions','destination','company','detailed_description','recommendation','experience_imgs']

    
    def __init__(self, *args, **kwargs):
        super(ExperienceDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1 

# Region serializers
class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Region
        fields=['name']
    
    def __init__(self, *args, **kwargs):
        super(RegionSerializer, self).__init__(*args, **kwargs)

class RegionDetailSerializer(serializers.ModelSerializer):
    destination_list = serializers.StringRelatedField(many=True,read_only=True)

    class Meta:
        model=models.Region
        fields=['id','name','destination_list']
    
    def __init__(self, *args, **kwargs):
        super(RegionDetailSerializer, self).__init__(*args, **kwargs)

# Destination serializers
class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Destination
        fields=['name']
    
    def __init__(self, *args, **kwargs):
        super(DestinationSerializer, self).__init__(*args, **kwargs)

class DestinationDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model=models.Destination
        fields=['id','name','region']
    
    def __init__(self, *args, **kwargs):
        super(DestinationDetailSerializer, self).__init__(*args, **kwargs)

# Yacht Type serializers
class YachtTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.YachtType
        fields=['description','sailing_boat']
    
    def __init__(self, *args, **kwargs):
        super(YachtTypeSerializer, self).__init__(*args, **kwargs)

class YachtTypeDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model=models.YachtType
        fields=['id','description','sailing_boat']
    
    def __init__(self, *args, **kwargs):
        super(YachtTypeDetailSerializer, self).__init__(*args, **kwargs)


# Yacht serializers
class YachtSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Yacht
        fields=['name','experience']
    
    def __init__(self, *args, **kwargs):
        super(YachtSerializer, self).__init__(*args, **kwargs)

class YachtDetailSerializer(serializers.ModelSerializer):  
    image = serializers.ImageField(required=True)

    class Meta:
        model=models.Yacht
        fields=['id','name','experience','length_in_feet','no_cabins','price_per_night','max_people','yacht_type','year_built','image']
    
    def __init__(self, *args, **kwargs):
        super(YachtDetailSerializer, self).__init__(*args, **kwargs)

# Booking status serializers
class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.BookingStatus
        fields=['status']
    
    def __init__(self, *args, **kwargs):
        super(BookingStatusSerializer, self).__init__(*args, **kwargs)

class BookingStatusDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model=models.BookingStatus
        fields=['id','status']
    
    def __init__(self, *args, **kwargs):
        super(BookingStatusDetailSerializer, self).__init__(*args, **kwargs)

# Booking  serializers
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Booking
        fields=['sailor','experience','start_date','end_date','yacht','status']
    
    def __init__(self, *args, **kwargs):
        super(BookingSerializer, self).__init__(*args, **kwargs)

class BookingDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model=models.Booking
        fields=['id','sailor','experience','start_date','end_date','yacht','status']
    
    def __init__(self, *args, **kwargs):
        super(BookingDetailSerializer, self).__init__(*args, **kwargs)

# Availability  serializers
class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Availability
        fields=['yacht','start_date','end_date']
    
    def __init__(self, *args, **kwargs):
        super(AvailabilitySerializer, self).__init__(*args, **kwargs)

class AvailabilityDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model=models.Availability
        fields=['id','yacht','start_date','end_date']
    
    def __init__(self, *args, **kwargs):
        super(AvailabilityDetailSerializer, self).__init__(*args, **kwargs)
