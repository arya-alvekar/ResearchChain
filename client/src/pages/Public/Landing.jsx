import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Landing() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-8 h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight text-slate-800">
              Publish Research with Blockchain Integrity
            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-8">
              ResearchChain enables researchers to securely publish,
              version and verify academic papers.
            </p>

            <div className="mt-10 flex justify-center gap-5">
              <Link
                to="/browse"
                className="px-7 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Browse Papers
              </Link>

              <Link
                to="/login"
                className="px-7 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
              >
                Publish Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;