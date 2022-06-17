/* eslint-disable */
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function NavLayout() {
  return (
    <div>
      <div>Nav layout</div>
      <Outlet />
    </div>
  );
}
