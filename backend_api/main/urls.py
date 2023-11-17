from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('companies/',views.CompanyList.as_view()),
    path('company/<int:pk>/',views.CompanyDetail.as_view()),
    path('experiences/',views.ExperienceDetailList.as_view()),
    path('experience/<int:pk>/',views.ExperienceDetail.as_view()),
    path('regions/',views.RegionList.as_view()),
    path('region/<int:pk>/',views.RegionDetail.as_view()),
    path('destinations/',views.DestinationList.as_view()),
    path('destination/<int:pk>/',views.DestinationDetail.as_view()),
    path('yachts/',views.YachtList.as_view()),
    path('yachts/<int:company_fk>/',views.YachtList.as_view()),
    path('yachts/company/<int:company_fk>/', views.YachtCompanyList.as_view(), name='fetch_yachts_by_company_fk'),
    path('yacht/<int:pk>/',views.YachtDetail.as_view()),
    path('yachtTypes/',views.YachtTypeList.as_view()),
    path('yachtType/<int:pk>/',views.YachtTypeDetail.as_view()),
    path('bookings/<int:pk>/',views.BookingDetail.as_view()),
    path('bookings/<int:pk>/',views.BookingList.as_view()),
    path('bookings/company/<int:company_fk>/',views.BookingCompanyList.as_view()),
    path('bookings/sailor/<int:sailor_fk>/',views.BookingSailorList.as_view()),
    path('booking/<int:pk>/',views.BookingDetail.as_view()),
    path('availabilities/<int:pk>/',views.AvailabilityDetail.as_view()),
    path('availabilities/',views.AvailabilityList.as_view()),
    path('bookingStatus/',views.BookingStatusList.as_view()),
    path('bookingStatus/<int:pk>/',views.BookingStatusDetail.as_view()),
    path('yachts-fields/', views.YachtFields.as_view()),
    path('fields-info/<str:model_name>/', views.ModelFieldsInfoView.as_view(), name='fields-info'),
    path('sailors/', views.SailorList.as_view()),
    path('create_user/', views.UserCreateView.as_view(), name='user-create'),
    path('create_yacht/',views.YachtCreateView.as_view(), name='yacht-create'),
    path('update_yacht/<int:pk>/',views.YachtUpdateView.as_view(), name='yacht-update'),
    path('activate/<str:uidb64>/<str:token>/', views.ActivateUser.as_view(), name='activate_user'),
    path('create_booking/',views.AvailabilityCreateView.as_view(), name='booking-create'),
    path('login/', views.UserLoginView.as_view(), name='token_obtain_pair'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('confirm_booking/<str:token>/', views.confirm_booking, name='confirm_booking'),


    ]