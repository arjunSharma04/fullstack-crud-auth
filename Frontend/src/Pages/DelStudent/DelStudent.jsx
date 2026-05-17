import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const DelStudent = () => {
  const {id} = useParams();
  const navigate= useNavigate()
  const[name, setName]=useState("")
  const[city, setCity]=useState("")

  // Fetch Student Detail.
  useEffect(()=>{
    const main= async  ()=> { 
      let res= await fetch(`http://127.0.0.1:5000/getStudent/${id}`)
      let data= await res.json()
      setName(data["name"])
      setCity(data["city"])
    }
    main()
  },[])

  //   Delete Student.
  const del= async (e)=> {
    e.preventDefault()
    let res= await fetch(`http://127.0.0.1:5000/del/${id}`, { 
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        id
      })
    })

    if(res.ok) { 
      alert("Student Deleted Successfully!")
      navigate("/crud")
    }
    else { 
      alert("Server facing some error , Please try again!")
    }
  }

  return (
    
    <>

    <div className="flex justify-center items-center h-screen ">
      
      <form onSubmit={del}
        className="bg-white text-black p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center mb-6">
          Delete Student
        </h2>

        {/* ID */}
        <input
          type="number"
          name="id"
          defaultValue={id}
          className="w-full mb-4 p-2 border rounded-lg"
          readOnly
        />

        {/* Name */}
        <input
          type="text"
          name="name"
          value={name}
          className="w-full mb-4 p-2 border rounded-lg"
          readOnly
        />

        {/* City */}
        <input
          type="text"
          name="city"
          value={city}
          className="w-full mb-6 p-2 border rounded-lg"
          readOnly
    />

        {/* Button */}
        <button type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Delete 
        </button>
      </form>
    </div>

    </>
  ) 
}
export default DelStudent

