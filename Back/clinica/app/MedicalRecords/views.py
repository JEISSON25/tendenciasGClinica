from django.shortcuts import render
from rest_framework import viewsets
from .models import MedicalRecords
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import MedicalRecordSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

class MedicalRecordViewSet(viewsets.ModelViewSet):
    queryset = MedicalRecords.objects.all()
    serializer_class = MedicalRecordSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = ([JWTAuthentication])
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,  
        filters.OrderingFilter,
    ]
    
    filterset_fields = ('__all__')
    search_fields = ('id', 'idPatient__firstName', 'idEmployees__firstName', 'idMedicineInventory__nameMedicine')
    ordering_fields = ('__all__')