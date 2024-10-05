from rest_framework.routers import DefaultRouter
from ..appointments.views import *
from ..billing.views import *
from ..consultationType.views import *
from ..medicalRecords.views import *
from ..medicalSpecialties.views import *
from ..medicationInventory.views import *
from ..patients.views import *
from ..prescriptions.views import *
from ..roles.views import *
from ..users.views import *

router = DefaultRouter()

router.register(r'appointments', AppointmentViewset, basename='appointments')
router.register(r'billing', BillingViewset, basename='billing')
router.register(r'consultationType', ConsultationTypeViewset, basename='consultationType')
router.register(r'medicalRecords', MedicalRecordViewset, basename='medicalRecords')
router.register(r'medicalSpecialties', MedicalSpecialtyViewset, basename='medicalSpecialties')
router.register(r'medicationInventory', MedicationInViewset, basename='medicationInventory')
router.register(r'patients', PatientViewset, basename='patients')
router.register(r'prescriptions', PrescriptionViewset, basename='prescriptions')
router.register(r'roles', RolViewset, basename='roles')
router.register(r'users', UserViewset, basename='users')

urlpatterns = router.urls