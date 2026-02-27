export default function PlaceholderCover({ title }) {
  const initials = title
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const gradients = [
    "from-amber-200 to-amber-400",
    "from-rose-200 to-pink-300",
    "from-indigo-200 to-blue-300",
    "from-emerald-200 to-teal-300",
    "from-orange-200 to-red-300",
  ];

  // deterministic gradient (same book → same color)
  const index = title?.length % gradients.length;

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradients[index]} 
                  flex items-center justify-center text-3xl font-semibold text-white`}
    >
      {initials || "📖"}
    </div>
  );
}
