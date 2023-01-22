import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { changeUserError, validationForm } from "../../../actions";

import classes from "./sign-in-page.module.scss";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(validationForm(data, "login"));
  };

  const { isLogin, userError } = useSelector((state) => state);
  useEffect(() => {
    return () => {
      dispatch(changeUserError({}));
    };
  }, []);
  if (isLogin) {
    return <Redirect to="/articles" />;
  }
  const inputClassName = classes.form__input;
  return (
    <div className={classes["sign-in"]}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={classes.form__title}>Sign In</h3>
        <label className={classes.form__label}>
          Email address
          <input
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
              },
            })}
            placeholder="Email address"
            type="text"
            className={
              userError["email or password"] ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `
            }
          />
          {errors.email && <p className={classes.form__error}>email должен быть корректным почтовым адресом</p>}
        </label>
        <label className={classes.form__label}>
          Password
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className={
              userError["email or password"] ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `
            }
          />
          {userError["email or password"] && <p className={classes.form__error}>Email или пароль введены не верно</p>}
        </label>

        <input type="submit" className={classes.form__button} value="Login" />
        <p className={classes["sign-in__transition-text"]}>
          Don’t have an account?
          <Link to="/sign-up">
            <span className={classes["sign-in__link"]}>Sign Up.</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
export default SignInPage;
