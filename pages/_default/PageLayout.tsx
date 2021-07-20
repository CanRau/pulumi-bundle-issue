import React from "react";
import "virtual:windi.css";

type Children = React.ReactNode;
type Props = React.PropsWithChildren<{ className?: string }>;

function Layout({ children }: { children: Children }): React.ReactElement {
  return <div className="container mx-auto mt-4">{children}</div>;
}

function Content({ children, ...props }: Props): React.ReactElement {
  return (
    <div className="mt-16" {...props}>
      {children}
    </div>
  );
}

function Logo(props: Props): React.ReactElement {
  return (
    <div {...props}>
      <a href="/">Can Rau</a>
    </div>
  );
}

function Navbar({ children, ...props }: Props): React.ReactElement {
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none px-2 mx-2">
        <Logo />
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          <a href="/blog" className="btn btn-ghost btn-sm rounded-btn">
            Blog
          </a>
          <a href="/about" className="btn btn-ghost btn-sm rounded-btn">
            About
          </a>
          <a href="/contact" className="btn btn-ghost btn-sm rounded-btn">
            Contact
          </a>
        </div>
      </div>
      <div className="flex-none">
        <button type="button" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex-none">
        <button type="button" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export const PageLayout = ({
  children,
  ...props
}: Props): React.ReactElement => (
  <React.StrictMode>
    <Layout {...props}>
      {/* <Header className="flex">
          <Menu className="ml-8">
            <a className="navitem bg-blue-400 dark:bg-blue-100" href="/">
              Home
            </a>
            <a className="navitem" href="/about">
              About
            </a>
          </Menu>
        </Header> */}
      <Navbar />
      <Content>{children}</Content>
    </Layout>
  </React.StrictMode>
);
