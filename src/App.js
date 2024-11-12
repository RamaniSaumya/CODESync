import "./App.css";
import Home from "./pages/Home";
import Editorpage from "./pages/Editorpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
              fontSize: "large",
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<Editorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
