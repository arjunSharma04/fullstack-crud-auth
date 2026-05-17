import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'

const AddStudent = () => {
  const navigate= useNavigate()
  
  const[id, setId]=useState(101)
  const[name, setName]=useState("Name")
  const[city, setCity]=useState("City")
  
  const API = "https://fullstack-crud-auth.onrender.com"

 const  addStudentApi= async (e)=> { 
  e.preventDefault()
     let res= await fetch(`${API}/add`, {

      method : "POST",
      headers : { 
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        id, 
        name ,
        city 
      })
     })
     if(res.ok) {
      alert("Student Added Successfully ! ")
      navigate("/crud")
     }
     else { 
      alert("Facing some Server Issue. ")
      navigate("/crud")
     }

  }

  return (
    <>
    <div className="flex justify-center items-center h-screen ">
      
      <form onSubmit={addStudentApi}
        className="bg-white text-black p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Student
        </h2>

        {/* ID */}
        <input
          type="number"
          name="id"
          value={id}
          className="w-full mb-4 p-2 border rounded-lg"
          required
          onChange={(e)=>setId(e.target.value)}
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          value={name}
          className="w-full mb-4 p-2 border rounded-lg"
          required
          onChange={(e)=>setName(e.target.value)}
        />

        {/* City */}
        <input
          type="text"
          name="city"
          value={city}
          className="w-full mb-6 p-2 border rounded-lg"
          required
          onChange={(e)=>setCity(e.target.value)}
        />

        {/* Button */}
        <button type='submit'
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Add Student
        </button>
      </form>
    </div>

    </>
  ) 
}
export default AddStudent

