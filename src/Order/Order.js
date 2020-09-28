import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogFooter, ConfirmButton } from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';
const database = window.firebase.database();

const OrderStyled = styled.div`
    position: fixed;
    top: 48px;
    right: 0px;
    width: 340px;
    background-color: white;
    height: calc(100% - 48px);
    box-shadow: 4px 0px 5px 4px grey;
    z-index: 9;
    display: flex;
    flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
    padding: 20px;
    height: 100%;
`;

const OrderContainer = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid grey;
`;

const OrderItem = styled.div`
    padding: 10px 0px;
    display: grid;
    grid-template-columns: 20px 150px 20px 20px 60px;
    justify-content: space-between;
`;

const DetailItem = styled.div`
    color: gray;
    font-size: 10px;
`;

const sendOrder = (orders, { email, displayName }) => {
    const newOrderRef = database.ref('orders').push();
    const newOrders = orders.map(order => {
        return Object.keys(order).reduce((acc, orderKey) => {
            if(!order[orderKey]) {
                return acc;
            }
            if(orderKey === "toppings") {
                return {
                    ...acc,
                    [orderKey]: order[orderKey].filter(({ checked}) => checked).map(({ name }) => name)
                }
            }
            return {
                ...acc,
                [orderKey]: order[orderKey]
            }
        }, {});
    });
    newOrderRef.set({
        order: newOrders,
        email,
        displayName
    });
}

const Order = ({ orders, setOrders, setOpenFood, loggedIn, login, setOpenOrderDialog }) => {
    const pricePerTopping = 0.5;

    const getPrice = order => {
        return order.quantity * (order.price + order.toppings.filter(t => t.checked).length * pricePerTopping);
    }

    const subTotal = orders.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);

    const tax = subTotal * 0.07;
    const total = subTotal + tax;

    const deleteItem = index => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
    }

    return <OrderStyled>
        {
            orders.length === 0 
                ? <OrderContent>
                    Your order's looking pretty empty
                  </OrderContent>
                : <OrderContent>
                    <OrderContainer>
                        Your Orders:
                    </OrderContainer>
                    {
                        orders.map((order, index) => (
                            <OrderContainer>
                                <OrderItem>
                                    <div>{order.quantity}</div>
                                    <div>{order.name}</div>
                                    <div>
                                        <span role="img" aria-label="Delete Order" style={{cursor: "pointer", marginRight: "10px"}}
                                        onClick={e => { e.stopPropagation(); deleteItem(index)}}
                                        >🗑️</span>
                                    </div>
                                    <div>
                                        <span role="img" aria-label="Edit Order" style={{cursor: "pointer"}}
                                            onClick={() => setOpenFood({...order, index})}
                                            >✏️</span>
                                    </div>
                                    <div>{formatPrice(getPrice(order))}</div>
                                </OrderItem>
                                <DetailItem>
                                    {
                                        order.toppings
                                            .filter(t => t.checked)
                                            .map(topping => topping.name)
                                            .join(", ")
                                    }
                                </DetailItem>
                                {
                                    order.choice && <DetailItem>{order.choice}</DetailItem>
                                }
                            </OrderContainer>
                        ))
                    }
                    <OrderContainer>
                        <OrderItem>
                          <div />
                          <div>Sub Total</div>
                          <div>{formatPrice(subTotal)}</div>  
                        </OrderItem>
                        <OrderItem>
                          <div />
                          <div>Tax</div>
                          <div>{formatPrice(tax)}</div>  
                        </OrderItem>
                        <OrderItem>
                          <div />
                          <div>Total</div>
                          <div>{formatPrice(total)}</div>  
                        </OrderItem>
                    </OrderContainer>
                </OrderContent>
        }
        
        {
            orders.length > 0 && <DialogFooter>
                <ConfirmButton onClick={() => {
                            if(loggedIn) {
                                sendOrder(orders, loggedIn);
                                setOpenOrderDialog(true);
                            } else {
                                login();
                            }
                        }
                    }>
                        Checkout
                    </ConfirmButton>
            </DialogFooter>
        }
    </OrderStyled>
}

export default Order;