from django.db import models
from ..patients.models import Patient
from ..users.models import User
from ..medicalRecords.models import MedicalRecord
from ..medicationInventory.models import MedicationInventory

class Prescription(models.Model):
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
        limit_choices_to={'rol__nombre': 'Médico'},
        null=True, 
        blank=True
    )
    historia_clinica = models.ForeignKey(
        MedicalRecord,
        verbose_name="Historia Clínica",
        on_delete=models.CASCADE
    )
    medicamento = models.ForeignKey(
        MedicationInventory,
        verbose_name="Medicamento",
        on_delete=models.CASCADE,
        null=True, 
        blank=True
    )
    # Cambiar choices al front
    via_administracion = models.CharField(max_length=20, choices = [
        ('Oral', 'Oral'),
        ('Intramuscular', 'Intramuscular'),
        ('Inhalatoria', 'Inhalatoria'),
        ('Tópica', 'Tópica'),
        ], 
        default='Oral'
    )
    dosis = models.CharField("Dosis", max_length=100)
    frecuencia = models.CharField("Frecuencia", max_length=100)
    duracion = models.CharField("Duración del tratamiento", max_length=100)
    instrucciones = models.TextField("Instrucciones adicionales", blank=True, null=True)
    fecha_prescripcion = models.DateTimeField("Fecha de Prescripción", auto_now_add=True)

    def __str__(self):
        return f"Prescripción de {self.medicamento} para {self.paciente.nombre_completo} - {self.fecha_prescripcion.strftime('%Y-%m-%d')}"


