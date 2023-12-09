import { Button, Grid, TextField } from "@mui/material";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, database } from "../firebase/setup";
import netflixLogo from "../images/netflix.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

const MovieDetail = () => {
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState([]);

  const location = useLocation();

  const movieRef = doc(database, "Movies", `${location.state.movie.id}`);
  const reviewRef = collection(movieRef, "Reviews");

  const addReview = async () => {
    try {
      auth.currentUser && await addDoc(reviewRef, {
        movieReview: review,
        email: auth.currentUser?.email,
        username: auth.currentUser?.displayName,
        profile_image: auth.currentUser?.photoURL,
      });
      auth.currentUser ? toast.success("Review added successfully!", {
        theme: "dark"
      })
      : toast.warning("Please Login.", {
        theme: "dark"
      })
    } catch (error) {
      console.error(error);
    }
  };

  const showReview = async () => {
    try {
      const data = await getDocs(reviewRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviewData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showReview();
  }, []);

  // console.log(reviewData);

  return (
    <Grid container>
      <Grid item xs={8}>
        <div
          style={{
            backgroundImage: `linear-gradient(
                rgba(0,0,0, 0.5), 
                rgba(0,0,0, 0.5)),url(https://image.tmdb.org/t/p/original/${location.state.movie.poster_path})`,
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <ToastContainer autoClose={2000} />
          {" "}
          <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
            <img style={{ width: "150px" }} src={netflixLogo} />
          </div>
          <div
            style={{
              paddingTop: "110px",
              paddingLeft: "30px",
              paddingRight: "15px",
              fontFamily: "initial",
            }}
          >
            <Grid container>
              <h2
                style={{
                  color: "red",
                  fontSize: "40px",
                  textShadow: "2px 2px 4px black",
                }}
              >
                {location.state.movie?.original_title}
              </h2>
            </Grid>
            <div style={{ display: "flex" }}>
              <h4 style={{ color: "white" }}>
                Language : {location.state.movie?.original_language},
              </h4>
              <h4 style={{ color: "white", marginLeft: "10px" }}>
                Release Date : {location.state.movie?.release_date}
              </h4>
            </div>
            <Grid container>
              <h3
                style={{
                  color: "#fff",
                  fontWeight: "100",
                  textShadow: "1px 1px 2px black",
                }}
              >
                {location.state.movie?.overview}
              </h3>
              {/* <Button
                variant="contained"
                sx={{ color: "black", bgcolor: "white" }}
              >
                Play Trailer
              </Button> */}
              <Trailer location={location} />
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div
          style={{ boxSizing: "border-box", backgroundColor: "black", height: "100vh", padding: "20px" }}
        >
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "400" }}>
                ADD REVIEW
              </h5>
              <TextField
                onChange={(e) => setReview(e.target.value)}
                size="small"
                label="Review"
                variant="outlined"
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              ></TextField>
              <Button
                onClick={addReview}
                variant="contained"
                sx={{ ml: "10px", bgcolor: "red", color: "white" }}
              >
                Submit
              </Button>
            </div>
          </Grid>
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "400" }}>REVIEW</h5>
              {reviewData.map((each) => {
                return (
                  <>
                    <div style={{ display: "flex" }}>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          marginTop: "5px",
                          borderRadius: "50%",
                          border: "2px solid #fff",
                        }}
                        src={each.profile_image}
                      />
                      <h3
                        style={{
                          color: "grey",
                          marginLeft: "20px",
                          fontWeight: "600",
                        }}
                      >
                        {each.username}
                      </h3>
                    </div>
                    <h6 style={{ color: "grey" }}>{each.movieReview}</h6>
                  </>
                );
              })}
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default MovieDetail;
