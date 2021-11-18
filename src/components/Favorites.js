import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import ObjectCard from './ObjectCard';
import { nanoid } from 'nanoid'
import { BASE_URL, API_KEY } from './API'

function Favorites({ databaseRecords, handleAddFavorite, handleRemoveFavorite, handleSetCurrentSelection, databaseConnected = true }) {
    const [favorites, setFavorites] = useState(null);

    useEffect(() => {
        Promise.all(databaseRecords.map(id => fetch(`${BASE_URL}/object/${id}?apikey=${API_KEY}`)))
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(data => {
                const artElements = data.map(item => {
                    return <ObjectCard
                        key={nanoid()}
                        record={item}
                        handleAddFavorite={handleAddFavorite}
                        handleRemoveFavorite={handleRemoveFavorite}
                        handleSetCurrentSelection={handleSetCurrentSelection}
                        databaseConnected={databaseConnected}
                        databaseRecords={databaseRecords}
                    />
                })
                setFavorites(artElements);
            })
    }, [databaseRecords])

    return (
        <div>
            <br />
            <Link to="/">
                <button className="ui primary button">Go Back</button>
            </Link>
            <h2
                className="ui header">
                <em>Showing {favorites?.length} Works</em>
            </h2>
            <div className="ui four cards">
                {favorites}
            </div>
        </div>
    )
}

export default Favorites