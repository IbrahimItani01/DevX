import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignForm from './components/SignForm';
import MainPanel from "./components/MainPanel";
import "./styles/layout.css"
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm>
            <Register/>
        </SignForm>}/>
            <Route path="/login" element={<SignForm>
            <Login/>
        </SignForm>} />
        
        <Route path="/panel" element={<MainPanel/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;