import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col mx-auto w-11/12 h-screen">
      {/* Top Section */}
      <div className="flex md:flex-row flex-col flex-grow">
        {/* Left: Contact Form */}
        <div className="bg-gray-100 p-8 w-full lg:w-1/2">
          <h2 className="mb-4 font-bold text-2xl">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Enter your message"
                className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500 w-full"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Right: Get in Touch */}
        <div className="flex flex-col justify-center items-center bg-gray-300 p-8 w-full lg:w-1/2 text-black">
          <h2 className="mb-4 font-bold text-2xl">Get in Touch</h2>
          <p className="text-center">
            Feel free to reach out to us for any inquiries or questions. We're
            here to help!
          </p>
          <p className="mt-4">
            <strong>Email:</strong> contact@example.com
          </p>
          <p>
            <strong>Phone:</strong> +8801818424255
          </p>
          <p>
            <strong>Address:</strong> 123 Kawran Bazara, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Bottom Section: Google Map */}
      {/* <div className="w-full h-1/3">
        <iframe
          title="Google Map"
          src={`https://www.google.com/maps/embed/v1/place?q=current+location&key=YOUR_GOOGLE_MAPS_API_KEY`}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div> */}
    </div>
  );
};

export default ContactPage;
