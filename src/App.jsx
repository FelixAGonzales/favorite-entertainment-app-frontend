import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { Footer } from "./Footer";
import axios from "axios";
import { AnimesIndexPage } from "./AnimesIndexPage";
import { FavoriteIndexPage } from "./FavoriteIndexPage";
import { AnimessNewPage } from "./AnimeNewPage";
import { ProfilePage } from "./ProfilePage";
import { TopAnimePage } from "./TopAnimePage";
import { FullAnimePageShow } from "./FullAnimePageShow";

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
        path: "/new",
        element: <AnimessNewPage />,
      },
      {
        path: "/",
        element: <AnimesIndexPage />,
        loader: () => axios.get("http://localhost:3000/items.json").then((response) => response.data),
      },
      {
        path: "/favorites",
        element: <FavoriteIndexPage />,
        loader: () => axios.get("http://localhost:3000/favorites.json").then((response) => response.data),
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: () => axios.get("http://localhost:3000/favorites.json").then((response) => response.data),
      },
      {
        path: "/topanime",
        element: <TopAnimePage />,
      },
      {
        path: "/anime/:id",
        element: <FullAnimePageShow />,
        loader: ({ params }) =>
          axios.get(`https://thingproxy.freeboard.io/fetch/https://api.jikan.moe/v4/anime/${params.id}`)
               .then(response => response.data.data)
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;