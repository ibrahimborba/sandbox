import React from 'react';
import Pet from './Pet';
import './App.css';

const App = () => {
  return React.createElement(
      "div",
      {},
      [
          React.createElement("h1", {}, "Adopt Me!"),
          React.createElement(Pet, {
              name: "Luna",
              animal: "Dog",
              breed: "Havanese",
          }),
          React.createElement(Pet, {
              name: "Pepper",
              animal: "Bird",
              breed: "Cockatiel",
          }),
          React.createElement(Pet, {
              name: "Mittens",
              animal: "Cat",
              breed: "Persian",
          }),
      ]
  )
}

export default App;