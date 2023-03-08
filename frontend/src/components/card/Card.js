import React from "react";
// import PropTypes from "prop-types";

const Card = () => {
  return (
    <div className=" m-4 flex gap-6 rounded-lg p-4 shadow-md">
      <div className=" flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          className="w-80 rounded-lg object-cover"
          alt=""
        />
      </div>
      <div className="card">
        <div>
          <h2 className="text-3xl font-bold">Alex Morrison</h2>
          <p className="text-gray-400">Senior Journalist</p>
        </div>
        <div className="flex justify-between rounded-lg bg-slate-100 p-4">
          <div>
            <p className="text-gray-400">Aricles</p>
            <p className="text-2xl font-bold">34</p>
          </div>
          <div>
            <p className="text-gray-400">Aricles</p>
            <p className="text-2xl font-bold">34</p>
          </div>
          <div>
            <p className="text-gray-400">Aricles</p>
            <p className="text-2xl font-bold">34</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="flex-1 rounded-lg border border-gray-400 bg-white p-3"
            type="button"
          >
            Chat
          </button>
          <button className="flex-1 rounded-lg bg-blue-400 p-3" type="button">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

// Card.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default Card;
