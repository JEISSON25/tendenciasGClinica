from rest_framework import serializers 
from .models import * 

class RolSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Rol
        fields = ('__all__')