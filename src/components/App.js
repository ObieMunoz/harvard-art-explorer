import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from './API';
import { Route, Switch } from 'react-router-dom'
import CardContainer from './CardContainer';
import Filter from './Filter';
import TopReturn from './TopReturn';
import DetailDisplay from './DetailDisplay';
import Header from './Header';
import About from './About'
import DB_URL from './server'
import Favorites from './Favorites';
import Footer from './Footer';

function App() {
  const incrementVisible = 16;
  const [artInfo, setArtInfo] = useState([]);
  const [artRecords, setArtRecords] = useState([]);
  const [visible, setVisible] = useState(incrementVisible)
  const [itemList, setItemList] = useState([]);
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [databaseRecords, setDatabaseRecords] = useState([])
  const [currentSelection, setCurrentSelection] = useState(null);

  useEffect(() => {
    fetch(DB_URL)
      .then(res => res.json())
      .then(dbData => {
        setDatabaseRecords(dbData.map(item => item.id))
        setDatabaseConnected(true)
      })
      .catch(err => setDatabaseConnected(false))

    fetch(`${BASE_URL}/object?hasimage=1&size=100&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setArtInfo(information => data.info)
        const workingRecords =
          data.records.filter(
            record => record.primaryimageurl !== null && record.primaryimageurl !== undefined
          );
        setArtRecords(records => [...workingRecords]);
      });
  }, [])

  function handleCategoryChange(category, id, name, size = 100) {
    fetch(`${BASE_URL}/object?${category}=${category === 'century' ? name : id}&hasimage=1&size=${size}&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setArtRecords(data.records);
        setArtInfo(data.info)
        setItemList([])
      })
  }

  function handleNext() {
    setVisible(visible => visible + incrementVisible)
    if (visible >= parseInt(artInfo.totalrecords)) return true;
    if (visible >= artRecords.length) {
      fetch(artInfo.next)
        .then(response => response.json())
        .then(data => {
          const workingRecords =
            data.records.filter(
              record => record.primaryimageurl !== null && record.primaryimageurl !== undefined
            );
          const newData = [...artRecords, ...workingRecords]
          setArtRecords(() => newData)
          setArtInfo(() => data.info)
        })
    }
  }

  function handleFilterClick(category) {
    fetch(`${BASE_URL}/${category}?&size=1000&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const unsortedList = data.records;
        unsortedList.forEach(item => {
          console.log(item)
          item.parentCategory = category;
        })
        const sortedList = unsortedList.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setItemList(sortedList);
        setVisible(() => incrementVisible)
      });
  }

  function handleKeywordSearch(keyword) {
    fetch(`${BASE_URL}/object?keyword=${keyword}&hasimage=1&size=100&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const workingRecords =
          data.records.filter(
            record => record.primaryimageurl !== null
          );
        setArtRecords(workingRecords);
        setArtInfo(data.info)
        setVisible(() => incrementVisible)
      })
  }

  function resetItems() {
    fetch(`${BASE_URL}/object?hasimage=1&size=${incrementVisible}&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setItemList([])
        setArtRecords(() => data.records);
        setArtInfo(() => data.info)
        setVisible(incrementVisible)
      });
  }

  function handleAddFavorite(object) {
    fetch(DB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    })
      .then(response => response.json())
      .then(data => {
        setDatabaseRecords([data.id, ...databaseRecords])
      })
  }

  function handleRemoveFavorite(id) {
    fetch(`${DB_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDatabaseRecords(databaseRecords.filter(item => item !== id)))
    // console.log(data)
  }

  function handleDisplayFavorites() {
    Promise.all(databaseRecords.map(id => fetch(`${BASE_URL}/object/${id}?apikey=${API_KEY}`)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        const records = data.map(item => item)
        setArtRecords(records)
        setVisible(() => incrementVisible)
        setItemList([])
      })
  }

  function handleSetCurrentSelection(record) {
    setCurrentSelection(record)
  }


  const visibleRecords = artRecords.slice(0, visible)

  return (
    <div style={{ textAlign: "center" }}>
      <Header databaseConnected={databaseConnected} />

      <br />
      <Switch>
        <Route path="/detail">
          <DetailDisplay record={currentSelection} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/favorites">
          <Favorites databaseRecords={databaseRecords} setArtRecords={setArtRecords} handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite} handleSetCurrentSelection={handleSetCurrentSelection} />
        </Route>
        <Route path="/">
          <Filter
            handleCategoryChange={handleCategoryChange}
            handleFilterClick={handleFilterClick}
            resetItems={resetItems}
            itemList={itemList}
            setItemList={setItemList}
            handleKeywordSearch={handleKeywordSearch}
            handleDisplayFavorites={handleDisplayFavorites}
            databaseConnected={databaseConnected}
          />
          <CardContainer
            artInfo={artInfo}
            artRecords={visibleRecords}
            handleNext={handleNext}
            databaseConnected={databaseConnected}
            databaseRecords={databaseRecords}
            handleAddFavorite={handleAddFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
            handleSetCurrentSelection={handleSetCurrentSelection}
          />
          <TopReturn />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
