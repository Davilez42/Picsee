import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormsView from "../components/forms/FormsView";
import Signup from "../components/forms/Signup";
import Sign from "../components/forms/Sign";
import Home from "../pages/Home";
import "./app.css";
import MainView from "../components/mainview/MainView";
import UploadPhotosView from "../components/photos/UploadPhotosView";
import ProtectedRoute from "../utils/protectedRoute";
import { UserContextProvider } from "../context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <MainView />,
        children: [
          {
            path: "/tg/:tag",
            element: <MainView />,
          },
          {
            path: "/query/:query",
            element: <MainView />,
          },
        ],
      },
      {
        path: "/forms",
        element: <FormsView />,
        children: [
          { path: "sign/:redirect", element: <Sign /> },
          { path: "sign/", element: <Sign /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
