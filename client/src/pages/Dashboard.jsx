import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState("");
const [abstract, setAbstract] = useState("");

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

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/papers/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPapers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPapers();

    
  }, []);

  return (
    <div>
      <h1>ResearchChain Dashboard</h1>

      <h2>Create Paper</h2>

<input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<br /><br />

<textarea
  placeholder="Abstract"
  value={abstract}
  onChange={(e) => setAbstract(e.target.value)}
/>

<br /><br />

<button onClick={createPaper}>
  Create Paper
</button>

<hr />

      <h2>My Papers</h2>

      {papers.length === 0 ? (
        <p>No papers found</p>
      ) : (
        papers.map((paper) => (
          <div
            key={paper._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Link to={`/paper/${paper._id}`}>
  <h3>{paper.title}</h3>
</Link>
            <p>{paper.abstract}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;