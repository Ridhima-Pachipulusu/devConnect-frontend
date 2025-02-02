import React from 'react'

const UserCards = ({user}) => {
    const {firstName,lastName,photoUrl}=user;
    console.log(firstName,lastName,photoUrl)
  return (
    <div className="card bg-base-200 w-96 shadow-sm mx-auto my-20">
      <figure>
        <img className="w-52 mt-10" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-center">
          <button className="btn bg-blue-500 ">Ignore</button>
          <button className="btn bg-pink-400">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCards