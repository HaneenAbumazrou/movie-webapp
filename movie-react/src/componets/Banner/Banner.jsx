import React, { useState, useEffect } from "react";
import { API_KEY, imageUrl } from "../../Constants/Constance";
import axios from "../../axios";
import { Fade } from "react-reveal";
import YouTube from "react-youtube";
import StarRatings from "react-star-ratings";

function Banner(props) {
  const [showModal, setShowModal] = useState(false);
  // const { playMovie } = usePlayMovie();

  const [movie, setMovie] = useState([]);
  const [moviePopupInfo, setMoviePopupInfo] = useState({});
  const [urlId, setUrlId] = useState("");

  function getWindowSize() {
    const {innerWidth:width } = window;
    return {
      width
    }
  }

  const [windowSeize, setWindowSeize] = useState(getWindowSize())


  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovie(
        response.data.results.sort(function (a, b) {
          return 0.5 - Math.random();
        })[0]
      );
      console.log(movie);
      console.log("سشمثة");
    });

    function handleWindowResize() {
      setWindowSeize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

  }, []);

  const handleMoviePopup = (movieInfo) => {
    setMoviePopupInfo(movieInfo);
    setShowModal(true);

    axios
      .get(`/movie/${movieInfo.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((responce) => {
        console.log(responce.data);
        if (responce.data.results.length !== 0) {
          setUrlId(responce.data.results[0]);
        } else {
          console.log("Array Emptey");
        }
      });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(90deg, hsl(0deg 0% 7% / 91%) 0%, hsl(0deg 0% 0% / 0%) 35%, hsl(220deg 26% 44% / 0%) 100%), url(${
            movie
              ? imageUrl + movie.backdrop_path
              : ""
          })`,
        }}
        className="h-[50rem] md:h-[55rem] 3xl:h-[63rem] bg-cover bg-center object-contain grid items-center"
      >
        <div className="ml-2  mr-2 sm:mr-0 sm:ml-12 mt-[75%] sm:mt-52">
          <Fade bottom>
            {movie.title || movie.name ? (
              <>
                <h1 className="text-white text-3xl font-semibold text-center mb-5 py-2 sm:text-left sm:text-5xl sm:border-l-8 pl-4 border-red-700 md:text-6xl lg:w-2/3 xl:w-1/2 sm:font-bold drop-shadow-lg">
                  {movie.title || movie.name}
                </h1>
              </>
            ) : (
              <div className="grid justify-center sm:justify-start">
                <div className="animate-pulse w-72 ml-4 sm:ml-0 sm:w-96 py-5 mb-7 xl:py-7 xl:w-45rem bg-neutral-900 rounded-md"></div>
              </div>
            )}
            
            
            <div className="flex">
              <div className=" hidden sm:flex justify-center sm:justify-start ml-2">
                {movie.vote_average ? (
                  <h1 className="flex text-white text-xl drop-shadow-lg 2xl:text-lg">
                    <div className="-mt-1">
                      
                    </div>
                  </h1>
                ) : null}
              </div>
              <div className="ml-2 hidden sm:flex justify-center sm:justify-start">
                {movie.release_date || movie.first_air_date ? (
                  <h1 className="flex text-white text-base font-bold drop-shadow-lg">
                    {movie.release_date || movie.first_air_date}
                  </h1>
                ) : null}
              </div>
              {movie.id && (
                <h1 className="hidden sm:flex text-white px-2 bg-[#1e1e1e89] border-2 border-stone-600 rounded ml-2">
                  HD
                </h1>
              )}
            </div>

            <div className="mt-3 mb-4">
              {movie.overview ? (
                <>
                  <h1 className="text-white text-xl drop-shadow-xl  text-center line-clamp-2 sm:line-clamp-3 sm:text-left w-full md:w-4/5 lg:w-8/12/2 lg:text-xl xl:w-5/12 2xl:text-2xl">
                    {movie.overview}
                  </h1>
                </>
              ) : (
                <>
                  <div className="grid justify-center md:justify-start">
                    <div className="animate-pulse w-80 sm:w-40rem md:w-45rem py-1 mb-3 xl:w-70rem xl:py-2 bg-neutral-900 rounded-md"></div>
                    <div className="animate-pulse w-80 sm:w-40rem md:w-45rem py-1 mb-3 xl:w-70rem xl:py-2 bg-neutral-900 rounded-md"></div>
                    <div className="animate-pulse w-80 sm:w-40rem md:w-45rem py-1 mb-7 xl:w-70rem xl:py-2 bg-neutral-900 rounded-md"></div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-center sm:justify-start">
              {movie.id ? (
                <>
                  <button
                    // onClick={() => playMovie(movie)}
                    className="bg-red-800 hover:bg-red-900 transition duration-500 ease-in-out shadow-2xl flex items-center mb-3 mr-3 text-base sm:text-xl font-semibold text-white py-2 sm:py-2 px-10 sm:px-14 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                    Play
                  </button>
                  <button
                    onClick={() => handleMoviePopup(movie)}
                    className="bg-[#33333380] flex items-center shadow-2xl mb-3 text-base sm:text-xl font-semibold text-white hover:bg-white hover:text-black transition duration-500 ease-in-out py-2 px-8 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 items-center mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    More Info
                  </button>
                </>
              ) : (
                <>
                  <button className="animate-pulse bg-neutral-900 transition duration-500 ease-in-out shadow-2xl flex items-center mb-3 mr-3 text-base sm:text-xl font-semibold text-neutral-500 py-2 sm:py-2 px-10 sm:px-14 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-5 items-center mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Play
                  </button>
                  <button className="animate-pulse bg-neutral-900 flex items-center shadow-2xl mb-3 text-base sm:text-xl font-semibold text-neutral-500 transition duration-500 ease-in-out py-2 px-8 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 items-center mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    More Info
                  </button>
                </>
              )}
            </div>
          </Fade>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(hsl(0deg 0% 0% / 0%), hsl(0deg 0% 0% / 38%), hsl(0deg 0% 7%))",
          }}
          className="h-80 mt-auto "
        ></div>
      </div>

      {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto mt-24 sm:my-6 mx-4 max-w-3xl">
                {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
                    {/*header*/}
                    <button
                      className="group p-1 ml-2 mt-2 backdrop-blur-[20px] bg-transparent border-2 border-white hover:bg-white hover:text-black fixed right-4 rounded-full cursor-pointer float-right font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
                      onClick={() => setShowModal(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-white w-6 h-6 group-hover:text-black ease-linear transition-all duration-150"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {/*Movie Trailer or Image*/}
                    {urlId ? (
                      <YouTube
                        opts={opts}
                        videoId={urlId.key}
                        className="YouTubeVid"
                      />
                    ) : (
                      <img src={`${imageUrl + moviePopupInfo.backdrop_path}`} />
                    )}

                    <div className="flex ml-4 items-center -mt-14">
                      <button
                        className="flex items-center justify-center bg-red-800 text-white active:bg-red-800 font-medium sm:font-bold uppercase text-xs px-4 sm:px-6 md:text-sm  py-2 rounded shadow hover:shadow-lg cursor-pointer outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-1 text-white hover:text-gray-300 ease-linear transition-all duration-150"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Play
                      </button>
                      <div
                        
                        className="group text-white w-10 h-10 border-[2px] rounded-full p-2 mr-3  backdrop-blur-[1px] hover:bg-white hover:text-black shadow-md cursor-pointer ease-linear transition-all duration-150 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                      <div
                        className="text-white w-10 h-10 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] hover:bg-white hover:text-black shadow-md cursor-pointer ease-linear transition-all duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                      </div>
                    </div>

                      <div className="p-5 py-4 -mb-6 mt-2 sm:mb-0 sm:mt-0 sm:py-2 sm:pt-6 rounded-t">
                        <h3 className="text-3xl font-semibold text-white">
                          {moviePopupInfo.title || moviePopupInfo.name}
                        </h3>
                        <h1 className="text-green-700 font-bold mt-2">
                          {moviePopupInfo.release_date}
                        </h1>
                      </div>
                    {/*body*/}
                      <div className="relative p-4 sm:p-6 flex-auto">
                        <div className="bg-neutral-700 h-[0.15rem]"></div>
                        <p className="my-4 sm:my-7 text-neutral-400 text-xs md:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
                          {moviePopupInfo.overview}
                        </p>
                        <div className="bg-neutral-700 h-[0.15rem]"></div>
                      </div>
                    {/*footer*/}
                    <div className="sm:flex items-center justify-end p-2 rounded-b">
                      {/*More Info*/}
                        <div className="relative p-2 py-5 sm:p-6 flex-auto">
                          <h1 className="flex -mt-4 text-neutral-400 text-sm leading-relaxed">
                            Rating :
                            <div className="ml-2">
                              <StarRatings
                                rating={moviePopupInfo.vote_average / 2}
                                starRatedColor="red"
                                numberOfStars={5}
                                name="rating"
                                starDimension="1rem"
                                starSpacing="0.2rem"
                              />
                            </div>
                          </h1>
                          <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                            Released on :{"  "}
                            <p className="text-white ml-2 font-medium">
                              {moviePopupInfo.release_date ||
                                moviePopupInfo.first_air_date}
                            </p>
                          </h1>
                          <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                            Language :
                            <p className="text-white ml-2 font-medium">
                              {moviePopupInfo.original_language}
                            </p>
                          </h1>

                          <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                            Genere :
                          </h1>
                        </div>

                      <div className="flex justify-between p-2">
                        <button
                          className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Add to MyList
                        </button>

                        <button
                          className="flex items-center text-red-500 background-transparent font-medium sm:font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
    </>
  );
}

export default Banner;
