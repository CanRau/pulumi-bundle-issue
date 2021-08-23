import fs from "fs";
import { resolve } from "path";
import { log } from "src/log";

const { readFile } = fs.promises;

type PageContext = {
  routeParams: {
    locale: string;
    slug: string;
  };
  contextProps: {
    url: string;
    slug: string;
    locale: string;
    slugParts: string[];
  };
  pageProps: {
    file?: any;
    slug?: string;
    url?: string;
    slugParts?: string[];
    error?: string;
  };
  documentProps: {
    title: string;
  };
};

/**
 * todo: Create probably rollup-plugin-leasot or sthg to showcase roadmap, maybe include a way to combine with <Poll/> https://github.com/pgilad/leasot
 * todo: Accessibility testing with Storybook   https://storybook.js.org/blog/accessibility-testing-with-storybook/?ref=sidebar
 * todo: Poll Component to let people vote for features/organization like subdomains or folders for categories
 * todo: <Flex/> component etc, so that content JSON doesn't need "className"
 */

export async function addPageContext({
  // routeParams: {  },
  contextProps: { locale, slug, slugParts },
}: PageContext): Promise<Partial<PageContext>> {
  const fileName = !slug ? "index" : slugParts.join("-");
  const filePath = resolve("..", "..", "canrau.com_CONTENT", locale, `${fileName}.json`);

  let rawFile;
  try {
    rawFile = await readFile(filePath, { encoding: "utf-8" });
  } catch {
    log(`Couldn't find ${filePath}`);
    return {
      pageProps: { error: "NOT_FOUND" },
    };
  }

  let file;
  try {
    file = JSON.parse(rawFile);
  } catch {
    log(`.server Couldn't parse ${filePath}`);
    return {
      pageProps: { error: `Sorry I've got a problem displaying this site` },
    };
  }

  const pageProps = {
    // slug, slugParts, url,
    path: file.publications["canrau.com"].path,
    file: rawFile,
  };
  const documentProps = { title: file.title };
  return { pageProps, documentProps };
}
