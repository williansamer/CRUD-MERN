import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [nameFood, setNameFood] = useState("");
  const [cal, setCal] = useState(0);
  const [getFood, setGetFood] = useState([]);
  const [updateNameFood, setUpdateNameFood] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((res) => {
      setGetFood(res.data);
    });
  }, [getFood]);

  const handleClick = () => {
    Axios.post("http://localhost:3001/insert", {
      name: nameFood,
      calories: cal,
    });

    setNameFood("");
    setCal(0);
  };

  const handleUpdate = (id) => {
    Axios.put("http://localhost:3001/update", {
      newName: updateNameFood,
      id: id,
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>Inserting Foods</h1>
      <label>Food's Name</label>
      <input
        onChange={(event) => setNameFood(event.target.value)}
        type="text"
        value={nameFood}
      />
      <label>Calories</label>
      <input
        onChange={(event) => setCal(event.target.value)}
        type="number"
        value={cal}
      />
      <button onClick={handleClick}>Save</button>
      <h1>Food List</h1>
      <ul>
        {getFood.map((food, key) => (
          <li key={key}>
            <strong>Food: </strong>
            {food.name} - <strong>Calories: </strong>
            {food.calories}
            <input
              onChange={(event) => setUpdateNameFood(event.target.value)}
              type="text"
              placeholder="update food's name"
            />
            <button className="update" onClick={() => handleUpdate(food._id)}>
              update
            </button>
            <button className="delete" onClick={() => handleDelete(food._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
