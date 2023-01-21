import { useSelector } from "react-redux";

import ArticleItem from "../article-item/article-item";

import "./articles-list.css";

function ArticlesList() {
  const { articles } = useSelector((state) => state);

  const listArticles = articles.map((article) => {
    return (
      <div key={article.slug} className="list-articles__item">
        <ArticleItem article={article} key={article.slug} />
      </div>
    );
  });
  return <div className="list-articles">{listArticles}</div>;
}

export default ArticlesList;
