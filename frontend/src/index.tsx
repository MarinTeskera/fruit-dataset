import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Database } from "./Database";
import { Home } from "./Home";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },
//   { path: "/database", element: <Database /> },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/database">
            <Database />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
