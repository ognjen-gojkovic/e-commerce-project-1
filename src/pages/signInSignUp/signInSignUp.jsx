import React from "react";
import "./signInSignUp.scss";
import SignIn from "../../components/signIn/signIn";
import SignUp from "../../components/signUp/signUp";

const SignInSignUp = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInSignUp;
