import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Header } from "./Header";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
// import { AnimesPage } from "./AnimesPage";
import { Footer } from "./Footer";
import axios from "axios";
import { AnimesIndexPage } from "./AnimesIndexPage";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <AnimesIndexPage />,
        loader: () => axios.get("http://localhost:3000/items.json").then((response) => response.data),
      },
      // {
      //   path: "/",
      //   element: <AnimesPage />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;