// function StarRating({ rating = 0 }) {
//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span key={star}>
//           {star <= rating ? "⭐" : "☆"}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default StarRating;

export default function StarRating({ rating = 0, onRate }) {
  return (
    <div className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={(e) => {
                e.stopPropagation();
                onRate(star);
           }}
        //   onClick={() => onRate(star)}
          className="text-lg"
        >
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
