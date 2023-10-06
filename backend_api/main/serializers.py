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
        fields=['id','brief_description','precautions','destination','company','detailed_description','recommendation','experience_imgs']
    
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
