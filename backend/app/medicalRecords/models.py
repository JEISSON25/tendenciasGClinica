from django.db import models
from ..patients.models import Patient
from ..users.models import User

class MedicalRecord(models.Model):
    paciente = models.ForeignKey(
        Patient,
        verbose_name="Paciente",
        on_delete=models.CASCADE,
        null=True, 
        blank=True
    )
    medico = models.ForeignKey(
        User,
        verbose_name="Médico", 
        on_delete=models.CASCADE,
        limit_choices_to={'rol__nombre': 'Médico'}, #Filtro para que solo los usuarios con el rol de "Médico" puedan ser seleccionados
        null=True, 
        blank=True
    )
    fecha_registro = models.DateTimeField("Fecha de Registro")
    descripcion_diagnostico = models.TextField("Descripción del diagnóstico")
    #incluir llave foranea descripcion_tratamiento = models.TextField("Descripción del tratamiento")

    def __str__(self):
        return f"Historia clínica de {self.paciente.nombres}"