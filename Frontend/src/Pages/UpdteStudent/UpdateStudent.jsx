import React, { useEffect } from 'react'
import { useState } from 'react'
import { StaticRouterProvider, Navigate, useParams, useNavigate } from 'react-router'


const UpdateStudent = () => {
  const navigate = useNavigate()
  const { id } = useParams();


  const [name, setName] = useState("")
  const [city, setCity] = useState("")

  // fetch specific Studnet based on user click. 
  useEffect(() => {
    const main = async () => {
      let res = await fetch(`http://127.0.0.1:5000/getStudent/${id}`)
      let data = await res.json()
      setName(data["name"])
      setCity(data["city"])
    }
    main()
  }, [])

  //  Update Studen.
    let   update = async (e) => {
      e.preventDefault()
    let res = await fetch(" http://127.0.0.1:5000/updateStudent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        city
      })
    })
    if (res.ok) {
      alert("Student Updated Successfully!")
      navigate("/crud")
    }
    else {
      alert("Server facing some problem, try again please!")
    }
  }

  return (


    <>

      <div className="flex justify-center items-center h-screen ">

        <form onSubmit={update}
          className="bg-white text-black p-8 rounded-2xl shadow-lg w-80">
          <h2 className="text-2xl font-bold text-center mb-6">
            Update Student
          </h2>

          {/* ID */}
          <input
            type="number"
            name="id"
            value={id}
            className="w-full mb-4 p-2 border rounded-lg"
            required
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            value={name}
            className="w-full mb-4 p-2 border rounded-lg"
            required
            onChange={(e) => setName(e.target.value)}
          />

          {/* City */}
          <input
            type="text"
            name="city"
            value={city}
            className="w-full mb-6 p-2 border rounded-lg"
            required
            onChange={(e) => setCity(e.target.value)}
          />

          {/* Button */}
          <button type='submit'
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>

    </>
  )
}

export default UpdateStudent
