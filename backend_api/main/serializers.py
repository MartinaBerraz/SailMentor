from rest_framework import serializers
from . import models
from django.db import models as django_models


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

# Sailor serializers
class SailorSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Sailor
        fields=['user','year_sailing_since','skipper_license']
    
    def __init__(self, *args, **kwargs):
        super(CompanySerializer, self).__init__(*args, **kwargs)

class SailorDetailSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)

    class Meta:
        model=models.Sailor
        fields=['user','year_sailing_since','skipper_license','image']
    
    def __init__(self, *args, **kwargs):
        super(CompanyDetailSerializer, self).__init__(*args, **kwargs)


# Experience serializers
class ExperienceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(method_name='get_image')

    sailor_name = serializers.SerializerMethodField()

    destination_name = serializers.SlugRelatedField(
        source='destination',  # Name of the foreign key field in the Booking model
        slug_field='name',  # Name of the field in the Yacht model to retrieve (in this case, 'name')
        read_only=True  # Make it read-only
        )
    
    def get_image(self, obj):
        # Check if experience_imgs is not empty
        if obj.experience_imgs.exists():
            first_image = obj.experience_imgs.first()
            return first_image.image.url  # Assuming you have an 'image' field in the ExperienceImage model
        else:
            return None  # Return None if there are no images

    
    def get_sailor_name(self, obj):
        # Access the related Company object from the Experience object
        sailor = obj.sailor

        # Call the __str__ method on the Company object to get its name
        return str(sailor)
    
    # yachts_count = serializers.IntegerField()  # Add this field for yachts_count

    class Meta:
        model=models.Experience
        fields=['id','name','destination_name','sailor_name','image', 'brief_description']
    
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
        
    # def get_yachts(self, obj):
    #     # Retrieve and serialize the boats associated with the current experience
    #     yachts = models.Yacht.objects.filter(experience=obj)
    #     return YachtSerializer(yachts, many=True).data

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
        fields=['id','name']
    
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
        fields=['id','name','company']
    
    def __init__(self, *args, **kwargs):
        super(YachtSerializer, self).__init__(*args, **kwargs)

class YachtDetailSerializer(serializers.ModelSerializer):  
    image = serializers.ImageField(required=True)

    class Meta:
        model=models.Yacht
        fields=['id','name','company','length_in_feet','no_cabins','price_per_night','max_people','yacht_type','year_built','image']
    
    def __init__(self, *args, **kwargs):
        super(YachtDetailSerializer, self).__init__(*args, **kwargs)

# serializer for form data
class YachtFieldMetadataSerializer(serializers.ModelSerializer):
    yacht_type_choices = serializers.SerializerMethodField()

    class Meta:
        model = models.Yacht  # Specify the model you want to serialize
        fields = '__all__'  # Include all fields from the model
    
    _field_info = None  # Class-level variable to cache field information

    def get_field_info(cls):
        if cls._field_info is None:
            model = cls.Meta.model
            fields = model._meta.fields
            field_info = []

            for field in fields:
                field_type = field.get_internal_type()
                if isinstance(field, django_models.ForeignKey):
                    field_type = "ForeignKey"
                field_info.append({
                    "name": field.name,
                    "type": field_type,
                })

            cls._field_info = field_info
        return cls._field_info

    def to_representation(self, instance):
        field_info = self.get_field_info()
        return field_info

        
    def get_yacht_type_choices(self, obj):
        return models.YachtType.objects.get_yacht_type_choices()
    

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
    sailor_name = serializers.SerializerMethodField()

    def get_sailor_name(self, obj):
        # Access the related Company object from the Experience object
        sailor = obj.sailor

        # Call the __str__ method on the Company object to get its name
        return str(sailor)

    yacht_name = serializers.SlugRelatedField(
        source='yacht',  # Name of the foreign key field in the Booking model
        slug_field='name',  # Name of the field in the Yacht model to retrieve (in this case, 'name')
        read_only=True  # Make it read-only
        )
    
    b_status = serializers.SlugRelatedField(
        source='status',  # Name of the foreign key field in the Booking model
        slug_field='status',  # Name of the field in the Yacht model to retrieve (in this case, 'name')
        read_only=True  # Make it read-only
        )
    
    
    class Meta:
        model=models.Booking
        fields=['id','sailor_name','start_date','end_date','yacht_name','b_status']
    
    def __init__(self, *args, **kwargs):
        super(BookingSerializer, self).__init__(*args, **kwargs)

class BookingDetailSerializer(serializers.ModelSerializer):
      
    class Meta:
        model=models.Booking
        fields=['id','sailor','start_date','end_date','yacht','status']
    
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
