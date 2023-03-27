import React, { useState } from "react";
import RatingDropdown from "./components/Ratings";
import Genre from "./components/Genre";
import Results from "./components/Results";
import movieData from "./utils/moviedata.json";

const Home = () => {
  const [moviesByInput, setMoviesByInput] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [inputSelected, setInputSelected] = useState(false);
  const [moviesByRating, setMoviesByRating] = useState([]);
  const [ratingDropdown, setRatingDropdown] = useState(false);
  const [genreDropdown, setGenreDropdown] = useState(false);
  const [title, setTitle] = useState("");

  const updateRating = (rating) => {
    setMoviesByRating(rating);
  };

  const updateGenre = (newMovies) => {
    setMoviesByGenre(newMovies);
  };

  const updateTitle = (title) => {
    setTitle(title);
  };

  function handleInputChange(e) {
    const filteredMovieData = movieData.filter((movie) => {
      const matchesTitle = e
        ? movie.title.toLowerCase().indexOf(e.toLowerCase()) !== -1
        : true;
      console.log("Title match:", movie.title, matchesTitle);
      return matchesTitle;
    });
    console.log("handleInputChange", e);
    setMoviesByInput(filteredMovieData);
  }

  return (
    <div className="px-2 py-4">
      <div
        className="flex flex-col"
        onClick={() => {
          setGenreDropdown(false);
          setRatingDropdown(false);
        }}
      >
        <div className="flex flex-col md:flex md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2 ">
            <input
              // value={title}
              defaultValue={title}
              className="w-full py-4 px-6 border border-[#979797]"
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
              onFocus={() => {
                setInputSelected(true);
              }}
              onClick={() => setTitle("")}
              placeholder={title ? title : "Enter movie name"}
            />
          </div>
          <div className="w-full md:w-1/2 ">
            <div className="flex gap-4 w-full">
              <div
                className="w-1/2 "
                onClick={(e) => {
                  e.stopPropagation();
                  setGenreDropdown(false);
                  setRatingDropdown(!ratingDropdown);
                }}
              >
                <RatingDropdown
                  dropdown={ratingDropdown}
                  movieData={movieData}
                  onUpdateMovies={updateRating}
                />
              </div>
              <div
                className="w-1/2 "
                onClick={(e) => {
                  e.stopPropagation();
                  setGenreDropdown(!genreDropdown);
                  setRatingDropdown(false);
                }}
              >
                <Genre
                  dropdown={genreDropdown}
                  movieData={movieData}
                  onUpdateMovies={updateGenre}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {inputSelected && (
            <Results
              onUpdateTitle={updateTitle}
              rating={moviesByRating}
              title={moviesByInput}
              genre={moviesByGenre}
              movieData={movieData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
