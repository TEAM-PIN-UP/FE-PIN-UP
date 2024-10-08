import "./App.css";
import { Outlet, RouterProvider } from "react-router-dom";
import router from "./routes/route";
import GlobalStyle from "./style/GlobalStyle";
import NavBar from "./components/NavBar";

function App(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
