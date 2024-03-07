import React, { useState } from 'react';
import axios from 'axios';

const CacheClient = () => {
 const [key, setKey] = useState('');
 const [value, setValue] = useState('');
 const [exp, setExp] = useState('');
 const [response, setResponse] = useState('');

 const handleSet = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/set?key=${key}&value=${value}&exp=${exp}`);
      setResponse('Value set successfully');
    } catch (error) {
      setResponse('Error setting value');
    }
 };

 const handleGet = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/get?key=${key}`);
      setResponse(`Value: ${response.data.value}`);
    } catch (error) {
      setResponse('Error getting value');
    }
 };

 return (
    <div>
      <h2>LRU Cache Client</h2>
      <input
        type="text"
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiration (seconds)"
        value={exp}
        onChange={(e) => setExp(e.target.value)}
      />
      <button onClick={handleSet}>Set</button>
      <button onClick={handleGet}>Get</button>
      <p>{response}</p>
    </div>
 );
};

export default CacheClient;
