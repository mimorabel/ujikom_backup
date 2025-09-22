// src/pages/Login.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // nanti dipakai buat request ke backend login
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-[800px] shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Bagian Kiri - Gambar */}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/originals/19/71/74/1971744a0e69c7838a3e5e3c2b12e5a0.jpg"
            alt="Workshop Motor"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Bagian Kanan - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="usernameOrEmail"
                placeholder="Username or Email"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <NavLink
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password
              </NavLink>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
