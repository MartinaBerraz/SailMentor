from rest_framework import serializers
from . import models
from django.db import models as django_models
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


# Company serializers
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Company
        fields=['user','name','year_built','description']
    
    def __init__(self, *args, **kwargs):
        super(CompanySerializer, self).__init__(*args, **kwargs)

class CompanyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Company
        fields=['id','name','user','year_built','description']
    
    def __init__(self, *args, **kwargs):
        super(CompanyDetailSerializer, self).__init__(*args, **kwargs)

# Sailor serializers
class SailorSerializer(serializers.ModelSerializer):

    class Meta:
        model=models.Sailor
        fields=['user','year_sailing_since','skipper_license']

    def __init__(self, *args, **kwargs):
        super(SailorSerializer, self).__init__(*args, **kwargs)

class SailorDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    image = serializers.ImageField(required=True)

    class Meta:
        model=models.Sailor
        fields=['user','year_sailing_since','skipper_license','image','username']
    
    def __init__(self, *args, **kwargs):
        super(SailorDetailSerializer, self).__init__(*args, **kwargs)


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
    images = serializers.SerializerMethodField(method_name='get_images')
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    sailor_last_name = serializers.CharField(source='sailor.last_name', read_only=True)
    sailor_first_name = serializers.CharField(source='sailor.first_name', read_only=True)

    def get_images(self, obj):
        images = obj.experience_imgs.all()
        if images:
            return [image.image.url for image in images]
        else:
            return []

    
    class Meta:
        model = models.Experience
        fields = ['id', 'name', 'destination_name', 'sailor_last_name','sailor_first_name', 'images', 'brief_description', 'detailed_description', 'precautions','recommendation','experience_imgs']
    
    def __init__(self, *args, **kwargs):
        super(ExperienceDetailSerializer, self).__init__(*args, **kwargs)


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
        fields=['id','description','sailing_boat']
    
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
    destination_name = serializers.CharField(source="destination.name", read_only=True)
    yacht_type_description = serializers.CharField(source='yacht_type.description', read_only=True)
    company_name = serializers.CharField(source='company.user.username', read_only=True)


    # company_name = serializers.SerializerMethodField()
    class Meta:
        model=models.Yacht
        fields=['id','name','company_name','destination','image','length_in_feet','no_cabins','price_per_night','year_built','max_people','yacht_type','destination_name','yacht_type_description']
   

    image = serializers.ImageField(required=True)


    # def get_company_name(self, obj):
    #     # Access the related Company object from the Experience object
    #     company = obj.company

    #     # Call the __str__ method on the Company object to get its name
    #     return str(company)

    
    def __init__(self, *args, **kwargs):
        super(YachtSerializer, self).__init__(*args, **kwargs)

# Yacht serializers
class YachtCompanySerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    yacht_type_description = serializers.CharField(source='yacht_type.description', read_only=True)

    class Meta:
        model=models.Yacht
        fields=['id','name','image','destination','destination_name','yacht_type_description','price_per_night','max_people','yacht_type','year_built',"no_cabins","length_in_feet"]
    
    def __init__(self, *args, **kwargs):
        super(YachtCompanySerializer, self).__init__(*args, **kwargs)

class YachtDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model = models.Yacht
        fields = '__all__'
        

class YachtCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Yacht
        fields = ['name', 'company', 'length_in_feet', 'no_cabins', 'price_per_night', 'max_people', 'yacht_type', 'image','year_built']

    
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
    yacht_name = serializers.CharField(source='availability.yacht.name', read_only=True)
    start_date = serializers.DateField(source='availability.start_date', read_only=True)
    end_date = serializers.DateField(source='availability.end_date', read_only=True)

    class Meta:
        model = models.Booking
        fields = ['id', 'sailor', 'availability', 'status', 'yacht_name', 'start_date', 'end_date']
    
    def __init__(self, *args, **kwargs):
        super(BookingSerializer, self).__init__(*args, **kwargs)


# Booking  serializers
class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Booking
        fields = ['id', 'sailor', 'availability', 'status','confirmation_token']
    

class BookingDetailSerializer(serializers.ModelSerializer):
      
    class Meta:
        model=models.Booking
        fields=['id','sailor','start_date','end_date','yacht_name','availability','status']
    
    def __init__(self, *args, **kwargs):
        super(BookingDetailSerializer, self).__init__(*args, **kwargs)

class BookingCompanySerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(source='availability.start_date', read_only=True)
    end_date = serializers.DateField(source='availability.end_date', read_only=True)
    yacht_name = serializers.CharField(source="availability.yacht.name", read_only=True)
    status = serializers.StringRelatedField(source="status.status", read_only=True)
    yacht_id = serializers.CharField(source="availability.yacht.id", read_only=True)


    class Meta:
        model=models.Booking
        fields=['id','sailor_name','start_date','end_date','yacht_name','status','yacht_id']
    
    def __init__(self, *args, **kwargs):
        super(BookingCompanySerializer, self).__init__(*args, **kwargs)

class BookingSailorSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(source='availability.start_date', read_only=True)
    end_date = serializers.DateField(source='availability.end_date', read_only=True)
    yacht_name = serializers.CharField(source="availability.yacht.name", read_only=True)
    status = serializers.StringRelatedField(source="status.status", read_only=True)


    class Meta:
        model=models.Booking
        fields=['id','sailor','start_date','end_date','yacht_name','status','availability']
    
    def __init__(self, *args, **kwargs):
        super(BookingSailorSerializer, self).__init__(*args, **kwargs)

# Availability  serializers
class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Availability
        fields = ['yacht', 'start_date', 'end_date']

    # def create(self, validated_data):
    #     # Create availability
    #     availability = models.Availability.objects.create(**validated_data)

    #     # Assuming Booking model has a ForeignKey to Availability named 'availability'
    #     booking_data = self.context.get("booking_data", {})
    #     booking_data['availability'] = availability

    #     # Create booking and associate it with the availability
    #     booking_serializer = BookingCreateSerializer(data=booking_data)

    #     if booking_serializer.is_valid():
    #         booking_serializer.save()

    #     return availability

class AvailabilityDetailSerializer(serializers.ModelSerializer):  
    class Meta:
        model=models.Availability
        fields=['id','yacht','start_date','end_date']
    
    def __init__(self, *args, **kwargs):
        super(AvailabilityDetailSerializer, self).__init__(*args, **kwargs)

class ModelFieldsInfoSerializer(serializers.Serializer):
    fields_info = serializers.DictField(child=serializers.CharField())


class UserCreationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = models.User
        fields = ['first_name', 'last_name', 'password', 'email','username']

    def create(self, validated_data):
        # Create the user
        user = models.User.objects.create_user(**validated_data)
        
        # Check if the request data contains the necessary information
        user_type = self.context.get("user_type")  # 'Sailor' or 'Company'
        user_data = self.context.get("user_data", {})  # Fields specific to Sailor or Company

        if user_type == 'Sailor':
            sailor = models.Sailor(user=user)
            sailor.save()
        elif user_type == 'Company':
            company = models.Company(user=user)
            company.save()

        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)


        if user:
            refresh = RefreshToken.for_user(user)

            response = {}

            response["user"] = {
                "id": user.id,
                "username": user.username,
                "email": user.email,  # Add any other user fields you need
            }

            response["access_token"] = str(refresh.access_token)

            company = models.Company.objects.filter(user=user).first()
            if company:
                response["user_type"] = "Company"
                response["user_fk"]= company.id
            else:
                sailor = models.Sailor.objects.filter(user=user).first()
                response["user_type"] = "Sailor"
                response["user_fk"]= sailor.id



        else:
            raise serializers.ValidationError("Incorrect username or password.")

        return response