import React, { useState } from "react";
import format from "date-fns/format";
import ReactMarkdown from "react-markdown";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import { Popconfirm, message } from "antd";

import { changeLike, deleteArticle } from "../../actions";

import "./article-item.css";

function ArticleItem(props) {
  const {
    article: {
      title,
      favoritesCount,
      favorited,
      tagList,
      description,
      createdAt,
      slug,
      body,
      author: { username, image },
    },
    singleArticle,
    changeComplited,
  } = props;
  const { isLogin, user, load } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [like, setLike] = useState({ like: favorited, count: favoritesCount });
  const clickOnLike = async () => {
    if (!isLogin) return;
    const valueLike = !like.like;
    try {
      await changeLike(slug, valueLike);
      setLike(({ count }) => ({
        like: valueLike,
        count: valueLike ? count + 1 : count - 1,
      }));
    } catch (err) {
      throw new Error("Что-то пошло не так");
    }
  };

  const confirm = () => {
    message.success("Article is deleted...");
    dispatch(deleteArticle(slug));
    changeComplited(true);
  };

  const cancel = () => {
    message.error("You canceled the deletion of the article");
  };

  const tagsList = tagList.map((tag) => {
    const key = `${tag}${Math.random() * 1000}`;
    return (
      <li key={key} className="article__tag-item">
        {tag}
      </li>
    );
  });

  const classNameLike = like.like ? "article__like article__like--like-on" : "article__like";

  const date = format(new Date(createdAt), "MMMM d',' yyyy");

  const history = useHistory();

  const isLoginSegment =
    user.username === username && singleArticle ? (
      <div className="article__author-login-segment">
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className="article__delete">
            Delete
          </button>
        </Popconfirm>
        <button
          type="button"
          onClick={() => {
            history.push(`/articles/${slug}/edit`);
          }}
          className="article__edit"
        >
          Edit
        </button>
      </div>
    ) : null;
  return (
    <article className="article">
      <div className="article__wrap">
        <div className="article__body">
          <div className="article__title">
            <button
              type="button"
              onClick={() => {
                history.push(`/articles/${slug}`);
              }}
              className="article__title-text"
            >
              {title}
            </button>
            <button type="button" className={classNameLike} disabled={favorited} onClick={clickOnLike}>
              {" "}
            </button>
            <div className="article__like-count">{like.count}</div>
          </div>
          <ul className="article__tag-list">{tagsList}</ul>
          <p className="article__description">{description}</p>
        </div>
        <div className="article__author-body">
          <div className="article__author">
            <div className="article__author-data">
              <div className="article__author-name">{username}</div>
              <div className="article__author-date">{date}</div>
            </div>
            <img className="article__author-image" src={image} alt="avatar" />
          </div>
          {isLoginSegment}
        </div>
      </div>

      {singleArticle ? (
        <div className="article__content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      ) : null}
    </article>
  );
}

export default ArticleItem;
