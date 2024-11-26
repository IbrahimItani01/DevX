import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignForm from "./components/SignForm";
import MainPanel from "./components/MainPanel";
import "./styles/layout.css";
import Register from "./components/Register";
import Login from "./components/Login";
import FilesProvider from "./context/FilesContext";
import UserProvider from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import InvitePage from "./components/InvitePage.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:fileId?/:privilege?"
            element={
              <SignForm>
                <Register />
              </SignForm>
            }
          />
          <Route
            path="/login/:fileId?/:privilege?"
            element={
              <SignForm>
                <Login />
              </SignForm>
            }
          />
          <Route
            path="/panel/*"
            element={
              <ProtectedRoute>
                <FilesProvider>
                  <UserProvider>
                    <MainPanel />
                  </UserProvider>
                </FilesProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/invite/:fileId/:privilege" element={<InvitePage />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        closeOnClick
        theme="dark"
      />
    </AuthProvider>
  );
}

export default App;
