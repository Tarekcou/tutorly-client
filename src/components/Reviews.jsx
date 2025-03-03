import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

// Sample Reviews Data
const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    review:
      "The tutor was amazing! Helped me improve my French in just a few weeks.",
    image:
      "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    rating: 4,
    review: "Very helpful and patient. I learned a lot in a short time.",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 3,
    name: "Sophia Lee",
    rating: 5,
    review: "Great teaching style! Highly recommended for beginners.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s",
  },
  {
    id: 4,
    name: "David Brown",
    rating: 4.5,
    review: "Professional and friendly tutor. Enjoyed every lesson!",
    image:
      "https://image.shutterstock.com/image-photo/young-brazilian-man-isolated-on-260nw-2242569333.jpg",
  },
];

const Reviews = () => {
  return (
    <div className="mx-auto py-12 w-11/12 md:w-10/12">
      <h2 className="mb-8 font-bold text-3xl text-center">
        What Our Students Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="pb-10"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="flex md:flex-row flex-col items-center gap-6 shadow-lg p-2 rounded-xl"
          >
            <div className="flex md:flex-row flex-col items-center py-10 rounded-xl">
              {/* Left Side - Large Profile Image */}
              <div className="flex justify-center w-full md:w-1/3">
                <img
                  data-aos="fade-right"
                  src={review.image}
                  alt={review.name}
                  className="border-4 w-32 md:w-56 h-44 md:h-60"
                />
              </div>

              {/* Right Side - Review Text & Reviewer Info */}
              <div className="p-5 w-full md:w-2/3 md:text-left text-center">
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <div className="flex justify-center md:justify-start mb-3">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                  {review.rating % 1 !== 0 && (
                    <FaStar className="opacity-50 text-yellow-500" />
                  )}
                </div>
                <p className="text-gray-600 text-lg italic">
                  "{review.review}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
