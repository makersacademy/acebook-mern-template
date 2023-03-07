import React from "react";
// import PropTypes from "prop-types";

const Card = () => {
  return (
    <div className=" p-4 m-4 rounded-lg flex gap-6 shadow-md">
      <div className=" flex justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          className="w-80 rounded-lg object-cover"
          alt=""
        />
      </div>
      <div className="card">
        <div>
          <h2 className="font-bold text-2xl">Alex Morrison</h2>
          <p className="text-gray-400">Senior Journalist</p>
        </div>
        <div className="flex p-4 bg-slate-100 rounded-lg justify-between">
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
            className="p-3 rounded-lg border border-gray-400 bg-white flex-1"
            type="button"
          >
            Chat
          </button>
          <button className="p-3 rounded-lg bg-blue-400 flex-1" type="button">
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
