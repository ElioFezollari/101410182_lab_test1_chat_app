
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
function App() {
  const router = createBrowserRouter([
    {
      element:<Login/>,
      path:"/"
    },
    {
      element:<Register/>,
      path:"/register"
    },
    {
      element:<Chat/>,
      path:"/chat"
    }
  ]);

  return  (   
  <RouterProvider router={router} />
)
  ;
}

export default App;
