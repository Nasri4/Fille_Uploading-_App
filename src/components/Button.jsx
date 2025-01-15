import React from "react";

function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white text-2xl rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center"
    >
      +
    </button>
  );
}

export default Button;
