import React from "react";
// import { useSelect } from "downshift";
import Obfuscate from "react-obfuscate"; // found via https://mailtrap.io/blog/email-obfuscation/
import "virtual:windi.css";

// type Children = React.ReactNode;
type Props = React.PropsWithChildren<{ className?: string }>;

// function Layout({ children }: { children: Children }): React.ReactElement {
//   return (
//     <div className="bg-nord1">
//       {/* <div className="container mx-auto pt-2"> */}
//       {children}
//       {/* </div> */}
//     </div>
//   );
// }

// function Content({ children, ...props }: Props): React.ReactElement {
//   return (
//     <div className="" {...props}>
//       {children}
//     </div>
//   );
// }

// function Logo(props: Props): React.ReactElement {
//   return (
//     <div {...props}>
//       <a href="/">Can Rau</a>
//     </div>
//   );
// }

// type Theme = {
//   label: string;
//   value: string;
// };
// type Themes = Record<string, Theme>;

// const themes: Themes = {
//   light: { label: "🌝 light", value: "light" },
//   dark: { label: "🌚 dark", value: "dark" },
// };

// const ThemeDropdown = ({ className }: Props) => {
//   const {
//     isOpen,
//     selectedItem,
//     getToggleButtonProps,
//     getLabelProps,
//     getMenuProps,
//     highlightedIndex,
//     getItemProps,
//   } = useSelect({ items: Object.values(themes), id: "ThemeDropdown" });
//   return (
//     <div className={className}>
//       <button type="button" className="" {...getToggleButtonProps()}>
//         <span className="hidden md:inline px-3 text-nord4">Change Theme</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1792 1792"
//           className="inline-block w-4 h-4 ml-1 fill-current text-nord4"
//         >
//           <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
//         </svg>
//       </button>
//       <ul className="" {...getMenuProps()}>
//         {isOpen &&
//           Object.keys(themes).map((key, index) => {
//             const theme = themes[key];
//             return (
//               <li key={theme.value} {...getItemProps({ item: theme, index })}>
//                 <button type="button" className="active">
//                   {theme.label}
//                 </button>
//               </li>
//             );
//           })}
//       </ul>
//     </div>
//   );
// };

function Navbar({ children, ...props }: Props): React.ReactElement {
  return (
    <div className="flex items-center p-2 min-h-4 bg-nord0" {...props}>
      <div className="flex-1 px-2 lg:flex-none mr-20">
        {/* <a href="/" className="text-lg font-bold"> */}
        <a href="/en" className="px-2 flex-0 md:px-4 text-nord15 hover:bg-nord4">
          CanRau.com
        </a>
      </div>
      {/* <div className="flex-1 px-2 lg:flex-none mr-8">
        <a href="/" className="text-lg font-bold text-nord4">
          CanRau.com
        </a>
      </div> */}
      {/* <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <a href="/contact" className="px-3 text-nord4">
            Contact
          </a>
          <ThemeDropdown />
        </div>
      </div> */}
    </div>
  );
}

// const footerLinks = [
//   {}
// ]

function Footer({ children, ...props }: Props): React.ReactElement {
  return (
    <div
      className="grid w-full bg-cover bg-center place-items-center bg-nord0 text-nord4"
      {...props}
    >
      <div className="row-start-1 col-start-1 items-center flex z-0 justify-center w-full max-w-6xl py-20 text-center">
        <div>
          <div className="inline-block mb-10 text-3xl font-title text-neutral-content">
            <span className="text-nord15">CanRau</span>.com
          </div>
          <div className="mb-10 text-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.gaiama.org/en?ref=canrau.com"
              className="my-1 btn btn-ghost btn-xs"
            >
              🌴 Check out my Rainforest Non-Profit GaiAma 🐒
            </a>
          </div>
          <div>
            <a
              href="https://twitter.com/CanRau"
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center justify-center hover:opacity-90"
            >
              <div className="mr-3 avatar">
                <div className="p-px w-14 h-14 mask mask-squircle bg-neutral-focus">
                  <img
                    src="https://github.com/canrau.png"
                    alt="Can Rau"
                    className="mask mask-squircle"
                  />
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs text-opacity-50 text-neutral-content">
                  Designed and developed by
                </p>{" "}
                <h2 className="text-lg font-bold text-neutral-content">Can Rau</h2>
              </div>
            </a>
          </div>
          <div className="mt-6 text-xs">
            © Copyright Can Rau | <Obfuscate email="cansrau@gmail.com" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const PageLayout = ({ children }: Props): React.ReactElement => (
  <React.StrictMode>
    <Navbar />
    {/* <Layout {...props}>
      <Content> */}
    {children}
    {/* </Content>
    </Layout> */}
    <Footer />
  </React.StrictMode>
);
