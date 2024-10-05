from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *

class MedicationInViewset(viewsets.ModelViewSet):
    queryset = MedicationInventory.objects.all()
    serializer_class = MedicationInSerializer
    
 