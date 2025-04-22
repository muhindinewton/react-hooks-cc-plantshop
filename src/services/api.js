const BASE_URL = "https://json-server-wsrt.onrender.com";

export const api = {
  async getPlants() {
    const response = await fetch(`${BASE_URL}/plants`);
    if (!response.ok) throw new Error("Failed to fetch plants");
    return response.json();
  },

  async createPlant(plantData) {
    const response = await fetch(`${BASE_URL}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(plantData),
    });
    if (!response.ok) throw new Error("Failed to create plant");
    return response.json();
  },

  async updatePlant(id, plantData) {
    const response = await fetch(`${BASE_URL}/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(plantData),
    });
    if (!response.ok) throw new Error("Failed to update plant");
    return response.json();
  },

  async deletePlant(id) {
    const response = await fetch(`${BASE_URL}/plants/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete plant");
    return response.json();
  },
};
