import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  {/*const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // nanti dipakai buat request ke backend login
  };*/}
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login berhasil!");
      navigate("/dashboard"); // redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/*gambar kiri*/}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/736x/7f/7d/52/7f7d5283dbd87739602030e2023aacee.jpg"
            alt="Workshop Motor"
            className="h-full w-full object-cover"
          />
        </div>

        {/*form kanan*/}
        <div className="w-1/2 p-10 flex flex-col justify-evenly">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor='email'>Username</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-none"
                required
              />
            </div>
            <div>
            <label htmlFor='password'>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-none"
                required
              />
            </div>
        
            <div className="flex justify-between items-center pt-2">
              <div className="flex text-sm flex-row gap-1">
                <NavLink to="/Register" className={`text-sm text-blue-900 hover:underline`}>
                  Create New Account
                </NavLink>
                <p className="text-sm">or</p>
                <NavLink to="/forgot-password" className={`text-sm text-blue-900 hover:underline`}>
                  Forgot Password
                </NavLink>
              </div>
              
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
