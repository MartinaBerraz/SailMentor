from django.contrib import admin
from . import models

admin.site.register(models.Company)
admin.site.register(models.Sailor)
admin.site.register(models.Region)
admin.site.register(models.Destination)
admin.site.register(models.Booking)
admin.site.register(models.YachtType)
admin.site.register(models.Yacht)
admin.site.register(models.BookingStatus)
admin.site.register(models.Availability)


class ExperienceImagesInline(admin.StackedInline):
    model = models.ExperienceImage

class ExperienceAdmin(admin.ModelAdmin):
    inlines= [
        ExperienceImagesInline,
    ]
admin.site.register(models.Experience,ExperienceAdmin)