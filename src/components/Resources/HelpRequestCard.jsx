import React from "react";
import charityImg from "../../assets/images/charity4.jpg";
import volunteersImg from "../../assets/images/charity3.jpg";
import childrenImg from "../../assets/images/charity1.jpg";
import donationImg from "../../assets/images/charity2.jpg";

const ngos = [
  {
    id: 1,
    name: "Helping Hands",
    description: "Providing food and shelter to those in need.",
    image: charityImg,
  },
  {
    id: 2,
    name: "Care Foundation",
    description: "Healthcare and medical assistance for all.",
    image: volunteersImg,
  },
  {
    id: 3,
    name: "Child Support",
    description: "Education and welfare programs for children.",
    image: childrenImg,
  },
  {
    id: 4,
    name: "Global Relief",
    description: "Disaster relief and emergency aid worldwide.",
    image: donationImg,
  },
  {
    id: 4,
    name: "Global Relief",
    description: "Disaster relief and emergency aid worldwide.",
    image: donationImg,
  },
];

const HelpRequestCard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">NGOs Offering Help</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ngos.map((ngo) => (
          <div key={ngo.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-40 object-cover" src={ngo.image} alt={ngo.name} />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{ngo.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{ngo.description}</p>
              <div className="mt-4 flex space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                  Request for Help
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpRequestCard;
