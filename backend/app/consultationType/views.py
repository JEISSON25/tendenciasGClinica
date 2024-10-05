from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *

class ConsultationTypeViewset(viewsets.ModelViewSet):
    queryset = ConsultationType.objects.all()
    serializer_class = ConsultationTypeSerializer
