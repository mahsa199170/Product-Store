import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import NavBar from './components/navbar/NavBar';
import CreatePage from './pages/createPage';
import './App.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </main>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
    // </div>
  );
}

export default App;
