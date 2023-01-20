class Server {
  token = "";

  url = "https://blog.kata.academy/api";

  getArticles = async (page = 1) => {
    const res = await fetch(`https://blog.kata.academy/api/articles?limit=${5}&offset=${(page - 1) * 5}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
    });

    const body = await res.json();
    return body;
  };

  userRegistration = async ({ username, email, password }) => {
    const body = {
      user: {
        username,
        email,
        password,
      },
    };
    try {
      const res = await fetch("https://blog.kata.academy/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        this.token = data.user.token;
      }

      return data;
    } catch (err) {
      return err;
    }
  };

  userLogin = async (email, password) => {
    const body = {
      user: {
        email,
        password,
      },
    };
    const res = await fetch("https://blog.kata.academy/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.user) this.token = data.user.token;
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
    }
    return data;
  };

  userEdit = async ({ username, email, password, image }) => {
    const body = {
      user: {
        username,
        email,
        password,
        image,
      },
    };
    const res = await fetch(`${this.url}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
    }

    return data;
  };

  getArticle = async (slug) => {
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
    });
    const data = await res.json();
    return data;
  };

  changeLike = async (slug, value) => {
    const res = await fetch(`${this.url}/articles/${slug}/favorite`, {
      method: value ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
    });
    if (!res.ok) {
      throw new Error();
    }
  };

  createArticle = async (article) => {
    const body = { article };
    const res = await fetch(`${this.url}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = res.json();
    if (!res.ok) throw new Error();
    return data;
  };

  editArticle = async (article, slug) => {
    const body = { article };
    const res = await fetch(`${this.url}/articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Something went wrong. Try later");
    return data;
  };

  deleteArticle = async (slug) => {
    const response = await fetch(`${this.url}/articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${this.token}`,
      },
    });
    if (!response.ok) throw new Error("Something went wrong. Try later");
  };
}

export default Server;
