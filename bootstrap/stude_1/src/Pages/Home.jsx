import React from "react";
import { useEffect, useState, useContext } from "react";
import RowPost from "../componets/RowPost/RowPost";
import Banner from "../componets/Banner/Banner";
import { getAllMovies } from '../services/API';

import {
  trending,
  comedy,
  horror,
  Adventure,
  SciFi,
  Animated,
  War,
  action,
} from "../Constants/URLs";

function Home() {
  const [watchedMovies, setWatchedMovies] = useState([]);
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(null)

//   useEffect(() => {

//     const fetchProducts = async () => {
//         try {
//             const fetchedProducts = await getAllMovies()
//             setProducts(fetchedProducts)
//             setError(null)  

//         } catch (error) {
//             console.error('error fetching products', error)
//             setError('Failed to fetch products ')
//         }

//     }

//     fetchProducts()

// }, []);

//   console.log(products);
//   console.log("All Movies");

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
        <RowPost title="Science Fiction" url={SciFi}></RowPost>
        <RowPost title="Upcoming Movies" url={action}></RowPost>
        <RowPost title="Comedy" url={comedy}></RowPost>
        <RowPost title="Adventure" url={Adventure}></RowPost>
        <RowPost title="Horror" url={horror}></RowPost>
        <RowPost title="War" url={War}></RowPost>
      </div>
    </div>
  );
}

export default Home;
{/* <div>
<div>
      <h1>products</h1>
      {
              <ul >
                  {products.map((product) => (
                      <li key={product.id}
                      >
                                                    {console.log(product.title)}

                          {product.title}
                      </li>
                  )
                  )}
              </ul>
      }
  </div>

</div> */}