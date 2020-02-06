import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const { request, loading } = useHttp();

  //getLink можно определить прямо в useEffect без useCallback
  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(data);
    } catch (e) {}
  }, [linkId, token, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) return <Loader />;
  console.log(link);
  if (link) return <LinkCard link={link} />;
  return null;
};
