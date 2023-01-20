import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { validationFormEdit, changeUserError } from "../../../actions";
import UpChangeForm from "../../up-change-form/up-change-form";

function EditProfilePage() {
  const dispatch = useDispatch();
  const [complited, setComplited] = useState(false);
  const onSubmit = (data) => {
    const { email, password, image } = data;
    const newData = { ...data };
    localStorage.setItem("user", JSON.stringify({ email, password }));
    if (!image.trimStart()) {
      delete newData.image;
    }
    dispatch(validationFormEdit(data));
    setComplited(true);
  };

  const { userError, isLogin } = useSelector((state) => state);

  useEffect(() => {
    if (userError.username || userError.email) {
      dispatch(changeUserError({}));
    }
  }, []);

  if (!isLogin) {
    return <Redirect to="/articles" />;
  }
  if (complited) {
    return <Redirect to="/articles" />;
  }
  return (
    <div className="sign-up">
      <UpChangeForm onSubmit={onSubmit} buttonName="Save" />
    </div>
  );
}

export default EditProfilePage;
