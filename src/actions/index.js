import Server from "../server/server";

const newServer = new Server();

const articlesUpdate = (articels) => {
  return {
    type: "ARTICLES_UPDATE",
    payload: articels,
  };
};

const changeArticleCount = (count) => {
  return {
    type: "CHANGE_ARTICLE_COUNT",
    payload: count,
  };
};

const changeCurrentPage = (page) => {
  return {
    type: "CHANGE_CURRENT_PAGE",
    payload: page,
  };
};

const changeUserError = (userError) => {
  return {
    type: "CHANGE_USER_ERROR",
    payload: userError,
  };
};

const changeIsLogin = (value) => {
  return {
    type: "CHANGE_IS_LOGIN",
    payload: value,
  };
};

const changeLoading = (value) => {
  return {
    type: "CHANGE_LOADING",
    payload: value,
  };
};
const changeError = (value) => {
  return {
    type: "CHANGE_ERROR",
    payload: value,
  };
};

const changeCurrentAricle = (article) => {
  return {
    type: "CHANGE_CURRENT_ARTICLE",
    payload: article,
  };
};

const getArticles = () => {
  return async (dispatch, getState) => {
    dispatch(changeLoading(true));
    dispatch(changeError(false));
    const { currentPage } = getState();
    try {
      const articles = await newServer.getArticles(currentPage);
      await dispatch(articlesUpdate(articles.articles));
      await dispatch(changeArticleCount(articles.articlesCount));
      dispatch(changeLoading(false));
    } catch (err) {
      dispatch(changeLoading(false));
      dispatch(changeError(true));
    }
  };
};

const newPage = (page) => {
  return async (dispatch) => {
    try {
      const articles = await newServer.getArticles(page);
      dispatch(articlesUpdate(articles.articles));
      dispatch(changeCurrentPage(page));
      return true;
    } catch (err) {
      return err;
    }
  };
};

const logInUser = (user) => {
  const newUser = { ...user };
  if (!user.image) newUser.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
  return {
    type: "LOG_IN_USER",
    payload: newUser,
  };
};
const validationForm = (user, name) => {
  return async (dispatch) => {
    let data;
    if (name === "edit") {
      data = await newServer.userEdit(user);
    }
    if (name === "create") {
      data = await newServer.userRegistration(user);
      if (newServer.token) dispatch(changeIsLogin(true));
    }
    if (name === "login") {
      data = await newServer.userLogin(user);
      if (newServer.token) dispatch(changeIsLogin(true));
    }
    console.log(data);
    if (data.errors) {
      dispatch(changeUserError({ ...data.errors }));
      return;
    }
    const {
      user: { username, image = "https://static.productionready.io/images/smiley-cyrus.jpg", email },
    } = data;
    dispatch(logInUser({ username, image, email }));
    dispatch(changeUserError({ notErrors: true }));
  };
};

const logOut = () => {
  return (dispatch) => {
    dispatch(changeIsLogin(false));
    dispatch(logInUser({}));

    localStorage.removeItem("user");
    newServer.token = "";
    dispatch(getArticles());
  };
};

const getOneArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(changeLoading(true));
      const dataArticle = await newServer.getArticle(slug);
      await dispatch(changeCurrentAricle(dataArticle.article));
      dispatch(changeLoading(false));
      dispatch(changeError(false));
    } catch (err) {
      dispatch(changeError(true));
      dispatch(changeLoading(false));
    }
  };
};

const changeLike = async (slug, value) => {
  await newServer.changeLike(slug, value);
};

const createArticle = ({ body, isEdit, slug }) => {
  return async (dispatch) => {
    dispatch(changeLoading(true));
    dispatch(changeError(false));
    try {
      const data = isEdit ? await newServer.editArticle(body, slug) : await newServer.createArticle(body);
      dispatch(changeCurrentAricle(data.article));
      dispatch(changeLoading(false));
    } catch (err) {
      dispatch(changeError(true));
      dispatch(changeLoading(false));
    }
  };
};

const deleteArticle = (slug) => {
  return async () => {
    await newServer.deleteArticle(slug);
  };
};

export {
  getArticles,
  newPage,
  changeIsLogin,
  changeUserError,
  logOut,
  getOneArticle,
  changeLike,
  createArticle,
  deleteArticle,
  validationForm,
};
