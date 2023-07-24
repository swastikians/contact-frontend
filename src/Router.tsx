import { useRoutes } from "raviger";
import Home from "./pages/Home";
import App from "./App";

const routes = {
  "/": () => <Home />,
};

export function Router() {
  const route = useRoutes(routes);

  return <App>{route}</App>;
}
