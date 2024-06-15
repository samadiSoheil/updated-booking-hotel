import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AppLayout from "./AppLayout/AppLayout.jsx";
import LocationList from "./components/LocationList/LocationList.jsx";
import Hotel from "./components/Hotel/Hotel.jsx";
import HotelsProvider from "./contexts/HotelsProvider.jsx";
import SingleHotle from "./components/SingleHotle/SingleHotle.jsx";
import BookMarkLayput from "./AppLayout/BookMarkLayput.jsx";
import BookMarksProvider from "./contexts/BookMarksProvider.jsx";
import BookmarkList from "./components/BookmarkList/BookmarkList.jsx";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark.jsx";
import AddBookmark from "./components/AddBookmark/AddBookmark.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LocationList />,
      },
      {
        path: "/hotels",
        element: (
          <HotelsProvider>
            <AppLayout />
          </HotelsProvider>
        ),
        children: [
          {
            index: true,
            element: <Hotel />,
          },
          {
            path: ":id",
            element: <SingleHotle />,
          },
        ],
      },
      {
        path: "/bookmarks",
        element: (
          <BookMarksProvider>
            <BookMarkLayput />
          </BookMarksProvider>
        ),
        children: [
          {
            index: true,
            element: <BookmarkList />,
          },
          {
            path: ":id",
            element: <SingleBookmark />,
          },
          {
            path: "add",
            element: <AddBookmark />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
