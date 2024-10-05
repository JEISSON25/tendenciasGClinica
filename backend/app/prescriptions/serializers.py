from rest_framework import serializers 
from .models import * 

class PrescriptionSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Prescription
        fields = ('__all__')