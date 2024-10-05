from django.db import models
from model_utils.models import TimeStampedModel
from ..Patients.models import Patients
from ..Employees.models import Employees
from ..medicineInventory.models import MedicineInventory

class MedicalRecords(TimeStampedModel):
    class Meta:
        verbose_name = "MedicalRecord"
        verbose_name_plural = "MedicalRecords"
        
    idPatient = models.ForeignKey(Patients, on_delete=models.CASCADE, blank=False)
    description = models.TextField('Description', max_length=100, blank = True)
    idEmployees = models.ForeignKey(Employees, on_delete=models.CASCADE, blank=True)
    idMedicineInventory = models.ForeignKey(MedicineInventory, on_delete=models.CASCADE, blank=True)
    
    
    def __str__(self):
        return f'{self.idPatient} - {self.description}'