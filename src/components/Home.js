import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../firebase/setup";
import Footer from "./Footer";

const Home = () => {
  const [oonf, setOonf] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [actionM, setActionsM] = useState([]);
  const [horrorM, setHorrorM] = useState([]);
  const [comedyM, setComedyM] = useState([]);

  const getMovie = () => {
    try {
      // fetch(
      //   `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_API_KEY}`
      // )
      //   .then((res) => res.json())
      //   .then((json) => setMovies(json.results));

      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.movie);
          setActionsM(data.ActionMovie);
          setHorrorM(data.HorrorMovie);
          setComedyM(data.ComedyMovie);
          setOonf(data.OnlyOnNetflix);
          setTvShows(data.tv);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const addMovie = async (movie) => {
    const movieRef = doc(database, "Movies", `${movie.id}`);
    try {
      await setDoc(movieRef, { movieName: movie.original_title });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#181818", paddingTop: "20px" }}>
      <div>
        <h2 style={{ color: "#fff", marginLeft: "1rem", padding: "10px" }}>
          Popular Movie's on Netflix
        </h2>
      </div>
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        {movies.map((item) => {
          {
            addMovie(item);
          }
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="movieDetail" state={{ movie: item }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.banner}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <h2 style={{ color: "#fff", marginLeft: "1rem", padding: "10px" }}>
          Popular TV Show's on Netflix
        </h2>
      </div>

      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingBottom: "45px",
        }}
      >
        {tvShows.map((item) => {
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="movieDetail">
                  <Card>
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.banner}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <h2 style={{ color: "#fff", marginLeft: "1rem", padding: "10px" }}>
          Only on Netflix
        </h2>
      </div>

      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingBottom: "45px",
        }}
      >
        {oonf.map((item) => {
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="movieDetail">
                  <Card>
                    <CardMedia
                      component="img"
                      height="460"
                      image={item.poster}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <h2 style={{ color: "#fff", marginLeft: "1rem", padding: "10px" }}>
          Action
        </h2>
      </div>

      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingBottom: "45px",
        }}
      >
        {actionM.map((item) => {
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="movieDetail">
                  <Card>
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.banner}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <h2 style={{ color: "#fff", marginLeft: "1rem", padding: "10px" }}>
          Horror
        </h2>
      </div>

      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingBottom: "45px",
        }}
      >
        {horrorM.map((item) => {
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="movieDetail">
                  <Card>
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.banner}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <h2 style={{ color: "#fff", marginLeft: "1rem", padding: "10px" }}>
          Comedy
        </h2>
      </div>

      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
          paddingBottom: "45px",
        }}
      >
        {comedyM.map((item) => {
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="movieDetail">
                  <Card>
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.banner}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Footer />
    </div>
  );
};

export default Home;
