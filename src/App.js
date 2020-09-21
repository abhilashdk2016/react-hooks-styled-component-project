import React, { useState } from 'react';
import { GlobalStyle } from './Styles/globalStyle';
import Navbar from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import Menu from './Menu/Menu';
import FoodDialog from './FoodDialog/FoodDialog';
import Order from './Order/Order';

function App() {

  const [openFood, setOpenFood] = useState();

  return (
    <>
      <GlobalStyle />
      <div style={{ transition: "all 8s" }}>
        <FoodDialog openFood={openFood} setOpenFood={setOpenFood}/>
      </div>
      
      <Navbar />
      <Order />
      <Banner />
      <Menu setOpenFood={setOpenFood} />
    </>
    
  );
}

export default App;
