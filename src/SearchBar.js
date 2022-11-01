import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.zone_name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">

        <Stack direction="horizontal" gap={3}>
        <Form.Control type="text" className="me-auto" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
          {filteredData.length === 0 ? (
            <i className="bi bi-search"></i>
          ) : (
            <i className="bi bi-x-circle" onClick={clearInput}></i>
          )}
        </Stack>

      {filteredData.length != 0 && (

        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a key = {value.id} className="dataItem" target="_blank">
                <p>{value.zone_name} </p>
              </a>
            );
          })}
        </div>
      )}
      
    </div>
  );
}

export default SearchBar;