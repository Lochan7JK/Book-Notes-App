export default function Footer() {
  return (
    <footer className="mt-10 border-stone-200 bg-[#fef9f7]">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">

        <p>© {new Date().getFullYear()} Your Reading Collection...</p>
        
        <p className="text-sm text-stone-500">
          Built for your reading journey ✨
        </p>
        <p className="text-xs text-stone-400 mt-1">
          With Love ❤️
        </p>
      </div>
    </footer>
  );
}

