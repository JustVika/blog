import { useSelector } from "react-redux";

import ArticleItem from "../article-item/article-item";

function ArticlesList() {
  const { articles } = useSelector((state) => state);

  const listArticles = articles.map((article) => {
    return (
      <div key={article.slug}>
        <ArticleItem article={article} key={article.slug} />
      </div>
    );
  });
  return <div className="list-articles">{listArticles}</div>;
}

export default ArticlesList;
