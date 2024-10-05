from django.shortcuts import render
from rest_framework import viewsets
from .models import * 
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

class medicineInventoryViewset(viewsets.ModelViewSet):
    queryset = MedicineInventory.objects.all()
    serializer_class = medicineInventorySerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = ([JWTAuthentication])
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    
    filterset_fields = ('__all__')
    search_fields = ('nameMedicine', 'description', 'quantityAvailable')
    ordering_fields = ('__all__')