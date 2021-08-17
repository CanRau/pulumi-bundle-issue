// import { pathToRegexp, match, parse, compile } from "path-to-regexp";
export default () => true;
// export default "/:locale/:slug?*";

// Route Functions give us full flexibility
// This is a route similar to `/hello/:name` but with details impossible to achieve with a route string.
// export default (pageContext: { url: string }) => {
//   const { url } = pageContext;
//   // if (!url.startsWith("/hello")) {
//   //   return { match: false };
//   // }
//   return { match: true };
//   // return { match: true, routeParams: { url, locale, slug } };
// };
// export default ({ url }: { url: string }) => {
//   return { match: true, routeParams: { url } };
// };
// export default ({ url }: { url: string }) => {
//   const keys: string[] = [];
//   const regexp = pathToRegexp("/:locale/:slug*", keys);
//   const parts = regexp.exec(url);
//   const routeParams = {
//     locale: parts?.[1],
//     slug: parts?.[2],
//   };
//   console.log("pathToRegexp", { keys, parts, routeParams });
//   return { match: -3, routeParams };
// };
