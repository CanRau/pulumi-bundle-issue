import React from "react";

export { Page };

function Page(): React.ReactElement {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>Interactive.</li>
      </ul>
    </>
  );
}