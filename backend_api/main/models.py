from django.db import models
from django.contrib.auth.models import User

# Model for yacht company users
class Company(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    year_built = models.IntegerField(null=True)
    description = models.TextField(null=True)

    def __str__(self):
        return self.user.username


# Model for sailor users
class Sailor(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    year_sailing_since = models.IntegerField(null=True)
    skipper_license = models.BooleanField(null=True)
    image = models.ImageField(upload_to='sailor_images/')


    def __str__(self):
        return self.user.username
    
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

# Model for experience
class Experience(models.Model):
    name = models.CharField(max_length=30)

    brief_description = models.CharField(max_length=150)
    detailed_description = models.TextField(null=True)
    recommendation = models.TextField(null=True)
    precautions = models.TextField(null=True)

    destination = models.ForeignKey(Destination,on_delete=models.CASCADE)
    company = models.ForeignKey(Company,on_delete=models.CASCADE)


    def __str__(self):
        return self.name
    
    
class ExperienceImage(models.Model):
    experience=models.ForeignKey(Experience,on_delete=models.CASCADE,related_name='experience_imgs')
    image = models.ImageField(upload_to='experience_imgs/',null=True)

    def __str__(self):
        return self.image.url


# Model for yacht type
class YachtType(models.Model):
    description = models.CharField(max_length=20,null=True)
    sailing_boat = models.BooleanField(null=True)

    def __str__(self):
        return self.description

# Model for yacht
class Yacht(models.Model):
    yacht_type = models.ForeignKey(YachtType,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='yacht_imgs/', blank=True, null=True)

    name = models.CharField(max_length=20,null=True)
    year_built = models.IntegerField(null=True)
    max_people = models.IntegerField(null=True)
    price_per_night = models.FloatField(null=True)
    no_cabins = models.IntegerField(null=True)
    length_in_feet = models.FloatField(null=True)
    experience = models.ForeignKey(Experience,on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class Availability(models.Model):
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)


class BookingStatus(models.Model):
    status = models.TextField(null=True)

    def __str__(self):
        return self.status
    
class Booking(models.Model):
    status = models.ForeignKey(BookingStatus,on_delete=models.CASCADE)
    experience = models.ForeignKey(Experience,on_delete=models.CASCADE)
    sailor = models.ForeignKey(Sailor,on_delete=models.CASCADE)
    yacht = models.ForeignKey(Yacht,on_delete=models.CASCADE)

    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.status
    

class Review(models.Model):
    rating = models.IntegerField(null=True)
    comment = models.TextField(null=True)
    booking = models.ForeignKey(Booking,on_delete=models.CASCADE)

    def __str__(self):
        return self.comment