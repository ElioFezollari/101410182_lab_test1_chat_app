
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  const router = createBrowserRouter([
    {
      element:<Login/>,
      path:"/"
    },
    {
      element:<Register/>,
      path:"/register"
    }
  ]);

  return  (   
  <RouterProvider router={router} />
)
  ;
}

export default App;
