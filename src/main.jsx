import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Favicon from "react-favicon";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import PropertyDetails from "./pages/details/PropertyDetails.jsx";

import { persistor, store } from "./Redux/store.js";
import Home from "./pages/home/Home.jsx";
import Search from "./pages/search/Search.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/s/:location/homes",
        element: <Search />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Favicon url="/favicon.jpeg" />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
