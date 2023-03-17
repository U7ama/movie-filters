import React, { useEffect, useState } from "react";

const Genre = ({ dropdown, movieData, onUpdateMovies }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [genereOpen, setGenereOpen] = useState(false);
  const [rotate, setRotate] = useState(false);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;
    let newSelectedCategories;
    if (isChecked) {
      newSelectedCategories = [...selectedCategories, category];
    } else {
      newSelectedCategories = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(newSelectedCategories);
  };

  useEffect(() => {
    const newFilteredMovies = movieData.filter((movie) =>
      selectedCategories.includes(movie.category)
    );
    onUpdateMovies(newFilteredMovies);
  }, [selectedCategories]);

  return (
    <div>
      <div className="flex relative flex-col w-full px-6 py-4 mx-auto bg-white border border-[#979797] shadow-lg">
        <div
          className="flex justify-between items-center gap-4 cursor-pointer"
          onClick={() => {
            setRotate(!rotate);
            setGenereOpen(!genereOpen);
          }}
        >
          Genre:{" "}
          <img
            className={`${dropdown && "rotate-180"}`}
            src="/chevron-down.png"
            alt=""
          />{" "}
        </div>
        {dropdown && (
          <div
            className="flex  flex-col mt-1 gap-2 absolute top-16 w-full bg-white shadow-md left-0 rounded-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {movieData.map((movie, i) => (
              <label
                key={i}
                className="flex items-center justify-start gap-4 py-2 px-1 cursor-pointer  text-sm font-medium text-center text-gray-800 bg-white hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className=""
                  value={movie.category}
                  checked={selectedCategories.includes(movie.category)}
                  onChange={handleCategoryChange}
                />
                {movie.category}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
