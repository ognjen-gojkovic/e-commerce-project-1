import React from "react";
// import "./customButton.scss";
import { CustomButtonContainer } from "./customButtonWithStyles";

const customButton = (props) => {
  return (
    <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
  );
};

export default customButton;
