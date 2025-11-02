import { Router, Route, RootRoute } from "@tanstack/react-router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import SearchJobs from "./pages/SearchJobs";
import ProtectedRoute from "./components/protected/ProtectedRoute";

const rootRoute = new RootRoute({
  component: App,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  ),
});

const searchJobRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/searchjobs",
  component: SearchJobs,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
});

const postJobRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/postjob",
  component: () => (
    <ProtectedRoute>
      <PostJob />
    </ProtectedRoute>
  ),
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  profileRoute,
  postJobRoute,
  loginRoute,
  searchJobRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
