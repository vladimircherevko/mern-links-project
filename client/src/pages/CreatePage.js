import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {
  const [link, setLink] = useState("");
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandle = async event => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Beared ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field mt-4">
          <input
            id="link"
            type="text"
            className=""
            name="link"
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandle}
            value={link}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
};
