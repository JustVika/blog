import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { validationFormEdit, changeUserError } from "../../actions/index";

import classes from "./up-change-form.module.scss";

function UpChangeForm(props) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { buttonName } = props;
  const isCreateForm = buttonName === "Create";
  const title = buttonName === "Create" ? "Create new account" : "Edit Profile";
  const labelPassword = isCreateForm ? "Repeat password" : "New password";
  const { userError, user, isLogin } = useSelector((state) => state);

  const onSubmit = (data) => {
    dispatch(validationFormEdit(data));
  };
  useEffect(() => {
    return () => {
      dispatch(changeUserError({}));
    };
  }, []);

  if (userError?.notErrors) {
    return <Redirect to="/articles" />;
  }

  const inputClassName = classes.form__input;
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={classes.form__title}>{title}</h3>
      <label className={classes.form__label}>
        Username
        <input
          type="text"
          {...register("username", {
            minLength: 3,
            maxLength: 20,
            required: true,
          })}
          className={
            errors.username || userError.username
              ? `${inputClassName} ${classes["form__input--red"]}`
              : `${inputClassName} `
          }
          placeholder="Username"
          defaultValue={user.username}
        />
        {errors.username && (
          <p className={classes.form__error}>username должен быть от 3 до 20 символов (включительно)</p>
        )}
        {/* Проверяем, если нет пользовательских ошибок, то выводим ошибки с сервера при наличии */}
        {userError.username && !errors.username && <p className={classes.form__error}>This username is already use</p>}
      </label>
      <label className={classes.form__label}>
        Email address
        <input
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            },
          })}
          placeholder="Email address"
          type="text"
          className={
            errors.email || userError.email ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `
          }
          defaultValue={user.email ? user.email : ""}
        />
        {errors.email && <p className={classes.form__error}>email должен быть корректным почтовым адресом</p>}
        {/* Проверяем, если нет пользовательских ошибок, то выводим ошибки с сервера при наличии */}
        {userError.email && !errors.email && <p className={classes.form__error}>This email is already use</p>}
      </label>
      <label className={classes.form__label}>
        Password
        <input
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          placeholder="Password"
          type="password"
          className={errors.password ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `}
        />
        {errors.password && (
          <p className={classes.form__error}>password должен быть от 6 до 40 символов (включительно)</p>
        )}
      </label>
      {isCreateForm ? (
        <>
          <label className={classes.form__label}>
            {labelPassword}
            <input
              {...register("password-repeat", {
                required: "Please repeat your password!",
                validate: (value) => value === getValues("password") || "Пароли должны совпадать",
              })}
              placeholder="Repeat password"
              type="password"
              className={
                errors["password-repeat"] ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `
              }
            />
            {errors["password-repeat"] && (
              <p className={classes.form__error}>password и repeat password должны совпадать</p>
            )}
          </label>
          <label className={`${classes.form__label} ${classes["form__label--checkbox"]}`}>
            <input
              {...register("checkbox", {
                required: "Please repeat your password!",
              })}
              placeholder="Email address"
              type="checkbox"
              className={errors.password ? `${inputClassName}  ${classes["form__input--red"]}` : `${inputClassName} `}
            />
            I agree to the processing of my personal information
          </label>
          {errors.checkbox && <p className={classes.form__error}> Пожалуйста поставьте галочку</p>}
        </>
      ) : (
        <label className={classes.form__label}>
          Avatar image (url)
          <input
            {...register("image", {
              pattern: {
                value: /\.(jpeg|jpg|gif|png)$/,
              },
            })}
            placeholder="Avatar url"
            type="text"
            defaultValue={user.image}
            className={errors.image ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `}
          />
          {errors.image && <p className={classes.form__error}>avtar url должен быть корректным</p>}
        </label>
      )}

      <input type="submit" className={classes.form__button} value={buttonName} />
    </form>
  );
}

export default UpChangeForm;
