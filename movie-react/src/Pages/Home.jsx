import React from "react";
import { useEffect, useState, useContext } from "react";
import RowPost from "../componets/RowPost/RowPost";
import Banner from "../componets/Banner/Banner";

import {
  originals,
  trending,
  comedy,
  horror,
  Adventure,
  SciFi,
  Animated,
  War,
  trendingSeries,
  UpcomingMovies,
} from "../Constants/URLs";

function Home() {
  const [watchedMovies, setWatchedMovies] = useState([]);

  return (
    <div>
      <Banner url={trending}></Banner>
      <div className="w-[99%] ml-1">
        <RowPost first title="Trending" url={trending} key={trending}></RowPost>
        <RowPost title="Animated" url={Animated} key={Animated}></RowPost>
        {watchedMovies.length != 0 ? (
          <RowPost
            title="Watched Movies"
            movieData={watchedMovies}
            key={"Watched Movies"}
          ></RowPost>
        ) : null}
        <RowPost
          title="Netflix Originals"
          islarge
          url={originals}
          key={originals}
        ></RowPost>
        <RowPost
          title="Trending Series"
          url={trendingSeries}
          key={trendingSeries}
        ></RowPost>
        <RowPost title="Science Fiction" url={SciFi}></RowPost>
        <RowPost title="Upcoming Movies" url={UpcomingMovies}></RowPost>
        <RowPost title="Comedy" url={comedy}></RowPost>
        <RowPost title="Adventure" url={Adventure}></RowPost>
        <RowPost title="Horror" url={horror}></RowPost>
        <RowPost title="War" url={War}></RowPost>
      </div>
    </div>
  );
}

export default Home;
