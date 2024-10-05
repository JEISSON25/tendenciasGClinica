from django.shortcuts import render
from rest_framework import viewsets
from .models import Billing
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import BillingsSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

class BillingsViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingsSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = ([JWTAuthentication])
    
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,  
        filters.OrderingFilter,
    ]
    
    filterset_fields = ('__all__')
    search_fields = ('idPatient__firstName', 'idMedicalRecords__description', 'date','paymentStatus')
    ordering_fields = ('__all__')