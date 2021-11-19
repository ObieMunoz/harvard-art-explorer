import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import { BASE_URL, API_KEY } from './API'
import ObjectCard from './ObjectCard';

function Favorites({ databaseRecords, handleAddFavorite, handleRemoveFavorite, handleSetCurrentSelection, databaseConnected = true }) {
    const [favorites, setFavorites] = useState(null);
    const history = useHistory();

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
                setFavorites(() => artElements);
            })
    }, [databaseRecords, handleAddFavorite, handleRemoveFavorite, handleSetCurrentSelection, databaseConnected])

    return (
        <div>
            <br />
            <button className="ui primary button" onClick={() => history.goBack()}>Go Back</button>
            <h2
                className="ui header">
                {favorites === null
                    ? null
                    : favorites.length === 1
                        ? <em>Showing {favorites?.length} Work</em>
                        : favorites.length > 0
                            ? <em>Showing {favorites?.length} Works</em>
                            : <em>No Favorites Saved. Please add more and come back!</em>}
            </h2>
            <div className="ui four cards">
                {favorites}
            </div>
        </div>
    )
}

export default Favorites