// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import BuilderPage from "./pages/BuilderPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "create-contract", element: <BuilderPage /> },
      { path: "login", element: <LoginPage /> },
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
