import React from "react";

const Results = ({ onUpdateTitle, rating, title, genre, movieData }) => {
  const titles = title?.map((movie) => movie?.title);
  const categories = genre?.map((movie) => movie?.category);
  console.log("results", rating, titles, categories);

  const handleFilter = () => {
    let filtered = movieData.filter((movie) => {
      let titleMatch = true;
      let ratingMatch = true;
      let categoryMatch = true;

      if (titles.length > 0) {
        titleMatch = titles.includes(movie.title);
      }

      if (rating.length > 0) {
        ratingMatch = rating.includes(
          movie.rating === 6.4
            ? 6
            : movie.rating === 6.9
            ? 6
            : movie.rating === 7.5
            ? 7
            : movie.rating
        );
      }

      if (categories.length > 0) {
        categoryMatch = categories.includes(movie.category);
      }

      return titleMatch && ratingMatch && categoryMatch;
    });
    return filtered;
  };

  const filtered = handleFilter();

  const Stars = ({ rating }) => {
    const fullStar = "/star-filled.png";
    const halfStar = "/star-half.png";
    const emptyStar = "/star.png";

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = Array.from({ length: 10 }, (_, index) => {
      if (index < fullStars) {
        return <img key={index} src={fullStar} alt="" />;
      }

      if (index === fullStars && hasHalfStar) {
        return (
          <img
            key={index}
            className="h-[18px] mt-[3px]"
            src={halfStar}
            alt=""
          />
        );
      }

      return <img key={index} src={emptyStar} alt="" />;
    });

    return <>{stars}</>;
  };

  return (
    <div className="mt-2">
      <ul className="flex border rounded-md flex-col bg-white">
        {filtered.map((movie) => (
          <li
            key={movie.title}
            onClick={() => onUpdateTitle(movie.title)}
            className="flex flex-col overflow-hidden cursor-pointer"
          >
            <div className="p-4 flex">
              <div className="text-gray-800">{movie.title}</div>
              <div className="text-[#777777] ml-auto">{movie.category}</div>
            </div>
            <div className="pb-4 -mt-2 pl-4 flex-grow">
              <div className="flex gap-4 text-gray-800">
                {/* {movie.rating} */}
                <Stars rating={movie.rating} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
