import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Launches from './Pages/Launches';
import LaunchDetails from './Pages/LaunchDetails'
import Rockets  from './Pages/Rockets';
import About from './Pages/About'
import Navigation from './components/Navigation';
import Footer from './components/Footer/Footer'

const RoutesConfig = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/launches" element={<Launches />} />
                <Route path="/launches/:id" element={<LaunchDetails/>} />
                <Route path="/rockets" element={<Rockets />} />
                <Route path="/about" element={<About />} />
                {/* <Route exact path="/product" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" component={() => <h2>404 Not Found</h2>} /> */}
            </Routes>
            <Footer />
        </Router>
    )
}
export default RoutesConfig;
