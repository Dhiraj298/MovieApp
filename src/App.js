// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './Moviecard';
//1d2906cd
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());



const api_Url = "http://www.omdbapi.com/?i=tt3896198&apikey=1d2906cd"


function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm , setSearchTerm] = useState("")
  const searchMovies = async (title) => {
    const response = await fetch(`${api_Url}&s=${title}`)
    const data = await response.json()

    console.log(data.Search)
    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies()
    setSearchTerm('')
  }, [])

  
  return (
    <div className='app'>
      <h1>MovieTube....</h1>

      <div className='search'>
        <input
          placeholder='search for movies'
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          value={searchTerm}>

        </input>
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => {
            searchMovies(searchTerm)
          }}
        ></img>

      </div>

      {
        movies?.length > 0 ?
          (

            <div className='container'>

              {
                movies.map((movie) => (

                  <MovieCard movie={movie}></MovieCard>
                ))}

            </div>
          )
          : (
            <div className='empty'>

              <h2>
                no movies
              </h2>
            </div>
          )
      }

    </div>
  );
}

export default App;
