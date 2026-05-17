import React from 'react'
import { Link, Navigate, useLocation } from 'react-router'

const ProtectedRoute = ({children}) => {
   let user = localStorage.getItem("user_name");
   const location = useLocation();

    if(!user) {  
        return <Navigate to="/login"
             state={{ from: location.pathname }}  />;
    }

    return children
}

export default ProtectedRoute


