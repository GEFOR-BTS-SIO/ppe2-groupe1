import React from 'react';

const BlueRoundButton = ({to, text}) => {
  return (
    <a href={to} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-6 rounded-full">
      {text}
    </a>
  );
};

export default BlueRoundButton;
