import React, { useEffect, useState } from "react";
import netflixLogo from "../images/netflix.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

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

  const getMovie = () => {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_KEY}`)
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
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
            rgba(0,0,0, 0.5)),url(https://image.tmdb.org/t/p/original/${movies[5]?.poster_path})`,
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
          {movies[5]?.original_title}
        </h1>
        <h3 style={{ color: "#f1f1f1" }}>{movies[8]?.overview}</h3>
        {/* <Button
          variant="containes"
          sx={{ color: "black", bgcolor: "white", fontWeight: "bold" }}
        >
          View Trailer
        </Button> */}
        <Trailer movieId={movies[8]?.id} />
      </div>
    </div>
  );
};

export default Navbar;
