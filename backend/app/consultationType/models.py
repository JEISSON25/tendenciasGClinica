from django.db import models
from ..medicalSpecialties.models import MedicalSpecialty

class ConsultationType(models.Model):
    nombre = models.CharField("Tipo de consulta", max_length=100)
    especialidad = models.ForeignKey(
        MedicalSpecialty, 
        verbose_name="Especialidad",
        on_delete=models.CASCADE, 
        null=True,
        blank=True
    )
    
    def __str__(self):
        return self.nombre