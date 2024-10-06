import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="flex justify-between py-3">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/patients"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Patients
          </Link>
        </li>
        <li>
          <Link
            to="/appointments"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Appointments
          </Link>
        </li>
        <li>
          <Link
            to="/patients-create"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            Create Patient
          </Link>
        </li>
        <li>
          <Link
            to="/appointments/new"
            className="inline-block px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-800 transition"
          >
            New Appointment
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
