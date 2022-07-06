import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const navItems = ["Home", "About"];

function Desktop(props, { children }) {
  const { window } = props;
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar style={{ background: "#2E3B55" }} component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className="btn"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Arda's To Do
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/home">
              <button className="btn">Home</button>
            </Link>
            <Link to="/oldies">
              <button className="btn">Oldies</button>
            </Link>
            <button
              className="btn"
              onClick={handleLogout}
              sx={{ color: "#fff" }}
            >
              Logout
            </button>
          </Box>
        </Toolbar>
      </AppBar>
      <div className=" w-3/6 mx-auto my-16 p-4 ">{props.children}</div>
    </Box>
  );
}

Desktop.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Desktop;
