import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from "./pages/MainPage.jsx";
import { AddObjectPage } from "./pages/AddObjectPage.jsx";


function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add" element={<AddObjectPage />} />
      </Routes>
        
    </>
  )
}

export default App
