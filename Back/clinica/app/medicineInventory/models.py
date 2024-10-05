from django.db import models


# Create your models here.

class MedicineInventory(models.Model):
    
    class Meta:
        verbose_name = "MedicineInventory"
        verbose_name_plural = "MedicineInventory"
        
    
    nameMedicine = models.CharField('Nombre medicamento', max_length=100)
    description = models.CharField('Descripción', max_length=500)
    quantityAvailable = models.IntegerField('Cantidad disponible')
    
    
    def __str__(self):
        return f'{self.nameMedicine} - {self.description} - {self.quantityAvailable}'