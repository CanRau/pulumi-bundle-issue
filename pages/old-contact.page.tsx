import React, { ReactElement } from "react";
import { log } from "src/log";
// import { Input } from "../components/Input/Input";
// import { Textarea } from "../components/Textarea/Textarea";
// import { Button } from "../components/Button/Button";

// const Input = (props): ReactElement => {}

export { Page };

const componentTree = [
  {
    component: "form",
    props: {
      key: "ContactForm",
      method: "post",
      action: "",
    },
    children: [
      {
        component: "div",
        props: {
          key: "ContactContainer",
          className: "container mx-auto items-center px-5 py-12 lg:px-20",
        },
        children: [
          {
            component: "div",
            props: {
              key: "FormContainer",
              className:
                "flex flex-col w-full mx-auto my-6 transition duration-500 ease-in-out transform lg:w-2/6 md:w-1/2 md:mt-0",
            },
            children: [
              {
                component: "h1",
                props: { key: "ContactTitle" },
                children: ["Contact Me"],
              },
              {
                component: "div",
                props: { key: "NameWrapper", className: "relative mt-8" },
                children: [
                  {
                    component: "label",
                    props: {
                      key: "NameLabel",
                      className: "leading-7 text-nord4",
                      htmlFor: "name",
                    },
                    children: ["Your name"],
                  },
                  {
                    component: "input",
                    props: {
                      type: "text",
                      name: "name",
                      id: "name",
                      key: "NameInput",
                      placeholder: "John Doe",
                      className:
                        "w-full px-4 py-2 mt-2 text-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2",
                    },
                  },
                ],
              },
              {
                component: "div",
                props: { key: "EmailWrapper", className: "relative mt-8" },
                children: [
                  {
                    component: "label",
                    props: {
                      key: "EmailLabel",
                      htmlFor: "email",
                    },
                    children: [
                      {
                        component: "span",
                        props: {
                          key: "EmailLabelSpan",
                          className: "leading-7 text-nord4",
                        },
                        children: ["Your e-mail"],
                      },
                      {
                        component: "input",
                        props: {
                          key: "EmailInput",
                          type: "text",
                          name: "email",
                          id: "email",
                          placeholder: "johndoe@mail.com",
                          className:
                            "w-full px-4 py-2 mt-2 text-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                component: "div",
                props: { key: "MessageWrapper", className: "relative mt-8" },
                children: [
                  {
                    component: "label",
                    props: {
                      key: "MessageLabel",
                    },
                    children: [
                      {
                        component: "span",
                        props: {
                          key: "MessageLabelSpan",
                          className: "leading-7 text-nord4",
                        },
                        children: ["Your message"],
                      },
                      {
                        component: "textarea",
                        props: {
                          type: "text",
                          key: "MessageInput",
                          name: "message",
                          id: "message",
                          placeholder: "johndoe@mail.com",
                          className:
                            "w-full px-4 py-2 mt-2 text-bg-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                component: "div",
                props: {
                  key: "SubmitButtonWrapper",
                  className: "inline-flex flex-wrap items-center justify-between mt-4",
                },
                children: [
                  {
                    component: "button",
                    props: {
                      key: "ContactSubmitButton",
                      type: "submit",
                      className:
                        "w-full px-4 py-2 my-2 font-medium text-white transition duration-500 ease-in-out transform bg-nord14 border-nord7 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800",
                    },
                    children: ["Submit"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const renderDynamicComponents = (tree: any): ReactElement[] =>
  tree.map((item: any, index: number) => {
    if (!item.component) return item;

    if (!item?.props?.key) {
      throw new Error(
        `Component is missing a unique 'key' for ${log(JSON.stringify({ index, item }))}`
      );
    }

    const Comp = item.component;
    const props = item.props ?? {};

    if (item.children?.length) {
      props.children = renderDynamicComponents(item.children);
    }

    return <Comp {...props} />;
  });

function Page(): React.ReactElement {
  return (
    <>
      {/* <Input placeholder="Your Name">Your Name</Input>

        <Input placeholder="Your E-Mail">Your E-Mail</Input>

        <Textarea placeholder="Your message">Message</Textarea>

        <Button type="submit">TEST</Button> */}
      <section className="bg-nord1 mx-auto pt-2 text-nord5">
        {renderDynamicComponents(componentTree)}

        <form action="" method="post">
          <div className="container mx-auto items-center px-5 py-12 lg:px-20">
            <div className="flex flex-col w-full mx-auto my-6 transition duration-500 ease-in-out transform lg:w-2/6 md:w-1/2 md:mt-0">
              <h1 className="text-nord4">Contact Me</h1>
              <div className="relative mt-8">
                <label htmlFor="name" className="leading-7 text-nord4">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  className="w-full px-4 py-2 mt-2 text-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                />
              </div>
              <div className="relative mt-4">
                <label htmlFor="email" className="leading-7 text-nord4">
                  Your E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="w-full px-4 py-2 mt-2 text-bg-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                />
              </div>
              <div className="relative mt-4">
                <label className="leading-7 text-nord4" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 mt-2 text-bg-nord3 transition duration-500 ease-in-out transform border-transparent rounded-lg bg-nord4 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand"
                  id="description"
                  name="description"
                  placeholder="Message..."
                  required
                />
              </div>
              <div className="inline-flex flex-wrap items-center justify-between mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 my-2 font-medium text-white transition duration-500 ease-in-out transform bg-nord14 border-nord7 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800"
                >
                  Button
                </button>
              </div>
              <p className="mx-auto mt-3 text-xs text-nord4"> Long caption text under input..</p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
