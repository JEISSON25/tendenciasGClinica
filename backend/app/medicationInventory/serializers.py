from rest_framework import serializers 
from .models import * 

class MedicationInSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = MedicationInventory
        fields = ('__all__')