import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/plants")
      .then((r) => r.json())
      .then((plants) => setPlants(plants));
  }, []);

  function handleAddPlant(newPlant) {
    fetch("http://localhost:3001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((plant) => setPlants([...plants, plant]));
  }

  function handleUpdatePlant(updatedPlant) {
    fetch(`http://localhost:3001/plants/${updatedPlant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlant),
    })
      .then((r) => r.json())
      .then((plant) => {
        setPlants(plants.map((p) => (p.id === plant.id ? plant : p)));
      });
  }

  function handleDeletePlant(id) {
    fetch(`http://localhost:3001/plants/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        setPlants(plants.filter((p) => p.id !== id));
      });
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList 
        plants={displayedPlants} 
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
