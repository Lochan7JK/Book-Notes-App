import StatusBadge from "./StatusBadge";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "../utils/time";
import { Eye, SquarePen, Trash } from 'lucide-react';
import DefaultCover from "../assets/default-book-cover.png";
import PlaceholderCover from "./PlaceholderCover";

export default function BookCard({ book, requestDelete, updateRating, updateStatus }) {

  const navigate = useNavigate();


  const cleanISBN = book.isbn?.replace(/[-\s]/g, "");
  const coverUrl = cleanISBN
    ? `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg`
    : null;


  const statusStyles = {
    reading: "bg-blue-100 text-blue-700 border border-blue-300",
    finished: "bg-emerald-100 text-emerald-700 border border-emerald-300",
  };



  return (
    <div onClick={() => navigate(`/book/${book.id}`)}
     className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 flex gap-4 hover:shadow-md transition">
      
      {/* Cover */}
      <div className="w-27 h-40 rounded-lg flex-shrink-0 overflow-hidden bg-[#fef7f2]">
        {coverUrl ? (
          <img
            src={coverUrl || DefaultCover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = DefaultCover;
            }}
          />
        ) : cleanISBN ? (
          <PlaceholderCover title={book.title} />
        ) : (
          <img
            src={DefaultCover}
            alt="Default cover"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
      </div>


      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg leading-tight mt-1">
              {book.title}
            </h3>
            <p className="text-sm text-stone-500">
              by {book.author}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              {book.updatedAt
                ? `Updated ${formatRelativeTime(book.updatedAt)}`
                : `Added ${formatRelativeTime(book.createdAt)}`}
            </p>

          </div>

          <div className="relative inline-block">
            <select
              value={book.status}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => updateStatus(book.id, e.target.value)}
              className={`text-xs font-medium px-1 py-1 rounded-full cursor-pointer outline-none border-none transition-all duration-150
                ${statusStyles[book.status]}
              `}
            >
              <option value="reading"  className={`${statusStyles.reading}`} >Reading</option>
              <option value="finished" className={`${statusStyles.finished}`}>Finished</option>
            </select>
          </div>


        </div>

        <p className="text-sm text-stone-600 mt-2 line-clamp-2">  
          {book.content}
        </p>


        <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <StarRating rating={book.rating} onRate={
              (value) => updateRating(book.id, value)
            } 
          />


          <div className="flex gap-2 flex-wrap">
            <button className="bg-[#7a462e] text-white text-sm px-3 py-1.5 rounded-lg hover:bg-amber-950 transition">
              <Eye size={18} className="mr-1 inline-block" />
              Read
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit/${book.id}`);
              }}
              className="border border-[#7a462e] text-[#7a462e] text-sm px-3 py-1.5 rounded-lg hover:bg-stone-100 transition"
            >
              <SquarePen size={18} className="mr-1 inline-block" color="#7a462e" />
              Edit
            </button>


            <button
              onClick={(e) => {
                e.stopPropagation();
                requestDelete();
              }}
              className="text-red-600 text-sm px-2 hover:opacity-70"
            >
              <Trash size={18} className="mr-1 inline-block" />
            </button>


          </div>
        </div>
      </div>
    </div>
  );

}
