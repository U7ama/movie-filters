import React, { useEffect, useState } from "react";

const RatingDropdown = ({ dropdown, movieData, onUpdateMovies }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filteropen, setFIlterOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const handleRatingChange = (event) => {
    const rating = parseFloat(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRatings((prevSelectedRatings) => [
        ...prevSelectedRatings,
        { min: rating, max: rating + 0.9 },
      ]);
      setRatings((prevSelectedRatings) => [...prevSelectedRatings, rating]);
    } else {
      setSelectedRatings((prevSelectedRatings) =>
        prevSelectedRatings.filter(
          (r) => !(r.min === rating && r.max === rating + 0.9)
        )
      );
      setRatings(ratings.filter((r) => r !== rating));
    }
  };

  useEffect(() => {
    const newFilteredMovies = movieData.filter((movie) => {
      if (
        selectedRatings.length === 0 ||
        (selectedRatings.length > 0 &&
          !selectedRatings.some(
            (r) => movie.rating >= r.min && movie.rating <= r.max
          ))
      ) {
        return false;
      }
      return true;
    });
    onUpdateMovies(newFilteredMovies, ratings);
  }, [selectedRatings, movieData, onUpdateMovies, ratings]);

  const MovieRating = ({ rating }) => {
    const fullStar = "/star-filled.png";
    const emptyStar = "/star.png";

    const fullStars = Math.floor(rating);

    const stars = Array.from({ length: 10 }, (_, index) => {
      if (index < fullStars) {
        return <img key={index} src={fullStar} alt="" />;
      }

      return <img key={index} src={emptyStar} alt="" />;
    });

    return <>{stars}</>;
  };

  return (
    <div>
      <div className="flex relative  flex-col w-full px-6 py-4 mx-auto bg-white border border-[#979797] shadow-lg">
        <div
          className="flex justify-between items-center gap-4 cursor-pointer"
          onClick={() => {
            setRotate(!rotate);
            setFIlterOpen(!filteropen);
          }}
        >
          Rating:{" "}
          <img
            className={`${dropdown && "rotate-180"}`}
            src="/chevron-down.png"
            alt=""
          />{" "}
        </div>
        {dropdown && (
          <div
            className="flex flex-col mt-1 absolute top-16 w-[150%] bg-white shadow-md left-0 rounded-md px-0 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => {
              const isSelected = selectedRatings.some((r) => r.min === rating);
              console.log("rating", rating);
              return (
                <label
                  key={rating}
                  className="flex gap-4 cursor-pointer items-center justify-start p-2 text-sm font-medium text-center text-gray-800 bg-white hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className=""
                    value={rating}
                    checked={isSelected}
                    onChange={handleRatingChange}
                  />

                  <div className="flex gap-4">
                    <MovieRating rating={rating} />
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingDropdown;
