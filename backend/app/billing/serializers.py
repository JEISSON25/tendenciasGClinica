from rest_framework import serializers 
from .models import * 

class BillingSerializer(serializers.ModelSerializer): 

    class Meta: 
        model = Billing
        fields = ('__all__')