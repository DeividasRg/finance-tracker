"use client";

import SessionToast from "./SessionToast";

function Main({ children }) {
  return (
    <>
      <SessionToast />
      <div className="mx-8 my-10">{children}</div>
    </>
  );
}

export default Main;
