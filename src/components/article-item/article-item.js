import React, { useState } from "react";
import format from "date-fns/format";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Popconfirm, message } from "antd";

import { changeLike, deleteArticle } from "../../actions";

import classes from "./article-item.module.scss";

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
    deleteArticle(slug);
    changeComplited(true);
  };

  const cancel = () => {
    message.error("You canceled the deletion of the article");
  };

  const tagsList = tagList.map((tag) => {
    const key = `${tag}${Math.random() * 1000}`;
    return (
      <li key={key} className={classes["article__tag-item"]}>
        {tag}
      </li>
    );
  });

  const classNameLike = like.like
    ? `${classes.article__like} ${classes["article__like--like-on"]}`
    : classes.article__like;

  const date = format(new Date(createdAt), "MMMM d',' yyyy");

  const history = useHistory();

  const isLoginSegment =
    user.username === username && singleArticle ? (
      <div className={classes["article__author-login-segment"]}>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className={classes.article__delete}>
            Delete
          </button>
        </Popconfirm>
        <button
          type="button"
          onClick={() => {
            history.push(`/articles/${slug}/edit`);
          }}
          className={classes.article__edit}
        >
          Edit
        </button>
      </div>
    ) : null;
  return (
    <article className={classes.article}>
      <div className={classes.article__wrapper}>
        <div className={classes.article__body}>
          <div className={classes.article__title}>
            <button
              type="button"
              onClick={() => {
                history.push(`/articles/${slug}`);
              }}
              className={classes["article__title-text"]}
            >
              {title}
            </button>
            <button type="button" className={classNameLike} onClick={clickOnLike}>
              {" "}
            </button>
            <div className={classes["article__like-count"]}>{like.count}</div>
          </div>
          <ul className={classes["article__tag-list"]}>{tagsList}</ul>
          <p className={classes.article__description}>{description}</p>
        </div>
        <div className={classes.article__author}>
          <div className={classes["article__author-body"]}>
            <div className={classes["article__author-data"]}>
              <div className={classes["article__author-name"]}>{username}</div>
              <div className={classes["article__author-date"]}>{date}</div>
            </div>
            <img
              className={classes["article__author-image"]}
              src={image}
              alt="avatar"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://static.productionready.io/images/smiley-cyrus.jpg";
              }}
            />
          </div>
          {isLoginSegment}
        </div>
      </div>

      {singleArticle ? (
        <div className={classes.article__content}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      ) : null}
    </article>
  );
}

export default ArticleItem;
