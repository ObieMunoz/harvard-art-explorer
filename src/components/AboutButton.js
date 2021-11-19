import { Link, useLocation } from 'react-router-dom';
function AboutButton() {
    const location = useLocation();
    const sendTo = location.pathname === '/about' ? '/' : '/about';
    const text = location.pathname === '/about' ? 'Return to Main' : 'About this Project';
    const icon = location.pathname === '/about' ? 'home icon' : 'question circle outline icon';

    return (
        <Link to={sendTo}>
            <div
                className="ui label"
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0'
                }}
            >
                <i className={icon}></i>
                {text}
            </div>
        </Link>
    )
}

export default AboutButton
