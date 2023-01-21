import React from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { changeIsLogin, logOut } from "../../actions";

import classes from "./header.module.scss";

function Header(props) {
  const { isLogin, user } = props;
  const dispatch = useDispatch();
  const content = isLogin ? (
    <>
      <Link to="/new-article" className={`${classes.header__button}  ${classes["header__btn-create"]}`}>
        Create article
      </Link>
      <div className={classes.header__name}>{user.username}</div>
      <Link to="/profile">
        <img src={user.image} alt="Avatar" className={classes.header__image} />
      </Link>
      <Link to="/articles">
        <button
          type="button"
          className={`${classes.header__button} ${classes["header__btn-log-out"]}`}
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Log Out
        </button>
      </Link>
    </>
  ) : (
    <>
      <Link to="/sign-in" className={classes.header__button}>
        Sign In
      </Link>
      <Link to="/sign-up" className={`${classes.header__button}  ${classes["header__btn-sign-up"]}`}>
        Sign Up
      </Link>
    </>
  );
  return (
    <header className={`${classes.header} ${classes.header__container}`}>
      <Link to="/articles">
        <h2 className={classes.header__title}>Realworld Blog</h2>
      </Link>
      <div className={classes.header__body}>{content}</div>
    </header>
  );
}

const mapStateToProps = ({ isLogin, user }) => {
  return { isLogin, user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
