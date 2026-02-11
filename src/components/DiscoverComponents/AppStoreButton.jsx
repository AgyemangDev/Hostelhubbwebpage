import React from "react";

const AppStoreButton = ({ store, logo, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:from-[#610b0c] hover:to-[#8b1214] transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      <img src={logo} alt={store} className="w-5 h-5" />
      <span>{store}</span>
    </a>
  );
};

export default AppStoreButton;
