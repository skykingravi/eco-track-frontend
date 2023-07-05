// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar.js';
import { Home } from './pages/home.js';
import { Forms } from './pages/forms.js';
import { Data } from './pages/data.js';
import { Contact } from './pages/contact.js';

function App() {

  return (
    <>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/data" element={<Data />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;