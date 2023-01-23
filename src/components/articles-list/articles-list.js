import { useSelector } from "react-redux";

import ArticleItem from "../article-item/article-item";

import "./articles-list.css";

function ArticlesList() {
  const { articles } = useSelector((state) => state);
  const limitSymbol = (str, count) => {
    if (!str) return str;
    return str.length > count ? `${str.slice(0, count)} ...` : str;
  };
  const listArticles = articles.map((article) => {
    const newArticle = { ...article };
    newArticle.title = limitSymbol(newArticle.title, 50);
    newArticle.tagList = newArticle.tagList.map((tag) => limitSymbol(tag, 15));
    newArticle.description = limitSymbol(newArticle.description, 360);
    return (
      <div key={newArticle.slug} className="list-articles__item">
        <ArticleItem article={newArticle} key={newArticle.slug} />
      </div>
    );
  });
  return <div className="list-articles">{listArticles}</div>;
}

export default ArticlesList;
