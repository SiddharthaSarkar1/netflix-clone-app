import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import netflixLogo from "../images/netflix.png";
import { auth, googleAuth } from "../firebase/setup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Background from '../images/signinbg.png';

const Signin = () => {

  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuth);

      setTimeout(() => {
        auth.currentUser?.emailVerified && navigate("/");
      }, 2000);
      toast.success("Signed in successfully!", {
        theme: "dark"
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(auth?.currentUser);  

  return (
    <div style={{ backgroundImage: `linear-gradient(
      rgba(0,0,0, 0.5), 
      rgba(0,0,0, 0.5)), url(${Background})`, height: "100vh", padding: "20px" }}>
      <ToastContainer autoClose={2000} />
        <img style={{width: "150px"}} src={netflixLogo} />
      <div style={{ backgroundColor: "#181818", padding: "35px",  position: "fixed", left: "40%", top: "30%", borderRadius: "12px" }}>
      <div>
        <h2 style={{color: "white"}}>Let's start <br /> to explore movies <br /> from here.</h2>
        </div>
        <br />
        <Button onClick={googleSignIn} variant="contained" color="error">
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default Signin;
