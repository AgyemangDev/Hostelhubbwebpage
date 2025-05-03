import React from "react";

const AppStoreButton = ({ store, logo, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border-2 border-accent rounded-full hover:bg-accent transition-colors w-full sm:w-auto shadow-md shadow-accent"
  >
    <img src={logo} alt={`${store} logo`} className="h-6 w-6" />
    <div className="text-left text-white">
      <div className="text-xs">
        {store === "Google Play" ? "GET IT ON" : "DOWNLOAD ON THE"}
      </div>
      <div className="text-sm font-semibold">{store}</div>
    </div>
  </a>
);

export default AppStoreButton;