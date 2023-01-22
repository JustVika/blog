import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { validationForm, changeUserError } from "../../actions";
import "./App.scss";
import Header from "../header/header";
import MainPage from "../pages/main-page";
import SignUpPage from "../pages/sign-up-page/sign-up-page";
import SingleArticlePage from "../pages/single-article-page/single-article-page";
import SignInPage from "../pages/sign-in-page/sign-in-page";
import EditProfilePage from "../pages/edit-profile-page/edit-profile-page";
import ArticleForm from "../article-form/article-form";
import EditArticlePage from "../pages/edit-article-page/edit-article-page";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const defaultUser = JSON.parse(localStorage.getItem("user"));
      dispatch(validationForm(defaultUser, "login"));
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <Route
              path="/articles/:slug/edit"
              render={({ match }) => {
                const { slug } = match.params;
                return <EditArticlePage slug={slug} nameForm="edit" />;
              }}
            />
            <Route
              path="/articles/:slug"
              exact
              render={({ match }) => {
                const { slug } = match.params;
                return <SingleArticlePage slug={slug} />;
              }}
            />
            <Route path="/articles" exact component={MainPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/profile" component={EditProfilePage} />
            <Route
              path="/new-article"
              render={() => {
                return <ArticleForm nameForm="new" />;
              }}
            />

            <Route path="" component={MainPage} />
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
