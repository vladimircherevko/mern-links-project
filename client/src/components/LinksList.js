import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (links.length === 0) return <p className="center">Ссылок нет</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>Оригинальная</th>
          <th>Сокращенная</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, i) => (
          <tr key={link._id}>
            <td>{i + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Открыть</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
