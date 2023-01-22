import React from "react";

import classes from "./edit-profile-page.module.scss";
import UpChangeForm from "../../up-change-form/up-change-form";

function EditProfilePage() {
  return (
    <div className={classes["edit-profile"]}>
      <UpChangeForm buttonName="Save" />
    </div>
  );
}

export default EditProfilePage;
