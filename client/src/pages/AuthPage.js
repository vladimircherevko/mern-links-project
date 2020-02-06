import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp(); //исп. пользоват. хук
  const message = useMessage(); //исп. пользоват. хук

  useEffect(() => {
    message(error);
    clearError();
  }, [error, clearError, message]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandle = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registeryHandle = async () => {
    try {
      const data = await request("/api/auth/registery", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandle = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2>Сократи Ссылку</h2>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field mt-4">
                <input
                  id="email"
                  type="text"
                  className="yellow-inp"
                  name="email"
                  onChange={changeHandle}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field mt-4">
                <input
                  id="password"
                  type="password"
                  className="yellow-inp"
                  name="password"
                  onChange={changeHandle}
                  value={form.password}
                />
                <label htmlFor="email">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandle}
              disabled={loading}
              className="btn yellow darken-4 mr-2"
            >
              Войти
            </button>
            <button
              onClick={registeryHandle}
              disabled={loading}
              className="btn grey lighten-1 black-text"
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
