from rest_framework import serializers
from .models import MedicalRecords
from ..Employees.models import Employees
from ..Patients.models import Patients
from ..medicineInventory.models import MedicineInventory
#from ..Employees.serializers import EmployeesSerializer

class MedicalRecordSerializers(serializers.ModelSerializer):
    # Este campo permite aceptar el ID del empleado al crear o actualizar
    idEmployees = serializers.PrimaryKeyRelatedField(queryset=Employees.objects.all())
    idPatient = serializers.PrimaryKeyRelatedField(queryset=Patients.objects.all())
    idMedicineInventory = serializers.PrimaryKeyRelatedField(queryset=MedicineInventory.objects.all())
    class Meta:
        model = MedicalRecords
        fields = ['id', 'idPatient', 'description', 'idMedicineInventory', 'idEmployees']

    def to_representation(self, instance):
        # Representación personalizada para incluir id, nombre y email del empleado en 'idEmployees'
        representation = super().to_representation(instance)
        representation['idEmployees'] = {
            'id': instance.idEmployees.id,
            'name': instance.idEmployees.firstName,
            'lastName': instance.idEmployees.lastName,
            'email': instance.idEmployees.email,
        }
        representation['idPatient'] = {
            'id': instance.idPatient.id, 
            'name': instance.idPatient.firstName,
            'lastName': instance.idPatient.lastName,
        }
        representation['idMedicineInventory'] = {
            'id': instance.idMedicineInventory.id,
            'nameMedicine': instance.idMedicineInventory.nameMedicine,
            'description': instance.idMedicineInventory.description,
        }
        return representation