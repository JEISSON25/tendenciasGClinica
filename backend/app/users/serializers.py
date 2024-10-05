from rest_framework import serializers 
from .models import * 

class UserSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = User
        fields = ('__all__')
        
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nombres', 'apellidos', 'email', 'telefono', 'fecha_nacimiento', 'direccion', 'rol', 'especialidad') 
        
