import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import HomeMainLeft from "./../assets/HomeMainLeft.png";
import SearchRed from "./../assets/SearchRed.png";
import axios from "axios";
import { AppContext } from "./ParentContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [input, setSearchInput] = useState("");
  const { isLogin, setIsLogin } = useContext(AppContext);

  const axiosConfiguration = {
    baseURL: "https://reactnd-books-api.udacity.com",
    headers: {
      Authorization: "whatever-you-want",
    },
  };

  useEffect(() => {
    if (input == "") {
      axios.get("/books", axiosConfiguration).then((res) => {
        // console.log(res.data)
        setBooks(res.data.books);
      });
    } else {
      axios
        .post("/search", { query: input }, axiosConfiguration)
        .then((res) => {
          if (Array.isArray(res.data.books)) {
            const filteredBooks = res.data.books.filter(
              (e) => e.imageLinks && e.imageLinks.thumbnail
            );
            setBooks(filteredBooks);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [input]);

  console.log("input:", input);
  console.log("books:", books);

  const handleSubmit = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: document.querySelector(".booksDiv").offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Navbar />
      <div className="main">
        <div>
          <img className="vector" src={HomeMainLeft} alt="" />
          <div>
            <h1 className="welcome-text">
              Reading Made Simple,
              <br /> Reading Made Free.{" "}
            </h1>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="main-search">
          <img className="search-red" src={SearchRed} alt="" />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search Books"
            value={input}
          />
          <button type="submit" className="SearchButton">
            Search
          </button>
        </form>
      </div>
      <div className="booksDiv">
        {input != "" ? (
          <div className="searchResult">
            <h1>
              <span className="result-number">{books.length}</span> Search
              Result Found for: <br />{" "}
              <span className="book-name">{input}</span>
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="popular"> Popular Books </h1>
          </div>
        )}
        <div className="result">
          {books.map((e) => {
            return (
              <div className="eachBookDiv">
                <div className="insideDiv">
                  <img src={e.imageLinks.thumbnail} alt="" />
                  <div className="details">
                    <p className="title">{e.title}</p>
                    <div className="inline">
                      {e.averageRating ? (
                        <p className="Rating"> {e.averageRating} ⭐</p>
                      ) : (
                        <p className="Rating">5.0 ⭐</p>
                      )}
                      <p>Free</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Home;
