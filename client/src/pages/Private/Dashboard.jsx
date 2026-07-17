import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Dashboard() {
  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/papers/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPapers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createPaper = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/papers",
        {
          title,
          abstract,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setAbstract("");

      fetchPapers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-6xl mx-auto p-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Research Dashboard
          </h1>

          <p className="text-slate-500 mt-2 mb-8">
            Create and manage your research papers.
          </p>

          {/* Create Paper Card */}

          <div className="bg-white rounded-xl shadow-md p-6 mb-10">

            <h2 className="text-xl font-semibold mb-5">
              Create New Paper
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Paper Title"
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows="5"
              placeholder="Abstract"
              className="w-full border rounded-lg p-3 mb-5 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              onClick={createPaper}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
            >
              Create Paper
            </button>

          </div>

          <h2 className="text-2xl font-semibold mb-5">
            My Papers
          </h2>

          {papers.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center text-slate-500">
              You haven't uploaded any papers yet.
            </div>
          ) : (
            <div className="grid gap-5">

              {papers.map((paper) => (

                <div
                  key={paper._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
                >

                  <Link to={`/paper/${paper._id}`}>
                    <h3 className="text-xl font-semibold text-indigo-600 hover:underline">
                      {paper.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 mt-3 line-clamp-2">
                    {paper.abstract}
                  </p>

                  <div className="mt-5">

                    <button
                      onClick={() =>
                        navigate(`/manage-paper/${paper._id}`)
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      Manage Paper →
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;