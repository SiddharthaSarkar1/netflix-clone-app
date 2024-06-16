import React, { useEffect, useState } from "react";
import netflixLogo from "../images/netflix.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

const browseList = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

const Navbar = () => {
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", {
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [randomIndex, setRandomIndex] = useState(0);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getMovie = () => {
    try {
      // fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_KEY}`)
      //   .then((res) => res.json())
      //   .then((json) => setMovies(json.results));

      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => setMovies(data.movie));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
    const index = getRandomInt(0, 20);
    setRandomIndex(index);
  }, []);

  const signinClick = () => {
    navigate("/signin");
  };

  // console.log(auth?.currentUser);
  console.log(movies[8]?.id);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(
            rgba(0,0,0, 0.5), 
            rgba(0,0,0, 0.5)),url(${movies[randomIndex]?.banner})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <ToastContainer autoclose={2000} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <img style={{ width: "150px" }} src={netflixLogo} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {browseList.map((item, index) => (
            <div key={index} style={{ color: "#fff", padding: "10px", fontWeight: "bold" }}>
              {item}
            </div>
          ))}
        </div>
        <div>
          {auth.currentUser?.emailVerified ? (
            <Button
              onClick={logout}
              color="error"
              variant="contained"
              sx={{ height: "40px" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={signinClick}
              color="error"
              variant="contained"
              sx={{ height: "40px" }}
            >
              SignIn
            </Button>
          )}
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <h1
          style={{ color: "#f1f1f1", fontSize: "60px", fontFamily: "initial" }}
        >
          {movies[randomIndex]?.title}
        </h1>
        <h3 style={{ color: "#f1f1f1" }}>{movies[randomIndex]?.overview}</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          {/* <Button
          variant="containes"
          sx={{ color: "black", bgcolor: "white", fontWeight: "bold" }}
        >
          View Trailer
        </Button> */}
          <Trailer movieId={movies[8]?.id} />
          <Button
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "gray",
              opacity: "0.5",
              marginLeft: "15px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-badge-info"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
