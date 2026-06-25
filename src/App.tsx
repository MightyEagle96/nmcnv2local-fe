import "bootstrap/dist/css/bootstrap.min.css";
import { AppUserProvider } from "./context/AppUserContext";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import { ActiveProgrammeProvider } from "./context/ActiveProgrammeContext";
function App() {
  return (
    <AppUserProvider>
      <ActiveProgrammeProvider>
        <AppRouter />
        <ToastContainer />
      </ActiveProgrammeProvider>
    </AppUserProvider>
  );
}

export default App;
