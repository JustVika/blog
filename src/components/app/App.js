import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { validationForm } from "../../actions";
import "./App.scss";
import Header from "../header/header";
import MainPage from "../pages/main-page";
import SignUpPage from "../pages/sign-up-page/sign-up-page";
import SingleArticlePage from "../pages/single-article-page/single-article-page";
import SignInPage from "../pages/sign-in-page/sign-in-page";
import EditProfilePage from "../pages/edit-profile-page/edit-profile-page";
import ArticleForm from "../article-form/article-form";
import EditArticlePage from "../pages/edit-article-page/edit-article-page";
import {
  editArticlePath,
  singleArticlePath,
  mainPath,
  signUpPath,
  signInPath,
  profilePath,
  newArticlePath,
} from "../../const-path-page";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const defaultUser = JSON.parse(localStorage.getItem("user"));
      dispatch(validationForm(defaultUser, "login", true));
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <Route
              path={editArticlePath}
              render={({ match }) => {
                const { slug } = match.params;
                return <EditArticlePage slug={slug} nameForm="edit" />;
              }}
            />
            <Route
              path={singleArticlePath}
              exact
              render={({ match }) => {
                const { slug } = match.params;
                return <SingleArticlePage slug={slug} />;
              }}
            />
            <Route path={mainPath} exact component={MainPage} />
            <Route path={signUpPath} component={SignUpPage} />
            <Route path={signInPath} component={SignInPage} />
            <Route path={profilePath} component={EditProfilePage} />
            <Route
              path={newArticlePath}
              render={() => {
                return <ArticleForm nameForm="new" />;
              }}
            />

            <Route path="/" exact component={MainPage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

const mapStateToProps = ({ page, articlesCount }) => {
  return { page, articlesCount };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
