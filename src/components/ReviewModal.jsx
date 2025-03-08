import { useState } from "react";

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [review, setReview] = useState({
    rating: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.rating || !review.message) {
      alert("Please provide both rating and review message.");
      return;
    }
    onSubmit(review);
    setReview({ rating: "", message: "" });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="mb-4 font-semibold text-xl">Submit a Review</h2>
        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-3">
            <label className="block font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              value={review.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          {/* Review Message */}
          <div className="mb-3">
            <label className="block font-medium text-gray-700">
              Review Message
            </label>
            <textarea
              name="message"
              value={review.message}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-outline btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
