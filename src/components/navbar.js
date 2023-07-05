import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    // const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState((window.innerWidth <= 700));
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleResizing = () => {
            setIsSmallScreen((window.innerWidth <= 700));
        }
        window.addEventListener('resize', handleResizing);
        return () => {
            window.removeEventListener('resize', handleResizing);
        }
    }, []);

    return (
        <>
            {isSmallScreen && <div className={(showNavbar) ? "hamburger-menu close" : "hamburger-menu"} id="menu" onClick={() => setShowNavbar(!showNavbar)}>
                    <span></span>
                    <span></span>
                </div>}
            <nav className={(showNavbar && isSmallScreen) ? "navbar show" : "navbar"} id="navbar">
                <ul>
                    <li>
                        <Link to="/" onClick={() => setShowNavbar(!showNavbar)}>HOME</Link>
                    </li>
                    <li>
                        <Link to="/forms" onClick={() => setShowNavbar(!showNavbar)}>FORMS</Link>
                    </li>
                    <li>
                        <Link to="/data" onClick={() => setShowNavbar(!showNavbar)}>DATA</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={() => setShowNavbar(!showNavbar)}>CONTACT</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};