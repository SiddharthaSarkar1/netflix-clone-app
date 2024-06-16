import {
  IoLogoLinkedin as Linkedin,
  IoLogoTwitter as Twitter,
  IoLogoGithub as Github,
} from "react-icons/io5";

export default function Footer() {
  return (
    <div
      style={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingBottom: "1.5rem",
      }}
    >
      <p>
        Made by{" "}
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit", textDecoration: "none", outline: "none" }}
        >
          <b>Siddhartha Sarkar</b>
        </a>
      </p>
      <div>
        <a
          href="#"
          style={{
            color: "inherit",
            textDecoration: "none",
            outline: "none",
            fontSize: "1.2rem",
            margin: "0 0.4rem",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin />
        </a>
        <a
          href="#"
          style={{
            color: "inherit",
            textDecoration: "none",
            outline: "none",
            fontSize: "1.2rem",
            margin: "0 0.4rem",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </a>
        <a
          href="#"
          style={{
            color: "inherit",
            textDecoration: "none",
            outline: "none",
            fontSize: "1.2rem",
            margin: "0 0.4rem",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </div>
    </div>
  );
}
