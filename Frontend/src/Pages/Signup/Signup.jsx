import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { IconArrowLeft } from "@tabler/icons-react"

const Signup = () => {
  const navigate = useNavigate()
  const [user_name, setuserName] = useState('username_1')
  const [password, setPassword] = useState('password')

  let signupUser = async (e) => {
    e.preventDefault()
    let res = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name, password })
    })
    if (res.ok) {
      alert("User Added Successfully!")
      navigate("/login")
    } else {
      alert("Please try again!")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 w-full max-w-sm">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-6"
        >
          <IconArrowLeft size={15} />
          Back to home
        </button>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-slate-800">Create an account</h1>
          <p className="text-sm text-slate-400 mt-1">Welcome! Please enter your details.</p>
        </div>

        <form onSubmit={signupUser} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={user_name}
              name="user_name"
              onChange={(e) => setuserName(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors mt-2"
          >
            Sign up
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-slate-400 mt-2">
            Already have an account?{' '}
            <span
              onClick={() => navigate("/login")}
              className="text-slate-800 font-medium hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Signup