import React, { useState } from "react";
import "./Register.css"; // Create this file for styling if not already made
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { fname, email, mobile, password, cpassword } = formData;

  try {
    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname, email, mobile, password, cpassword }),
    });

    // Log the full response
    console.log("📥 Raw response:", res);

    let data = {};
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.warn("⚠️ Failed to parse JSON response:", jsonErr);
    }

    if (res.status === 201) {
      alert("Registration successful ✅");
      navigate("/login");
    } else {
      console.error("⚠️ Server responded with error:", data);
      alert(data.error || "Registration failed ❌");
    }
  } catch (err) {
    console.error("❌ Error registering:", err.message, err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" placeholder="Full Name" value={formData.fname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="cpassword" placeholder="Confirm Password" value={formData.cpassword} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
