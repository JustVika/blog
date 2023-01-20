import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Spin, Alert } from "antd";

import "./single-article-page.css";
import ArticleItem from "../../article-item/article-item";
import { getOneArticle } from "../../../actions/index";

function SingleArticlePage({ slug }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneArticle(slug));
  }, []);

  const [complited, setComplited] = useState(false);
  const changeComplited = () => {
    setComplited(true);
  };
  const { article, load, error } = useSelector((state) => state);
  const artcleItem = !Object.keys(article).length ? null : (
    <ArticleItem article={article} singleArticle changeComplited={changeComplited} />
  );

  const isLoading = load ? <Spin className="spin" size="large" /> : artcleItem;
  const content = error ? (
    <Alert type="error" message="При загрузке страницы что-то пошло не так, попробуйту перезагрузить страницу" />
  ) : (
    isLoading
  );
  if (complited && !load) {
    return <Redirect to="/articles" />;
  }
  return <div className="singleArticle">{content}</div>;
}
export default SingleArticlePage;
