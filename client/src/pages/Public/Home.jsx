import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Navbar from "../../components/Navbar";
import PaperCard from "../../components/PaperCard";

function Home() {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await axios.get("/papers");

      setPapers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = papers.filter((paper) => {
    return (
      paper.title.toLowerCase().includes(search.toLowerCase()) ||
      paper.authors?.join(" ").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto py-10 px-8">
          <div className="bg-white rounded-2xl shadow p-8 mb-10">
            <h1 className="text-4xl font-bold text-slate-800">
              Browse Research Papers
            </h1>

            <p className="mt-3 text-slate-500">
              Explore blockchain verified research.
            </p>

            <input
              className="mt-8 w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by paper title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filtered.map((paper) => (
              <PaperCard key={paper._id} paper={paper} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
