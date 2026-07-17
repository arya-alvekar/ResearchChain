import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Navbar from "../../components/Navbar";

function PaperDetails() {
  const { id } = useParams();

  const [versions, setVersions] = useState([]);
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    fetchVersions();
  }, [id]);

  const fetchVersions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`/versions/paper/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVersions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createVersion = async () => {
    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Create the version first
      const versionRes = await axios.post(
        `/versions/${id}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Upload the PDF to the new version
      const formData = new FormData();
      formData.append("paper", selectedFile);

      await axios.post(`/versions/upload/${versionRes.data._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Version created successfully.");

      setNotes("");
      setSelectedFile(null);

      fetchVersions();
    } catch (err) {
      console.error(err);
      alert("Failed to create version.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Paper Versions
          </h1>
          <p className="text-slate-500 mb-8">
            Upload and verify versions of your research paper.
          </p>
          {/* Create Version */}

          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Create New Version</h2>

            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Version notes..."
              className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload PDF
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="block w-full border rounded-lg p-2"
              />
            </div>

            <button
              onClick={createVersion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
            >
              Create Version
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-5">Version History</h2>
          <div className="space-y-6">
            {versions.map((version) => (
              <div
                key={version._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-indigo-600">
                    Version {version.versionNumber}
                  </h3>

                  {verificationResult?.versionId === version._id &&
                    (verificationResult.verified ? (
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        ✗ Tampered
                      </span>
                    ))}
                </div>

                <p className="text-slate-600 mb-5">
                  {version.notes || "No notes provided."}
                </p>

                {version.fileHash && (
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold">SHA-256 Hash</span>

                      <p className="font-mono bg-slate-100 p-2 rounded mt-1 break-all">
                        {version.fileHash}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold">IPFS CID</span>

                      <p className="font-mono bg-slate-100 p-2 rounded mt-1 break-all">
                        {version.ipfsCID}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold">Transaction Hash</span>

                      <p className="font-mono bg-slate-100 p-2 rounded mt-1 break-all">
                        {version.txHash}
                      </p>
                    </div>
                  </div>
                )}

                {version.fileHash && (
                  <button
                    onClick={() =>
                      window.open(
                        `https://gateway.pinata.cloud/ipfs/${version.ipfsCID}`,
                        "_blank"
                      )
                    }
                    className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
                  >
                    View PDF
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaperDetails;
