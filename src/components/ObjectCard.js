import React from 'react'
import { Link } from 'react-router-dom';

function ObjectCard({ record, databaseConnected, databaseRecords, handleAddFavorite, handleRemoveFavorite, handleSetCurrentSelection }) {
    if (record.primaryimageurl === undefined || record.primaryimageurl === null) return null;

    function FavoriteButton() {
        if (databaseConnected) {
            if (databaseRecords.includes(record.id)) {
                return (
                    <div className="ui primary button" onClick={() => handleRemoveFavorite(record.id)}>
                        <i className="remove icon"></i>
                        Remove from Favorites
                    </div>)
            } else {
                return (
                    <div className="ui primary button" onClick={() => handleAddFavorite(record)}>
                        <i className="add icon"></i>
                        Add Favorite
                    </div>
                )
            }
        }
        return null;
    }

    return (
        // make this card Link to the detail page
        <div className="ui card">
            <div className="image">
                <img src={record.primaryimageurl} alt={record.title} />
            </div>
            <div className="content">
                <div className="header">{record.title}</div>
                <div className="meta">
                    <span className="date">{record.objectdate}</span>
                </div>
                {/* <div className="description">
                    {record.description}
                </div> */}
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <Link to={`/detail`} className="ui green button" onClick={() => handleSetCurrentSelection(record)}>
                        <i className="info icon"></i>
                        More Info
                    </Link>
                    <FavoriteButton />
                </div>
            </div>
        </div >
    )
}

export default ObjectCard