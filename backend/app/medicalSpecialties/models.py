from django.db import models

class MedicalSpecialty(models.Model):
    
    nombre = models.CharField("Nombre", max_length=100)
    
    def __str__(self):
        return f"{self.nombre}"