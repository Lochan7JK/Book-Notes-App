import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayersPlus } from 'lucide-react';

export default function AddBookPage({ addBook }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    notes: "",
  });

  const cleanISBN = (isbn) => isbn?.replace(/[-\s]/g, "");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isbn = cleanISBN(form.isbn?.trim());

    const newBook = {
      // id: crypto.randomUUID(),
      title: form.title,
      author: form.author,
      content: form.notes,
      status: "reading",
      rating: 0,
      isbn,
      coverUrl: isbn
      ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
      : null,
    };

    addBook(newBook);
    navigate("/");
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-stone-500 mb-4"
      >
        ← Back
      </button>


      <form
        onSubmit={handleSubmit}
        className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-4"
      >

        <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#f2ecea] flex items-center justify-center text-lg">
                <LayersPlus size={21} color="#7a462e"/>
            </div>
      
            <div className="leading-tight">
              <h1 className="text-2xl font-semibold">Add Book</h1>
                <p className="text-xs text-stone-500">
                    Add a new book to your library.
                </p>
            </div>
        </div>

        <input
          name="title"
          placeholder="Book Title *"
          onChange={handleChange}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
          required
        />

        <input
          name="author"
          placeholder="Author *"
          onChange={handleChange}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
          required
        />

        <input
          name="isbn"
          placeholder="ISBN - Provide isbn no. to display book cover (Optional)"
          onChange={handleChange}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          onChange={handleChange}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm h-24"
        />

        <button className="w-full bg-[#7a462e] text-white py-2 rounded-lg hover:bg-amber-950 transition">
          Save Book
        </button>
      </form>
    </div>
  );
}

