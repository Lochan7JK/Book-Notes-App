import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import EmptyState from "../components/EmptyState";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import { BookOpen } from "lucide-react";
import { Funnel } from 'lucide-react';
import { Search } from 'lucide-react';
import { ArrowDownUp } from 'lucide-react';

export default function LibraryPage({ books,totalBooks, deleteBook, updateRating, updateStatus, filter, setFilter, sortBy, setSortBy, searchQuery, setSearchQuery }) {

  const [selectedBook, setSelectedBook] = useState(null);

  function btn(active) {
    return `px-3 py-1 rounded-lg text-sm border transition ${
      active ? "bg-[#7a462e] hover:bg-amber-950 text-white" : "bg-white hover:bg-[#F8F8F8]"
    }`;
  }

  return (
    <>
    <div className="rounded-2xl p-10 mb-8 text-white flex flex-col items-center justify-center text-center bg-cover bg-center relative overflow-hidden opacity-80"
        style={{
          backgroundImage: "url('/bookshelf-hero.png')",
        }}
      >

         <div className="text-5xl mb-4 flex items-center justify-center h-20 w-20 rounded-full bg-[#fef7f2]">
          <BookOpen color="#7a462e" size={52}/>
        </div>

        <h1 className="text-3xl font-semibold text-black">
          Your Reading <span className="text-black hover:text-amber-950 font-bold">Collection</span>
        </h1>

        <p className="text-sm text-stone-900 mt-2 font-semibold">
          Organize your books, track progress, and capture insights from your reading journey.
        </p>

    </div>
        

  <div className="max-w-5xl mx-auto px-6 py-8">

      {/* Searching, Filtering and Sorting */}
    <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-12 shadow-sm">
  
      {/* Top Row */}
      <div className="flex flex-wrap gap-6 items-end">

        {/* SEARCH */}
        <div className="flex-1 min-w-55">
          <label className="text-xs text-stone-900 mb-1 font-semibold flex items-center gap-1">
            {/* 🔎 Search */}
            <Search size={18}/> Search Books 
          </label>

          <input
            type="text"
            placeholder="Search books by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm bg-white focus:outline-none focus:border-transparent"
          />
        </div>

        {/* FILTER */}
        <div>
          <label className="text-xs text-stone-900 mb-1 font-semibold flex items-center gap-1">
            <Funnel size={18} /> Filter by Status
          </label>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-stone-200 text-sm bg-white"
          >
            <option value="all">All Books</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        {/* SORT */}
        <div>
          <label className="text-xs text-stone-900 mb-1 font-semibold flex items-center gap-1">
            <ArrowDownUp size={18} /> Sort By
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-stone-200 text-sm bg-white"
          >
            <option value="newest">Recently Updated</option>
            <option value="oldest">Oldest</option>
            <option value="rating">Rating</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

      </div>

      {/* Bottom Row */}
      <p className="text-xs text-stone-500 mt-4">
        Showing {books.length} books
      </p>
    </div>


      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">

          <button onClick={() => setFilter("all")} className={btn(filter === "all")}>
            All Books
          </button>

          <button onClick={() => setFilter("reading")} className={btn(filter === "reading")}>
            Reading
          </button>

          <button onClick={() => setFilter("finished")} className={btn(filter === "finished")}>
            Finished
          </button>

        </div>


        <div className="flex justify-between items-center mb-1">
          {/* <h1 className="text-2xl font-semibold">Your Library</h1> */}

          <Link
            to="/add"
            className="bg-[#7a462e] text-white text-sm px-4 py-2 rounded-lg hover:bg-amber-950 transition"
          >
            + Add Book
          </Link>
        </div>


      </div>

      {(books.length === 0 || totalBooks === 0) ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                requestDelete={() => setSelectedBook(book)}
                updateRating={updateRating}
                updateStatus={updateStatus}
              />
            ))
          }
        </div>
      )}


      <DeleteModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onConfirm={() => {
          deleteBook(selectedBook.id);
          setSelectedBook(null);
        }}
      />

    </div>
    </>
  );
}

