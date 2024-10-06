import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PatientsPage } from './pages/PatientsPage';
import { PatientsFormPage } from './pages/PatientsFormPage';
import { AppointmentsListPage } from './pages/AppointmentsListPage';
import AppointmentFormPage from './pages/AppointmentFormPage'; 
import Navigation from './components/Navigation'; 

function App() {
  return (
    <BrowserRouter>

  <div className="container mx-auto" >
  <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/patients" />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients-create" element={<PatientsFormPage />} />
        <Route path="/patients/:id" element={<PatientsFormPage />} />
        <Route path="/appointments/new" element={<AppointmentFormPage />} />
        <Route path="/appointments" element={<AppointmentsListPage />} />
        <Route path="/appointments/edit/:id" element={<AppointmentFormPage />} />      
      </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
