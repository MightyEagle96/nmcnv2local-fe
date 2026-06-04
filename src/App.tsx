import "bootstrap/dist/css/bootstrap.min.css";
import { AppUserProvider } from "./context/AppUserContext";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";
import "./App.css";
function App() {
  return (
    <AppUserProvider>
      <AppRouter />
      <ToastContainer />
    </AppUserProvider>
  );
}

export default App;
