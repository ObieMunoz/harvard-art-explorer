import { Link } from "react-router-dom";
import hamExplorer from '../images/ham-explorer.png';
import DatabaseDisplay from './DatabaseDisplay';

function Header({ databaseConnected }) {
    return (
        <header>
            <DatabaseDisplay databaseConnected={databaseConnected} />
            <Link to="/about">
                <img src={hamExplorer} alt="ham-explorer" style={{ maxWidth: "100%", height: "auto" }} />
            </Link>
        </header>
    )
}

export default Header
