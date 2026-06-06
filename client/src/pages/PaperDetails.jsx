import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function PaperDetails() {
  const { id } = useParams();

  const [versions, setVersions] = useState([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/versions/paper/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVersions(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVersions();
  }, [id]);

  const createVersion = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `/versions/${id}`,
        {
          notes,
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

  const uploadFile = async (versionId, file) => {
    try {
      console.log("Uploading:", file);
  
      const token = localStorage.getItem("token");
  
      const formData = new FormData();
      formData.append("paper", file);
  
      const res = await axios.post(
        `/versions/upload/${versionId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("SUCCESS:", res.data);
  
      alert("Upload successful");
  
      window.location.reload();
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
  
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Paper Details</h1>

      <input
        placeholder="Version notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={createVersion}>Create Version</button>

      <hr />

      {versions.map((version) => (
        <div
          key={version._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Version {version.versionNumber}</h3>

          <p>{version.notes}</p>

          <p>Hash: {version.fileHash}</p>

          <p>CID: {version.ipfsCID}</p>

          <p>Tx: {version.txHash}</p>
          <p>{version.notes}</p>
          <input
            type="file"
            onChange={(e) => uploadFile(version._id, e.target.files[0])}
          />
        </div>
      ))}
    </div>
  );
}

export default PaperDetails;
