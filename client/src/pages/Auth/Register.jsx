import { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim())
      newErrors.name = "Name is required.";

    if (!form.email.trim())
      newErrors.email = "Email is required.";

    if (!form.password)
      newErrors.password = "Password is required.";

    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    return newErrors;
  };

  const register = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const res = await axios.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        api:
          err.response?.data?.message ||
          "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            ResearchChain
          </h1>

          <p className="text-slate-500 mt-2">
            Create your account to publish research.
          </p>

        </div>

        <form onSubmit={register} className="space-y-5">

          <div>

            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

          </div>

          {errors.api && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-3 text-sm">
              {errors.api}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 font-medium transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline"
            >
              Sign In
            </Link>
          </p>

          <Link
            to="/browse"
            className="inline-block mt-4 text-slate-600 hover:text-indigo-600"
          >
            ← Browse Papers
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;