import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import SchoolForm from "./Pages/School-form";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SchoolForm/>
  },
 
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
