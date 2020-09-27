import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogFooter, ConfirmButton } from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';

const OrderStyled = styled.div`
    position: fixed;
    top: 48px;
    right: 0px;
    width: 340px;
    background-color: white;
    height: calc(100% - 48px);
    box-shadow: 4px 0px 5px 4px grey;
    z-index: 10;
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
    grid-template-columns: 20px 150px 20px 60px;
    justify-content: space-between;
`;

const DetailItem = styled.div`
    color: gray;
    font-size: 10px;
`;

const Order = ({ orders}) => {
    const pricePerTopping = 0.5;

    const getPrice = order => {
        return order.quantity * (order.price + order.toppings.filter(t => t.checked).length * pricePerTopping);
    }

    const subTotal = orders.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);

    const tax = subTotal * 0.07;
    const total = subTotal + tax;

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
                        orders.map(order => (
                            <OrderContainer>
                                <OrderItem>
                                    <div>{order.quantity}</div>
                                    <div>{order.name}</div>
                                    <div></div>
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
        
        <DialogFooter>
            <ConfirmButton>
                Checkout
            </ConfirmButton>
        </DialogFooter>
    </OrderStyled>
}

export default Order;