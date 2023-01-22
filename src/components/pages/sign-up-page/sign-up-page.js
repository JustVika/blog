import React from "react";
import { Link } from "react-router-dom";

import UpChangeForm from "../../up-change-form/up-change-form";

import classes from "./sign-up-page.module.scss";

function SignUpPage() {
  return (
    <div className={classes["sign-up"]}>
      <UpChangeForm buttonName="Create" />
      <p className={classes["sign-up__transition-text"]}>
        Already have an account?{" "}
        <Link to="/sign-in">
          <span className={classes["sign-up__link"]}>Sign In.</span>
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
