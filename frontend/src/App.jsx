import { useState, useEffect } from 'react'
import { fetchAllItems, createItem } from './api'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchAllItems()
    .then(setItems)
    .catch(console.error);
  },[]);


  return (
    <div>
        <h1>My Items</h1>
        {items.map((item) => (
          <div key={item.id}>
            <strong>{items.title}</strong> - {item.description}
          </div>
        ))}
        <button 
          onClick={() => 
            createItem({
              title: "New Item",
              category: "test",
              description: "A test item",
              price: 100,
              rating: 5,
              tags: ["test"],
              reviews: ["Great!"],
              images: ["https://example.com"],
              sold: 0,
            }).then((created) => {
              console.log("Created:", created);
              setItems((prev) => [...prev, created]);
            })
        }
        >
          create Item
        </button>
    </div>
  );
}

export default App
