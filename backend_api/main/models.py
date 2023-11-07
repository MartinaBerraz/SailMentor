from django.db import models
from django.contrib.auth.models import User


# Model for yacht company users
class Company(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    year_built = models.IntegerField(null=True)
    description = models.TextField(null=True)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


# Model for sailor users
class Sailor(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    year_sailing_since = models.IntegerField(null=True)
    skipper_license = models.BooleanField(null=True)
    image = models.ImageField(upload_to='sailor_images/',null=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)



    def __str__(self):
        return self.user.first_name
    
# Model for region
class Region(models.Model):
    name = models.TextField(null=True)

    def __str__(self):
        return self.name
    
    def destination_list(self):
        return Destination.objects.filter(region=self)

# Model for destination
class Destination(models.Model):
    name = models.TextField(null=True)
    region = models.ForeignKey(Region,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ExperienceManager(models.Manager):
    def get_experience_choices(self):
        return tuple((yt.name, yt.name) for yt in self.all())

# Model for experience
class Experience(models.Model):
    name = models.CharField(max_length=30)

    objects = ExperienceManager()
    brief_description = models.CharField(max_length=150)
    detailed_description = models.TextField(null=True)
    recommendation = models.TextField(null=True)
    precautions = models.TextField(null=True)

    destination = models.ForeignKey(Destination,on_delete=models.CASCADE)
    sailor = models.ForeignKey(Sailor,on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    
class ExperienceImage(models.Model):
    experience=models.ForeignKey(Experience,on_delete=models.CASCADE,related_name='experience_imgs')
    image = models.ImageField(upload_to='experience_imgs/',null=True)

    def __str__(self):
        return self.image.url

class YachtTypeManager(models.Manager):
    def get_yacht_type_choices(self):
        return tuple((yt.description, yt.description) for yt in self.all())

# Model for yacht type
class YachtType(models.Model):

    objects = YachtTypeManager()

    description = models.CharField(max_length=20,null=True)
    sailing_boat = models.BooleanField(null=True)

    def __str__(self):
        return self.description


# Model for yacht
class Yacht(models.Model):
    yacht_type = models.ForeignKey(YachtType,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='yacht_imgs/', blank=True, null=True, verbose_name="image")
    name = models.CharField(max_length=30)

    max_people = models.IntegerField(null=True)
    price_per_night = models.FloatField(null=True)
    no_cabins = models.IntegerField(null=True)
    length_in_feet = models.FloatField(null=True)
    company = models.ForeignKey(Company,on_delete=models.PROTECT)
    destination = models.ForeignKey(Destination,on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class Availability(models.Model):
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    yacht = models.ForeignKey(Yacht,on_delete=models.CASCADE)

    def __str__(self):
        return self.yacht.name



class BookingStatus(models.Model):
    status = models.TextField(null=True)

    def __str__(self):
        return self.status
    
class Booking(models.Model):
    status = models.ForeignKey(BookingStatus, on_delete=models.CASCADE)
    sailor = models.ForeignKey(Sailor, on_delete=models.CASCADE)
    availability = models.ForeignKey(Availability, on_delete=models.CASCADE)

    def __str__(self):
        return self.availability.yacht.name
    
    def yacht_name(self):
        return self.availability.yacht.name
        
    def sailor_name(self):
        return self.sailor.user.username

    def start_date(self):
        return self.availability.start_date

    def end_date(self):
        return self.availability.end_date
    