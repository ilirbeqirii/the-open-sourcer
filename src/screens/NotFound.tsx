/** @jsxImportSource @emotion/react */

import { NavLink } from "react-router-dom";

function NotFoundScreen() {
  return (
    <div
      css={{
        height: "100%",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        Sorry... nothing here. <NavLink to="/">Go home</NavLink>
      </div>
    </div>
  );
}

export default NotFoundScreen;
