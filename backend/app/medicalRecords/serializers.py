from rest_framework import serializers 
from .models import * 

class MedicalRecordSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = MedicalRecord
        fields = ('__all__')