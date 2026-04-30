import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import home from "../assets/images/home.jpg";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Login Successful");

        // Optional: save login state
        localStorage.setItem("isLoggedIn", "true");

        navigate("/home");   // 👈 redirect here
      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">

      <img
        src={home}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-90 z-0"
      />

      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>

          <div className="flex justify-between text-sm mt-2">
            {/* <Link to="/reset" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link> */}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}