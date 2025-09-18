import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();
    if (user?.role !== "admin") {
      return <Navigate to="/dashboard" />
    }
    return (
        <div>Admin</div>
    )
}

export default AdminDashboard