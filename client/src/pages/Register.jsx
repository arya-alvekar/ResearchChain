import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "researcher",
  });

  const register = async () => {
    try {
      const res = await axios.post("/auth/register", form);
  
      console.log("REGISTER SUCCESS:", res.data);
  
      navigate("/");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;