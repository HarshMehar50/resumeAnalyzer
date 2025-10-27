import {type RouteConfig, index, route} from "@react-router/dev/routes";
import * as path from "node:path";

export default [index("routes/home.tsx") , route("/auth" , "routes/auth.tsx") , route("/uploads" , "routes/uploads.tsx") , route("/resume/:id" , "routes/resume.tsx")] satisfies RouteConfig;
