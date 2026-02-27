import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultCover from "../assets/default-book-cover.png";
import PlaceholderCover from "../components/PlaceholderCover";


export default function BookDetailPage({ books, deleteBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return <p className="p-6">Book not found.</p>;
  }

  function formatDateTime(ts) {
    return new Date(ts).toLocaleString();
}

  const cleanISBN = book.isbn?.replace(/[-\s]/g, "");
  const coverUrl = cleanISBN
    ? `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg`
    : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-stone-500 mb-4"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">

        <div className="flex flex-col sm:flex-row gap-8">

            {/* Cover */}
            <div className="flex flex-col items-start gap-5">


                <div className="w-60 h-90 bg-[#fef7f2] rounded-lg overflow-hidden flex-shrink-0">
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

                <div className="text-xs text-stone-500 space-y-1 pt-2">
                    <p>Created At: {formatDateTime(book.createdAt)}</p>
                    <p>
                        Last Updated:{" "}
                        {book.updatedAt ? formatDateTime(book.updatedAt) : "Never"}
                    </p>
                </div>
            </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-semibold">{book.title}</h1>

            <p className="text-stone-600 text-sm">{book.author}</p>

            <p className="text-sm">Status: {book.status}</p>
            <p className="text-sm">Rating: {book.rating} ⭐</p>
            <p className="text-sm">ISBN: {book.isbn || "Not provided"}</p>

            {book.content && (
                <div>
                    <h2 className="text-sm font-medium mt-4">Notes</h2>
                    <p className="text-sm text-stone-600">{book.content}</p>
                </div>
            )}

            <div className="flex gap-2 pt-4">
                <button
                    onClick={() => navigate(`/edit/${book.id}`)}
                    className="px-4 py-2 text-sm rounded-lg bg-[#7a462e] text-white hover:bg-amber-950 transition"
                >
                    Edit
                </button>

                <button
                    onClick={() => setShowDelete(true)}
                    className="px-4 py-2 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-100 transition"
                    >
                    Delete
                </button>
            </div>
        </div>
    </div>
</div>


    <AnimatePresence>
      {showDelete && (

        <motion.div
        className="fixed inset-0 bg-black/30 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-[#fef7f2] rounded-xl p-6 shadow-lg w-80"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15 }}
            >

                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-[#fef7f2] rounded-xl p-6 shadow-lg w-80">
                        <h2 className="text-sm font-semibold mb-2">
                            Delete "{book.title}"?
                        </h2>

                        <p className="text-sm text-stone-600 mb-4">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                            onClick={() => setShowDelete(false)}
                            className="px-3 py-1 text-sm border border-stone-300 rounded-lg hover:bg-white transition"
                            >
                            Cancel
                            </button>

                            <button
                            onClick={() => {
                                deleteBook(book.id);
                                navigate("/");
                            }}
                            className="px-3 py-1 text-sm bg-[#7a462e] text-white rounded-lg hover:bg-amber-950 transition"
                            >
                            Delete
                            </button>
                        </div>
                    </div>
                </div>
                
            </motion.div>
        </motion.div>
        )}
    </AnimatePresence>
    

    </div>
  );
}

