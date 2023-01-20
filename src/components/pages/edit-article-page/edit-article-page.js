import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Alert, Spin } from "antd";

import ArticleForm from "../../article-form/article-form";
import { getOneArticle } from "../../../actions/index";

function EditArticlePage({ slug }) {
  const dispatch = useDispatch();
  const { article, load, error } = useSelector((state) => state);

  const [complited, setComplited] = useState(false);

  const changeComplited = () => {
    setComplited(true);
  };

  useEffect(() => {
    dispatch(getOneArticle(slug));
  }, []);

  const isLoading = load ? (
    <Spin size="large" />
  ) : (
    <ArticleForm article={article} nameForm="edit" changeComplited={changeComplited} />
  );

  const content = error ? (
    <Alert type="error" message="Что-то пошло нет так, попробутйе перезагрузить страницу" />
  ) : (
    isLoading
  );

  if (complited && !load) {
    return <Redirect to={`/articles/${article.slug}`} />;
  }
  return <div className="article-edit">{content}</div>;
}
export default EditArticlePage;
