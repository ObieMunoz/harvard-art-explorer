import { Link } from "react-router-dom";

function DetailDisplay({ record }) {
    if (!record) return null;
    const { primaryimageurl, title, description, classification, dated = "Unknown", objectnumber } = record;

    return (
        <>
            <div className="ui centered card" id="detailDisplay" onLoad={window.scrollTo(0, document.body.scrollHeight)}>
                <div className="image">
                    <img src={primaryimageurl} alt={title + " image"} />
                </div>
                <div className="content">
                    <h3 className="header">{title}</h3>
                    <div className="description">{description}</div>
                    <div className="classification"><strong>Classification:</strong> {classification}</div>
                    <div className="date"><strong>Date:</strong> {dated}</div>
                    <div className="objectnumber"><strong>Object Number:</strong> {objectnumber}</div>
                </div>
                <Link to="/">
                    <button className="ui primary button">Go Back</button>
                </Link>
            </div>
        </>
    )
}

export default DetailDisplay