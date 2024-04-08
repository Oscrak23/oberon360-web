
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./layouts/mainLayout";



function App() {
  return (
    <MainLayout>
      <AppRoutes />
      <ToastContainer />
    </MainLayout>

  );
}

export default App;
