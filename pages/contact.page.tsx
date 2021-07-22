import React from "react";

export { Page };

function Page(): React.ReactElement {
  return (
    <>
      <form action="" method="post">
        <div className="flex flex-col">
          <label className="flex items-center justify-between select-none py-2 px-1">
            <span className="label-text">Your Name</span>
            <input
              type="text"
              placeholder="Your Name"
              className="flex-shrink px-4 h-12 text-sm leading-8"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="flex items-center justify-between select-none py-2 px-1">
            <span className="label-text">Your E-Mail</span>
            <input
              type="text"
              placeholder="Your E-Mail"
              className="flex-shrink px-4 h-12 text-sm leading-8"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label className="flex items-center justify-between select-none py-2 px-1">
            <span className="label-text">Your Message</span>
            <textarea
              className="h-24 flex-shrink py-2 px-4 min-h-4 text-sm leading-8"
              placeholder="Message"
            />
          </label>
        </div>

        <button type="submit" className="btn glass">
          Submit
        </button>
      </form>
    </>
  );
}
