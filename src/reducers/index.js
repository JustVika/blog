const intitialState = {
  articles: [],
  currentPage: 1,
  articlesCount: 0,
  isLogin: false,
  userError: {},
  user: {},
  load: true,
  error: false,
  article: {},
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case "ARTICLES_UPDATE":
      return {
        ...state,
        articles: [...action.payload],
      };
    case "CHANGE_ARTICLE_COUNT":
      return {
        ...state,
        articlesCount: action.payload,
      };
    case "CHANGE_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "CHANGE_USER_ERROR":
      return {
        ...state,
        userError: { ...action.payload },
      };
    case "CHANGE_IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "LOG_IN_USER":
      return {
        ...state,
        user: { ...action.payload },
      };
    case "CHANGE_LOADING":
      return {
        ...state,
        load: action.payload,
      };
    case "CHANGE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CHANGE_CURRENT_ARTICLE":
      return {
        ...state,
        article: { ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
