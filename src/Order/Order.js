import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogFooter, ConfirmButton } from '../FoodDialog/FoodDialog';
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

`;

const Order = ({ orders}) => {
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
                                    {order.name}
                                </OrderItem>
                            </OrderContainer>
                        ))
                    }
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