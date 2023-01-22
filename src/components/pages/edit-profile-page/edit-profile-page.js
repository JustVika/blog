import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import UpChangeForm from "../../up-change-form/up-change-form";

import classes from "./edit-profile-page.module.scss";

function EditProfilePage() {
  const { isLogin } = useSelector((state) => state);
  if (!isLogin) {
    return <Redirect to="/articles" />;
  }
  return (
    <div className={classes["edit-profile"]}>
      <UpChangeForm buttonName="Save" />
    </div>
  );
}

export default EditProfilePage;
