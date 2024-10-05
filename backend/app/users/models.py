from django.db import models
from django.contrib.auth.models import AbstractUser
from ..roles.models import Rol
from ..medicalSpecialties.models import MedicalSpecialty

class User(AbstractUser):
  nombres = models.CharField("Nombres", max_length=100)
  apellidos = models.CharField("Apellidos", max_length=100)
  telefono = models.CharField("Teléfono", max_length=10)
  fecha_nacimiento = models.DateField("Fecha de Nacimiento", null=True, blank=True)
  direccion = models.CharField("Dirección", max_length=250, null=True, blank=True)
  rol = models.ForeignKey(
     Rol, 
     verbose_name="Rol", 
     on_delete=models.CASCADE,
     null=True, 
     blank=True 
  )

  especialidad = models.ForeignKey(
        MedicalSpecialty, 
        verbose_name="Especialidad Médica", 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True 
    )
   

  def __str__(self):
    return self.nombres