import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AutContextProvider from "./context/authContext";



const App = () => {


  return (
    <AutContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>HomePAge</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<div >TasksPAge</div>} />
          <Route path="/add-task" element={<div>NewTaskPAge</div>} />
          <Route path="/tasks/:id" element={<div>TaskIdPAge</div>} />
          <Route path="/profile" element={<div>ProfilePAge</div>} />
        </Routes>
      </BrowserRouter>
    </AutContextProvider>
  );
};

export default App;
