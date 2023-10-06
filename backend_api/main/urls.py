from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path('companies/',views.CompanyList.as_view()),
    path('company/<int:pk>/',views.CompanyDetail.as_view()),
    path('experiences/',views.ExperienceList.as_view()),
    path('experience/<int:pk>/',views.ExperienceDetail.as_view()),
    path('regions/',views.RegionList.as_view()),
    path('region/<int:pk>/',views.RegionDetail.as_view()),
    path('destinations/',views.DestinationList.as_view()),
    path('destination/<int:pk>/',views.DestinationDetail.as_view())
    
    ]
