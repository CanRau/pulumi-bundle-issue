import React from "react";

export { Page };

function Page({ is404 }: { is404: boolean }): React.ReactElement {
  if (is404) {
    return (
      <>
        <h1>404 Page Not Found</h1>
        This page could not be found.
      </>
    );
  }
  return (
    <>
      <h1>500 Internal Server Error</h1>
      Something went wrong.
    </>
  );
}
