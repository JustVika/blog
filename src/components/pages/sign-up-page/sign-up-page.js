import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { validationFormRegistration, changeUserError } from "../../../actions";
import "./sign-up-page.css";
import UpChangeForm from "../../up-change-form/up-change-form";

function SignUpPage() {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(validationFormRegistration(data));
  };

  const { isLogin, userError } = useSelector((state) => state);

  useEffect(() => {
    if (userError.username || userError.email) {
      dispatch(changeUserError({}));
    }
  }, []);

  if (isLogin) {
    return <Redirect to="/articles" />;
  }

  return (
    <div className="sign-up">
      <UpChangeForm onSubmit={onSubmit} buttonName="Create" />
      <p className="sign-up__transition-text">
        Already have an account?{" "}
        <Link to="/sign-in">
          <span className="sign-up__link">Sign In.</span>
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
