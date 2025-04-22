# 🌿 Plant Shop

A React application for managing a plant shop inventory. Users can view, add, update, and delete plants, as well as mark them as sold out and search through the inventory.

## Features

### Core Features
- 🌱 View all available plants
- ➕ Add new plants to the inventory
- 📦 Mark plants as "sold out"
- 🔍 Search plants by name

### Advanced Features
- 💰 Update plant prices (click on the price with pencil icon to edit)
- 🗑️ Delete plants from inventory

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-hooks-cc-plantshop
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON server (on port 6001):
```bash
json-server --watch db.json --port 6001
```

4. In a new terminal, start the React development server:
```bash
npm start
```

## Usage

### Adding a Plant
1. Fill out the "New Plant" form at the top of the page
2. Enter the plant name, image URL, and price
3. Click "Add Plant"

### Updating a Plant
- To edit price: Click on the price (indicated by a pencil icon)
- To mark as sold out: Click the "In Stock" button

### Searching Plants
- Use the search bar to filter plants by name
- Search is case-insensitive

### Deleting a Plant
- Click the "Delete" button on any plant card

## API Endpoints

### GET /plants
- Returns all plants

### POST /plants
- Creates a new plant
- Required headers: `Content-Type: Application/JSON`
- Request body example:
```json
{
  "name": "string",
  "image": "string",
  "price": "string"
}
```

### PATCH /plants/:id
- Updates a plant
- Required headers: `Content-Type: Application/JSON`

### DELETE /plants/:id
- Deletes a plant

## Technologies Used

- ⚛️ React
- 🪝 React Hooks (useState, useEffect, useCallback)
- 🎨 CSS for styling
- 🔄 JSON Server for mock backend

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

```json
{}
```
