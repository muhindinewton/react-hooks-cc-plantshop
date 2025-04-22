import React, { useState, useCallback, memo } from "react";

const PlantCard = memo(({ plant, onUpdatePlant, onDeletePlant }) => {
  const [isInStock, setIsInStock] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(plant.price);

  const handleStockClick = useCallback(() => {
    setIsInStock((current) => !current);
    onUpdatePlant({
      ...plant,
      inStock: !isInStock,
    });
  }, [isInStock, onUpdatePlant, plant]);

  const handlePriceSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdatePlant({
      ...plant,
      price,
    });
    setIsEditing(false);
  }, [price, onUpdatePlant, plant]);

  const handlePriceChange = useCallback((e) => {
    setPrice(e.target.value);
  }, []);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback(() => {
    onDeletePlant(plant.id);
  }, [onDeletePlant, plant.id]);

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
            onChange={handlePriceChange}
            min="0"
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p 
          onClick={startEditing} 
          style={{ 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            gap: "5px" 
          }}
          title="Click to edit price"
        >
          Price: {plant.price}
          <span role="img" aria-label="edit" style={{ fontSize: "0.8em" }}>✏️</span>
        </p>
      )}
      <button
        className={isInStock ? "primary" : ""}
        onClick={handleStockClick}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={handleDelete} className="remove">
        Delete
      </button>
    </li>
  );
});

PlantCard.displayName = "PlantCard";

export default PlantCard;
