import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Database } from "./Database";
import { Home } from "./Home";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

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
    <Auth0Provider
      domain="chess-tournament.eu.auth0.com"
      clientId="BczAbxW6sT1py1coEmd3I3mxS6avHruV"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
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
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
