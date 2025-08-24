import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Form from "./components/form";
import RecipeGenerator from "./components/reciepeGenerate";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoginForm from "./components/login.jsx";


//  const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
  
//     children: [
//       {
//         path: "signup",
//         element: <Form />  // ✅ First page is Signup
//       },
//       {
//         path: "recipes",
//         element: <RecipeGenerator /> // After signup, navigate here
//       }
//     ]
//   }
// ]);



const router = createBrowserRouter([
  // Default: / par open ho → redirect to signup
  { path: "/", element: <Navigate to="/signup" /> },

  // Signup & Login pages without header/footer
  { path: "signup", element: <Form title="Sign Up" /> },
  { path: "login", element: <LoginForm title="Login" /> },

  // Pages with header/footer
  {
    path: "/",
    element: <App />,  // App me Header/Footer + <Outlet />
    children: [
      { path: "recipes", element: <RecipeGenerator /> },
      // Agar baad me aur pages add karne ho → yahan add karo
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
