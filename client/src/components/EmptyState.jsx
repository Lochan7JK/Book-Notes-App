import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function EmptyState({
  title = "No books found",
  message = "Build your reading collection by adding book reviews.",
  buttonText = "Add book",
})
 {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-10 text-center shadow-sm flex items-center justify-center flex-col">

      <div className="text-5xl mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-[#fef7f2]">
        <BookOpen color="#7a462e" size={52}/>
      </div>

      <h2 className="text-lg font-semibold text-stone-800">
        {/* No books found */}
        {title}
      </h2>

      <p className="text-sm text-stone-500 mt-1">
        {/* Start building your reading collection by adding your first book. */}
        {message}
      </p>

      <Link
        to="/add"
        className="inline-block mt-5 bg-[#7a462e] text-white text-sm px-4 py-2 rounded-lg hover:bg-amber-950 transition"
      >
        {/* Add your first book */}
        {buttonText}
      </Link>
    </div>
  );
}
