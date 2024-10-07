import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route";
import GlobalStyle from "./style/GlobalStyle";

function App(): React.JSX.Element {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
