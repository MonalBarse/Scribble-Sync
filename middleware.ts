import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
// THis is a middleware file that uses the authMiddleware function from the Clerk SDK to protect routes. It also exports a config object that specifies the routes that the middleware should apply to.