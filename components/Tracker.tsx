import React from "react";

const ActiveChallange = [
  {
    title: "Detox with apple",
    logo: "", // you can add an image or icon here
    category: "Health",
    days: 7,
    bgColor: "green",
  },
];

const Tracker = () => {
  return (
    <div className="p-4">
      <p className="text-lg font-medium">You've completed 4/6 habits today</p>

      <div className="bg-gray-100 mt-5 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Active Challenges</h2>

        <div className="flex flex-wrap gap-3">
          {ActiveChallange.map((item) => (
            <div
              key={item.title}
              className="bg-gray-200 inline-flex items-center gap-4 p-3 rounded-lg"
            >
              {/* Logo circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  item.bgColor === "green"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                {item.logo || (
                  <span className="text-white font-bold text-lg">
                    {item.title[0]}
                  </span>
                )}
              </div>

              {/* Challenge info */}
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <div className="flex gap-4 text-gray-600 mt-1 text-sm">
                  <span>{item.days}-days</span>
                  <span>{item.category} Challenge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
