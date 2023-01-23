import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import { createArticle } from "../../actions";
import { mainPath } from "../../const-path-page";

import classes from "./article-form.module.scss";

function ArticleForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = useState([{ tag: nanoid(), label: "" }]);
  const [complited, setComplited] = useState(false);

  const { article, load, error, isLogin } = useSelector((state) => state);
  const { nameForm, changeComplited } = props;
  const isEdit = nameForm === "edit";
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && article.tagList.length) {
      const tagArray = article.tagList.map((elem) => {
        return { tag: nanoid(), label: elem };
      });
      setTags(tagArray);
    }
  }, []);
  if (!isLogin) {
    return <Redirect to={mainPath} />;
  }
  const onSubmit = (data) => {
    const tagList = tags.reduce((accumulator, element) => {
      if (element.label.trimStart()) {
        accumulator.push(element.label);
      }
      return accumulator;
    }, []);
    const body = { ...data, tagList };
    const { slug } = article;
    dispatch(createArticle({ body, isEdit, slug }));
    isEdit ? changeComplited() : setComplited(true);
  };

  if (complited && error) {
    return (
      <Alert type="error" message="При загрузке страницы что-то пошло не так, попробуйту перезагрузить страницу" />
    );
  }
  if (complited && !load) {
    return <Redirect to={`${mainPath}/${article.slug}`} />;
  }

  const deleteTag = (tag) => {
    if (tags.length === 1) return;
    const idx = tags.findIndex((elem) => elem.tag === tag);
    setTags((tagsArray) => [...tagsArray.slice(0, idx), ...tagsArray.slice(idx + 1)]);
  };

  const changeTag = (event, tag) => {
    const tagValue = event.target.value.trimStart();
    if (!tagValue && tags.length !== 1) return deleteTag(tag);
    const idx = tags.findIndex((elem) => elem.tag === tag);
    setTags((tagsArray) => [...tagsArray.slice(0, idx), { tag, label: tagValue }, ...tagsArray.slice(idx + 1)]);
    return true;
  };

  const addTag = (elem) => {
    if (!elem.label.trimStart()) {
      return;
    }
    setTags((tagsArray) => [...tagsArray, { tag: nanoid(), label: "" }]);
  };

  const inputClassName = classes.form__input;
  const tagsElement = tags.map((elem, index) => {
    const isEndTag = tags.length - 1 === index;
    return (
      <div className={classes["form__tag-wrapper"]} key={elem.tag}>
        <input
          type="text"
          value={elem.label}
          onChange={(event) => changeTag(event, elem.tag)}
          className={`${inputClassName} `}
          placeholder="Title"
        />

        <button type="button" className={classes["form__tag-delet"]} onClick={() => deleteTag(elem.tag)}>
          Delet
        </button>
        {isEndTag ? (
          <button onClick={() => addTag(elem)} type="button" className={classes["form__tag-add"]}>
            Add tag
          </button>
        ) : null}
      </div>
    );
  });
  return (
    <div className={classes["article-form"]}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.form__title}>{`${nameForm === "new" ? "Create new" : "Edit"} article`}</h2>
        <label className={`${classes.form__label}  ${classes["form__label--article"]}`}>
          Title
          <input
            type="text"
            {...register("title", {
              required: true,
              validate: (value) => {
                return Boolean(value.trim());
              },
            })}
            defaultValue={isEdit ? article.title : ""}
            className={errors.title ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `}
            placeholder="Title"
          />
          {errors.title && <p className={classes.form__error}>Это поле должно содержать минимум один символ</p>}
        </label>
        <label className={`${classes.form__label}  ${classes["form__label--article"]}`}>
          Short description
          <input
            type="text"
            {...register("description", {
              required: true,
              validate: (value) => {
                return Boolean(value.trim());
              },
            })}
            defaultValue={isEdit ? article.description : ""}
            className={errors.description ? `${inputClassName} ${classes["form__input--red"]}` : `${inputClassName} `}
            placeholder="Short description"
          />
          {errors.description && <p className="form__error">Это поле должно содержать минимум один символ</p>}
        </label>
        <label className={`${classes.form__label}  ${classes["form__label--article"]}`}>
          Text
          <textarea
            {...register("body", {
              required: true,
              validate: (value) => {
                return Boolean(value.trim());
              },
            })}
            defaultValue={isEdit ? article.body : ""}
            className={
              errors.body
                ? `${inputClassName} ${classes["form__input--red"]} ${classes.form__textarea}`
                : `${inputClassName} ${classes.form__textarea}`
            }
            placeholder="Text"
          />
          {errors.body && <p className={classes.form__error}>Это поле должно содержать минимум один символ</p>}
        </label>
        <label className={`${classes.form__label}  ${classes["form__label--article"]}`}>
          Tag
          {tagsElement}
        </label>
        <input type="submit" className={classes.form__button} value="Send" />
      </form>
    </div>
  );
}

export default ArticleForm;
