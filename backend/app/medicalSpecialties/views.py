from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

class MedicalSpecialtyViewset(viewsets.ModelViewSet):
    queryset = MedicalSpecialty.objects.all()
    serializer_class = MedicalSpecialtySerializer