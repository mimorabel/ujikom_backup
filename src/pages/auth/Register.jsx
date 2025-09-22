import React from 'react';
import {useState} from 'react'
import { NavLink } from 'react-router';
import LoginPage from './LoginPage';

export default function Register(){
const [username, setUsername] = useState();
const [email, setEmail] = useState();
const [noTelp, setNoTelp] = useState();
const [password, setPassword] = useState(); 
const [formData, setFormData] = useState({
    username: "",
    email: "",
    noTelp: "",
    password: "",
})

const handleChange = (e) => {
    setFormData({
        ...formData, [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
};

    return(
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Bagian Kiri - Gambar */}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/736x/7f/7d/52/7f7d5283dbd87739602030e2023aacee.jpg" 
            alt="Workshop Motor"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Bagian Kanan - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-around">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label htmlFor='username'>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
            <label htmlFor='email'>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
            <label htmlFor='noTelp'>No Telepon</label>
              <input
                type="text"
                name="noTelp"
                placeholder="No Telp"
                value={formData.noTelp}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
            <label htmlFor='password'>Password</label>
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
              <NavLink to="/LoginPage">
                Already have Account?  Sign In Here
              </NavLink>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )  
}