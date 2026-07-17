import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

function PaperCard({ paper, manage = false }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition">
      <div className="h-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-t-2xl"></div>

      <div className="p-6">
        <div className="flex items-center gap-3">
          <FileText className="text-indigo-600" />

          <h2 className="text-xl font-semibold">{paper.title}</h2>
        </div>

        <p className="mt-4 text-slate-600 line-clamp-4">{paper.abstract}</p>

        <div className="mt-6">
          <p className="text-sm">
            <span className="font-semibold">Authors:</span>{" "}
            {paper.authors?.length
              ? paper.authors.join(", ")
              : paper.owner?.name}
          </p>
        </div>

        <Link
          to={manage ? `/dashboard/paper/${paper._id}` : `/paper/${paper._id}`}
          className="inline-block mt-8 px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {manage ? "Manage Paper" : "View Paper"}
        </Link>
      </div>
    </div>
  );
}

export default PaperCard;
