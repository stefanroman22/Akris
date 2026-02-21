from django.urls import path
from .views import competition_data

urlpatterns = [
    path('', competition_data, name='competition-api'),
]
