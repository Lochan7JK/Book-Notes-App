import { motion, AnimatePresence } from "framer-motion";

export default function DeleteModal({ book, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {book && (
        <motion.div
          className="fixed inset-0 bg-black/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#fef7f2] rounded-xl shadow-lg w-full max-w-md p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <h2 className="text-lg font-semibold text-stone-800">
              Delete Book
            </h2>

            <p className="text-sm text-stone-600 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium">{book.title}</span>?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm bg-[#7a462e] text-white rounded-lg hover:bg-amber-950 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

