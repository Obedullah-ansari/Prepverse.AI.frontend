// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
  "414745886535-jdjfvlqsnbulip8ir5j5tld45lp4nu28.apps.googleusercontent.com";
import { AuthProvider } from "./context/Authcontext.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </>
);
