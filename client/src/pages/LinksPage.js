import React, { useState, useCallback, useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState(null);
  const { request, loading } = useHttp();

  // можно определить прямо в useEffect без useCallback
  const getLinks = useCallback(async () => {
    try {
      const data = await request(`/api/link`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(data);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) return <Loader />;

  if (links) return <LinksList links={links} />;
  return null;
};
