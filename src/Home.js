import RatingDropdown from "./components/Ratings";
import Genre from "./components/Genre";
import React, { useState } from "react";
import Results from "./components/Results";
import Autocomplete from "react-autocomplete";
import movieData from "./utils/movieData.json";

const Home = () => {
  const [moviesByInput, setMoviesByInput] = useState([]);
  // const [moviesByRating, setMoviesByRating] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [inputSelected, setInputSelected] = useState(false);
  const [moviesByRating, setMoviesByRating] = useState([]);
  const [ratingDropdown, setRatingDropdown] = useState(false);
  const [genreDropdown, setGenreDropdown] = useState(false);

  const updateRating = (newMovies, rating) => {
    // setMoviesByRating(newMovies);
    setMoviesByRating(rating);
  };

  const updateGenre = (newMovies) => {
    setMoviesByGenre(newMovies);
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
            <Autocomplete
              className="w-full"
              items={movieData}
              getItemValue={(item) => item.title}
              value={selectedTitle}
              onChange={(e) => {
                handleInputChange(e.target.value);
                setSelectedTitle(e.target.value);
              }}
              onSelect={(value) => {
                console.log("value", value);
                handleInputChange(value);
                setSelectedTitle(value);
              }}
              inputProps={{
                onFocus: () => setInputSelected(true),
                // onBlur: () => setInputSelected(false),
                className: "md:w-[39rem] py-4 px-6 border border-[#979797]",
              }}
              renderInput={(props) => (
                <input {...props} placeholder="Enter movie name" />
              )}
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.title}
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {/* {item.title} */}
                </div>
              )}
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
