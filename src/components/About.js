import { Link } from 'react-router-dom';

function About() {
    return (
        <div>
            <div className="ui raised segment" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                <h1 className="ui header">About</h1>
                <p>This application was developed by <strong>Obie Munoz</strong>, <strong>Chris Valle</strong>, and <strong>Terence Stephens</strong> during the full-time Software Engineering course at the Flatiron School. The application was created to help users explore the Harvard Museum of Art and remotely view objects in their collection.</p>
                <p>The application was created with the following technologies:</p>
                <div className="ui horizontal list">
                    <div className="item">
                        <i class="js square icon" style={{ fontSize: "3em" }}></i>
                    </div>
                    <div className="item">
                        <i class="react icon" style={{ fontSize: "3em" }}></i>
                    </div>
                    <div className="item">
                        <i class="node js icon" style={{ fontSize: "3em" }}></i>
                    </div>
                    <div className="item">
                        <img src="https://uploads.sitepoint.com/wp-content/uploads/2016/04/1461122387heroku-logo.jpg" style={{ position: "relative", top: "18px", height: "45px", filter: "grayscale(100%)" }} />
                    </div>
                </div>
                <br />
                <Link to="/">
                    <button className="ui primary button">Go Back</button>
                </Link>
            </div>
        </div>
    )
}

export default About
