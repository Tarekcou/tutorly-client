import React from "react";
import one from "../assets/one.jpg";
import two from "../assets/five.jpg";
import three from "../assets/three.jpg";
import five from "../assets/five.jpg";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "1.Find your tutor.",
      description:
        "We’ll connect you with a tutor who will motivate, challenge, and inspire you.",
      image: one, // Replace with actual image URL
      subItems: [
        {
          name: "Milena",
          role: "French tutor",
          languages: "Speaks French (Native), English (Advanced) +2",
          rating: 4.9,
          image: one,
        },
        {
          name: "John",
          role: "French tutor",
          languages: "Speaks French (Native), English (Advanced) +2",
          rating: 4.7,
          image: two,
        },
        {
          name: "Emma",
          role: "French tutor",
          languages: "Speaks French (Native), English (Advanced) +2",
          rating: 4.8,
          image: three,
        },
      ],
    },
    {
      id: 2,
      title: "2. Start learning.",
      description:
        "Your tutor will guide the way through your first lesson and help you plan your next steps.",
      image: five, // Replace with actual image URL
    },
    {
      id: 3,
      title: "3. Speak. Read. Write. Repeat.",
      description:
        "Choose how many lessons you want to take each week and get ready to reach your goals!",
      image: three, // Replace with actual image URL
    },
  ];

  return (
    <div className="mx-auto px-4 py-8 w-11/12">
      <h2 className="mb-8 font-bold text-3xl text-center">How It Works:</h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="shadow-sm hover:shadow-md p-6 border rounded-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <span
                className={`text-white font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full bg-blue-${
                  step.id * 100
                }`}
              >
                {step.id}
              </span>
              <h3 className="ml-3 font-bold text-xl">{step.title}</h3>
            </div>
            <p className="mb-4 text-gray-600">{step.description}</p>
            {step.subItems && (
              <div className="space-y-4">
                {step.subItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 border rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mr-3 rounded-full w-12 h-12"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-gray-500 text-sm">{item.role}</p>
                      <p className="text-gray-500 text-sm">{item.languages}</p>
                    </div>
                    <span className="ml-auto font-bold text-yellow-500">
                      ★ {item.rating}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {step.image && (
              <img
                src={step.image}
                alt={step.title}
                className="mt-4 rounded-md w-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
