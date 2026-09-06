import { RouterProvider } from "react-router";
import { AuthProvider } from "./hooks/AuthProvider";
import router from "./routes/router";
import { Toaster } from "sileo";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
