import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Home from "./Routes/Home";
import Coming from "./Routes/Coming";
import Now from "./Routes/Now";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "coming-soon",
        element: <Coming />,
      },
      {
        path: "now-playing",
        element: <Now />,
      },
      {
        path: "movies/:movieId",
        element: <Home />,
      },
      {
        path: "now-playing/:movieId",
        element: <Now />,
      },
      {
        path: "coming-soon/:movieId",
        element: <Coming />,
      },
    ],
  },
]);
