import { Router, Route, RootRoute } from "@tanstack/react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import SearchJobs from "./pages/SearchJobs";
//router route rootroute are main tanstack router classes

//app, home, page1, page 2 is layout component

//parent route of whole site
//will render app
//will render <subpage />
const rootRoute = new RootRoute({
  component: App,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const searchJobRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/searchjobs",
  component: SearchJobs,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const postJobRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/postjob",
  component: PostJob,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

//create route tree, hierarchy of routes
const routeTree = rootRoute.addChildren([
  homeRoute,
  profileRoute,
  postJobRoute,
  loginRoute,
  searchJobRoute,
]);

export const router = new Router({ routeTree });

//informs type script of router in use
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
