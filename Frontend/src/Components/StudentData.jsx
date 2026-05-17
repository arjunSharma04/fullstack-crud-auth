import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

const StudentData = () => {
  const [student, setStudent] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const main = async () => {
      let res = await fetch("http://127.0.0.1:5000/getAllData")
      let data = await res.json()
      setStudent(data)
    }
    main()
  }, [])

  const addHandler = () => navigate("/addStudent")
  const updateHandler = (id) => navigate(`/updateStudent/${id}`)
  const delHandler = (id) => navigate(`/delStudent/${id}`)

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Student Records</h1>
            <p className="text-sm text-slate-400 mt-0.5">{student.length} total students</p>
          </div>
          <button
            onClick={addHandler}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            + Add Student
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-16">ID</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">City</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>

            <tbody>
              {student.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-400">
                    No students found.{" "}
                    <button onClick={addHandler} className="text-blue-500 hover:underline">
                      Add one?
                    </button>
                  </td>
                </tr>
              ) : (
                student.map((s, i) => (
                  <tr
                    key={s.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      i !== student.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{s.id}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">{s.name}</td>
                    <td className="px-5 py-3.5 text-slate-500">{s.city}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => updateHandler(s.id)}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-md mr-2 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => delHandler(s.id)}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-1.5 rounded-md transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  )
}

export default StudentData