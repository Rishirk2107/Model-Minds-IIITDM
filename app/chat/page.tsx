'use client'
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';

const Chat: React.FC = () => {
  const [data, setData] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  function appendChild(indata: string, cond: boolean) {
    if (indata) {
      const parent = document.getElementById('parent-div');
      if (parent) {
        if (!cond) {
          const child = document.createElement('div');
          child.textContent = indata;
          child.classList.add(styles.question);
          parent.appendChild(child);
        } else {
          const child = document.createElement('div');
          child.textContent = indata;
          child.classList.add(styles.response);
          parent.appendChild(child);
        }
      }
    }
  }

  const fetchData = async () => {
    try {
      appendChild(data, false);
      const response = await axios.post("/api/chat", { data });
      const result = await response;
      appendChild(result.data.message, true);
      setData(''); // Clear input after submission'
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div id="parent-div" className="flex flex-col gap-2"></div>
      <div className="flex gap-2">
        <input
          type="text"
          value={data}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your message"
          className="border border-gray-300 p-2 flex-grow"
        />
        <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chat;
