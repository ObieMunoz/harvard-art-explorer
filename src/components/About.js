import { useHistory } from 'react-router-dom';

function About() {
    const history = useHistory();

    return (
        <div>
            <div className="ui raised segment" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                <h1 className="ui header">About</h1>
                <p>This application was developed by Obie Munoz, Terence Stephens, and Chris Valle during the full-time Software Engineering course at the Flatiron School. The application was created to help users explore the Harvard Museum of Art and remotely view objects in their collection.</p>
                <p>The application was created with the following technologies:</p>
                <div className="ui horizontal list">
                    <div className="item">
                        <i className="node js icon" style={{ fontSize: "3em" }}></i>
                    </div>
                    <div className="item">
                        <i className="react icon" style={{ fontSize: "3em" }}></i>
                    </div>
                    <div className="item">
                        <img src="https://uploads.sitepoint.com/wp-content/uploads/2016/04/1461122387heroku-logo.jpg" style={{ position: "relative", top: "18px", height: "45px", filter: "grayscale(100%)" }} alt="Heroku logo" />
                    </div>
                </div>
                <br />
                <a href="https://github.com/ObieMunoz/harvard-art-explorer/issues/new" target="_blank" rel="noopener noreferrer" className="ui red button">
                    <i className="github icon"></i>
                    Report a Problem
                </a>
                <br /><br />
                <a href="https://github.com/ObieMunoz/harvard-art-explorer/" target="_blank" rel="noopener noreferrer" className="ui primary button">
                    <i className="github icon"></i>
                    This Project on Github</a>
                <br /><br />
                <button className="ui primary button" onClick={() => history.goBack()}>Go Back</button>
            </div>
        </div>
    )
}

export default About
