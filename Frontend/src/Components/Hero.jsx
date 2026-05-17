import React from 'react'
import { useNavigate } from 'react-router'

const Hero = () => {
  const navigate = useNavigate()
    const features = [
    { icon: "📋", title: "Create",  desc: "Add new records instantly" },
    { icon: "🔍", title: "Read",    desc: "Browse all your data" },
    { icon: "✏️", title: "Update",  desc: "Edit records in place" },
    { icon: "🗑️", title: "Delete",  desc: "Remove what you don't need" },
  ];

  const getStart=()=> { 
    navigate("/crud")
  }
 return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 py-16">
      
      <span className="bg-blue-900/60 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-5">
        Manage Anything
      </span>
       <h1 className="text-white text-4xl font-bold text-center leading-tight max-w-lg mb-4">
        Your data, organized &amp; under control
      </h1>
       <p className="text-slate-400 text-center max-w-md text-sm leading-relaxed mb-8">
        Create, read, update and delete records with a clean, blazing-fast interface.
        Sign in to get started or jump straight to records.
      </p>
       <div className="flex gap-3 flex-wrap justify-center mb-14">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
       onClick={()=>navigate("/crud")}
       >
          View Records
        </button>
        <button
          className="border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
       onClick={()=>navigate("/login")}
       >
          Login / Sign up
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
        {features.map((f) => (
          <div key={f.title} className="bg-slate-800 rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="text-white text-sm font-semibold">{f.title}</div>
            <div className="text-slate-500 text-xs mt-1">{f.desc}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Hero
