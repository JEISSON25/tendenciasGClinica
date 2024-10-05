from rest_framework import serializers 
from .models import * 

class ConsultationTypeSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = ConsultationType
        fields = ('__all__')