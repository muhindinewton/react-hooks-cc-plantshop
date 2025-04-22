import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isInStock, setIsInStock] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(plant.price);

  function handleStockClick() {
    setIsInStock(!isInStock);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    onUpdatePlant({
      ...plant,
      price: parseFloat(price),
    });
    setIsEditing(false);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {isEditing ? (
        <form onSubmit={handlePriceSubmit}>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
          Price: ${plant.price.toFixed(2)}
        </p>
      )}
      <button
        className={isInStock ? "primary" : ""}
        onClick={handleStockClick}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={() => onDeletePlant(plant.id)} className="remove">
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
