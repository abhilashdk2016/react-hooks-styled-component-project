import React from 'react';
import { GlobalStyle } from './Styles/globalStyle';
import Navbar from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import Menu from './Menu/Menu';
import { FoodDialog } from './FoodDialog/FoodDialog';
import Order from './Order/Order';
import { useOpenFood } from './Hooks/useOpenFood';
import { useOrders } from './Hooks/useOrders';
import { useTitle } from './Hooks/useTitle';
import { useAuthentication } from './Hooks/useAuthentication';
import { OrderDialog } from './Order/OrderDialog';
import { useOrderDialog } from './Hooks/useOrderDialog';
function App() {

  const openFood = useOpenFood();
  const orders = useOrders();
  useTitle({...openFood, ...orders});
  const auth = useAuthentication();
  const orderDialog = useOrderDialog();
  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openFood} {...orders} />
      <OrderDialog {...orderDialog} {...orders} />
      <Navbar {...auth} />
      <Order {...orders} {...openFood} {...auth} {...orderDialog} />
      <Banner />
      <Menu {...openFood} />
    </>
    
  );
}

export default App;
