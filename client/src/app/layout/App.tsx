import { useEffect, useState } from "react";
import type { Product } from "../models/product";



function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // Dummy product data
  const  mockProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "This is product 1",
      price: 100,
      pictureUrl: "https://example.com/product1.jpg",
      type: "Type 1",
      brand: "Brand 1",
      quantityInStock: 10
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is product 2",
      price: 200,
      pictureUrl: "https://example.com/product2.jpg",
      type: "Type 2",
      brand: "Brand 2",
      quantityInStock: 20,
      
    },
    // ...
  ];

  useEffect(() => {
   const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:5001/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle error state here
      //fallback to mock data
      console.log('Using mock data instead', error);
      setProducts(mockProducts);
    }
  };

  fetchData();
  }, [])
  
  const addProduct = () => {
    setProducts(prevState => [...prevState,
      {
        id:prevState.length+1,
        name:'product3'+ prevState.length+1 ,
        description:'test' ,
        price:(prevState.length*100)+100,
        quantityInStock:10,
        pictureUrl:'https://via.placeholder.com/150',
        type:'boards',
        brand:'test'
      }]);
  }

  return (
    <div>
      <h1 style={{color:'red'}}>Re-store</h1>
      <ul>
        {products.map((item, index)=>(
          <li key={index}>
            {item.name} - {item.price}
            
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>addProduct</button>
    </div>
  )
}

export default App
