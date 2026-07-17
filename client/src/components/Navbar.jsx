import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-16 flex justify-between items-center px-6">

        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        >
          ResearchChain
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/browse"
            className="text-slate-600 hover:text-indigo-600 transition"
          >
            Browse Papers
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;