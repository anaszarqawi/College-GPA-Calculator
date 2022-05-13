import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

// Components
import NavUpper from "./components/NavUpper"
import NavLower from "./components/NavLower"
import Container from './components/Container';
// import Semester from './components/Semester'
import Footer from './components/Footer';

// SCSS Files
import './assets/scss/vars.scss';
import './assets/scss/const.scss';
import './assets/scss/navs.scss';
import './assets/scss/semester.scss';
import './assets/scss/options.scss';
import './assets/scss/gpaContainer.scss';
import './assets/scss/footer.scss';
import './assets/scss/520px.scss';
import './assets/scss/450px.scss';
import './assets/scss/366px.scss';
import './assets/scss/autocomplete.scss';

// Lib Files
import './assets/js/lib/shake.js'
import './assets/js/lib/jQuery-ui.js'

// JS Files
import './assets/js/script.js'
// import './assets/js/autocomplete'


// import './assets/js/lib/jquery-ui/jquery-ui.min.js'
// import './assets/js/lib/jquery-ui/jquery-ui.min.css'



const MainContent = () => {
    return (
        <div>
            <NavUpper />
            <NavLower />
            <Container />
            <Footer/>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MainContent />, );