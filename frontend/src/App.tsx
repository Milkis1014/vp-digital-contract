import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import BuilderPage from "./pages/BuilderPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./context/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <LoginPage /> },

      // PROTECTED ROUTES: Only admins can enter this gate
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "create-contract", element: <BuilderPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
