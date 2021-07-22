import React from "react";

export { Page };

function Page(): React.ReactElement {
  return (
    <div className="flex flex-col items-center w-full px-4 py-10 bg-cover bg-base-200">
      <div className="flex flex-col relative overflow-hidden lg:(items-stretch flex-row) text-nord0">
        <figure className="p-6 h-full max-w-none w-auto">
          <img
            src="https://picsum.photos/id/1005/300/200"
            alt="placeholder"
            className="rounded-lg shadow-lg max-w-none w-auto"
          />
        </figure>
        <div className="max-w-md flex flex-1 flex-col flex-auto p-8">
          <h2 className="text-xl font-semibold">Glass</h2>
          <p>
            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
            sit necessitatibus veritatis sed molestiae voluptates incidunt iure
            sapiente.
          </p>
          <div className="flex items-start flex-wrap -mx-1">
            <button type="button" className="rounded-full m-1">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
