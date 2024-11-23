import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignForm from './components/SignForm';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignForm />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;