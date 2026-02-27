import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed bottom-6 right-6 bg-stone-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
