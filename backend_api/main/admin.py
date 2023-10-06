from django.contrib import admin
from . import models

admin.site.register(models.Company)
admin.site.register(models.Region)
admin.site.register(models.Destination)

class ExperienceImagesInline(admin.StackedInline):
    model = models.ExperienceImage

class ExperienceAdmin(admin.ModelAdmin):
    inlines= [
        ExperienceImagesInline,
    ]
admin.site.register(models.Experience,ExperienceAdmin)