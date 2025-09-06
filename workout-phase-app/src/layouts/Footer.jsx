import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import "./Footer.css";

function Footer() {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2" className="footer-text">
        © {new Date().getFullYear()} FlowFit | Made with ❤️
      </Typography>
      <Box className="footer-icons">
        <IconButton
          component="a"
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://instagram.com/your-instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:youremail@example.com"
          className="footer-icon"
        >
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
