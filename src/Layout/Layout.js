import React from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Layout = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(matches);

  return (
    <>{matches ? <Desktop>{children}</Desktop> : <Mobile>{children}</Mobile>}</>
  );
};

export default Layout;
