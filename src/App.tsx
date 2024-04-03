
import "react-toastify/dist/ReactToastify.css";
import { ConexionesContextProvider } from "./context/conexionesprovider";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";




function App() {
  return (
    <ConexionesContextProvider>
      <AppRoutes />
      <ToastContainer />
    </ConexionesContextProvider>
  );
}

export default App;
