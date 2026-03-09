import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./Context/ThemeContext.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
