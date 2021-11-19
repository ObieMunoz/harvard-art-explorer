import { Link } from "react-router-dom";
import hamExplorer from '../images/ham-explorer.png';
import DatabaseDisplay from './DatabaseDisplay';
import AboutButton from "./AboutButton";

function Header({ databaseConnected }) {
    return (
        <header>
            <DatabaseDisplay databaseConnected={databaseConnected} />
            <AboutButton />
            <img src={hamExplorer} alt="ham-explorer" style={{ maxWidth: "100%", height: "auto" }} />
        </header>
    )
}

export default Header
