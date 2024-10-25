import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ChannelPage from "./pages/ChannelPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "channel/:id",
          element: <ChannelPage />,
        },
        {
          path: "video/:id",
          element: <VideoPlayerPage />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}
