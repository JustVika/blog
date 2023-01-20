import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { validationFormLogin, changeUserError } from "../../../actions";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(validationFormLogin(data));
  };

  const { isLogin, userError } = useSelector((state) => state);

  useEffect(() => {
    dispatch(changeUserError({}));
  }, []);
  if (isLogin) {
    return <Redirect to="/articles" />;
  }
  const inputClassName = "form__input";
  return (
    <div className="sign-up">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">Sign In</h3>
        <label className="form__label">
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
            className={userError["email or password"] ? `${inputClassName} form__input--red` : `${inputClassName} `}
          />
          {errors.email && <p className="form__error">email должен быть корректным почтовым адресом</p>}
        </label>
        <label className="form__label">
          Password
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className={userError["email or password"] ? `${inputClassName} form__input--red` : `${inputClassName} `}
          />
          {userError["email or password"] && <p className="form__error">Email или пароль введены не верно</p>}
        </label>

        <input type="submit" className="form__button" value="Login" />
      </form>
      <p className="sign-up__transition-text">
        Already have an account?{" "}
        <Link to="/sign-up">
          <span className="sign-up__link">Sign Up.</span>
        </Link>
      </p>
    </div>
  );
}
export default SignInPage;
