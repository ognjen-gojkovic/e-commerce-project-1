import React from "react";
// import "./homepage.scss";
import Directory from "../../components/directory/directory";
import { HomepageWithStyles } from "./homepageWithStyles";

const Homepage = () => {
  return (
    <HomepageWithStyles>
      <Directory />
    </HomepageWithStyles>
  );
};

export default Homepage;
