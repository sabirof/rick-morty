import React, { useEffect, useState } from 'react';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getCharacters = async () => {
      try {
        let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
        
        if (searchQuery) {
          url += `&name=${searchQuery}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.log(error);
      }
    };

    getCharacters();
  }, [currentPage, searchQuery]);

// Event handlers

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  // StatusColor determines color at the backgroundColor function

  const getStatusColor = (status) => {
    if (status === 'Alive') {
      return 'green';
    } else if (status === 'Dead') {
      return 'red';
    }
    return 'black';
  };

  //Search form, search bar, 
  return (
    <div>
      <h1>Characters</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
        className='search-bar'
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search characters..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="character-cards">
        {characters && characters.map((character) => (
          <div key={character.id} className="card">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
            <p>{character.species}</p>
            
            {/* Setting the box color based on charachter status */}
             
            <div
              className="status-box"
              style={{ backgroundColor: getStatusColor(character.status) }}
            >
              {character.status}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}

      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Characters;
