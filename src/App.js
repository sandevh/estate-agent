import { useState } from 'react';
import './App.css';
import PropertyItem from './components/PropertyItem/PropertyItem';
import propertyData from "./data/properties.json";

function App() {

  const [properties] = useState(propertyData.properties || []);

  return (
    <div className="App">
      {properties.map((property) => 
        <PropertyItem 
          key={property.id}
          property={property}
        />
      )}
    </div>
  );
}

export default App;
