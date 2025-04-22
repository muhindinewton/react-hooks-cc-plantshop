import React, { useState, useEffect, useCallback } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { api } from "../services/api";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Fetch plants on component mount
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const fetchedPlants = await api.getPlants();
        setPlants(fetchedPlants);
      } catch (err) {
        setError("Failed to load plants. Please try again.");
      }
    };
    fetchPlants();
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleAddPlant = useCallback(async (newPlant) => {
    try {
      const addedPlant = await api.createPlant(newPlant);
      setPlants((currentPlants) => [...currentPlants, addedPlant]);
    } catch (err) {
      setError("Failed to add plant. Please try again.");
    }
  }, []);

  const handleUpdatePlant = useCallback(async (updatedPlant) => {
    try {
      const { id, ...plantData } = updatedPlant;
      const updated = await api.updatePlant(id, plantData);
      setPlants((currentPlants) =>
        currentPlants.map((p) => (p.id === updated.id ? updated : p))
      );
    } catch (err) {
      setError("Failed to update plant. Please try again.");
    }
  }, []);

  const handleDeletePlant = useCallback(async (id) => {
    try {
      await api.deletePlant(id);
      setPlants((currentPlants) => currentPlants.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete plant. Please try again.");
    }
  }, []);

  // Filter plants based on search term
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {error && <div className="error">{error}</div>}
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
