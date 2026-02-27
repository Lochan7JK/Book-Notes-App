const styles = {
  reading: "bg-blue-100 text-blue-700",
  finished: "bg-green-100 text-green-700",
//   planned: "bg-stone-200 text-stone-700",
};

function StatusBadge({ status }) {
  const key = status?.toLowerCase() || "reading";

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[key]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;