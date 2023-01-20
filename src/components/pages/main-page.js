import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin, Alert } from "antd";

import ArticlesList from "../articles-list/articles-list";
import { newPage, getArticles } from "../../actions";

function MainPage() {
  const { currentPage, articlesCount, load, error } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  const isLoading = load ? (
    <Spin className="spin" size="large" />
  ) : (
    <>
      <ArticlesList />

      <Pagination
        current={currentPage}
        total={articlesCount}
        hideOnSinglePage
        defaultPageSize={5}
        showSizeChanger={false}
        onChange={(page) => {
          dispatch(newPage(page));
        }}
        className="pagination"
      />
    </>
  );
  const content = error ? (
    <Alert type="error" message="При загрузке страницы что-то пошло не так, попробуйту перезагрузить страницу" />
  ) : (
    isLoading
  );
  return <> {content} </>;
}

export default MainPage;
