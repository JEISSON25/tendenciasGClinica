# Generated by Django 5.1.1 on 2024-09-29 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MedicationInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_medicamento', models.CharField(max_length=50, verbose_name='Nombre Medicamento')),
                ('descripcion', models.TextField(max_length=200, verbose_name='Descripción')),
                ('cantidad_disponible', models.IntegerField(verbose_name='Cantidad Disponible')),
                ('costo', models.DecimalField(decimal_places=2, max_digits=15, verbose_name='Costo')),
            ],
        ),
    ]
