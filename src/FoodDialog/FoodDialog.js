import styled from 'styled-components';
import React from 'react';
import { FoodLabel } from '../Menu/FoodGrid';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';
import { QuantityInput } from './QuantityInput';
import { useQuantity  } from '../Hooks/useQuantity';
import { useToppings  } from '../Hooks/useToppings';
import { useChoice } from '../Hooks/useChoice';
import { formatPrice } from '../Data/FoodData';
import Toppings from './Toppings';
import { Choices } from './Choices';

export const Dialog = styled.div`
    width: 500px;
    background-color: white;
    position: fixed;
    top: 75px;
    z-index: 11;
    max-height: calc(100% - 100px);
    left: calc(50% - 250px);
    border-radius: 5px;
    box-shadow: 0px 0px 2px 0px grey;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const DialogBanner = styled.div`
    min-height: 200px;
    margin-bottom: 20px;
    ${ ( { img }) => (img ? `background-image: url(${img});` : `min-height: 75px`)}
    background-position: center;
    background-size: cover;
`;

export const DialogShadow = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    background-color: black;
    opacity: 0.7;
    z-index: 10;
`;

const DialogBannerName = styled(FoodLabel)`
    top: ${ ( { img }) => (img ? `100px` : `20px`)};
    font-size: 30px;
    padding: 5px 40px;
`;

export const DialogContent = styled.div`
    overflow: auto;
    min-height: 100px;
    padding: 0px 40px;
    padding-bottom: 80px;
`;

export const DialogFooter = styled.div`
    box-shadow: 0px -2px 10px 0px grey;
    height: 60px;
    display: flex;
    justify-content: center;
`;

export const ConfirmButton = styled(Title)`
    margin: 10px;
    color: white;
    height: 20px;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    width: 200px;
    cursor: pointer; 
    background-color: ${pizzaRed};
    ${({disabled}) => disabled && 
    `
        opacity: .5;
        background-color: grey;
        pointer-events: none;
    `}
    z-index: 10;
`;

const FoodDialogContainer = ({openFood, setOpenFood, setOrders, orders}) => {
    const quantity = useQuantity(openFood && openFood.quantity);
    const toppings = useToppings(openFood.toppings);
    const choiceRadio = useChoice(openFood.choice);
    const isEditing = openFood.index > -1;

    const order = { ...openFood, quantity: quantity.value, toppings: toppings.toppings, choice: choiceRadio.value };

    const editOrder = () => {
        const newOrders = [...orders];
        newOrders[openFood.index] = order;
        setOrders(newOrders);
        setOpenFood(null);
    }

    const pricePerTopping = 0.5;

    const getPrice = order => {
        return order.quantity * (order.price + order.toppings.filter(t => t.checked).length * pricePerTopping);
    }

    const hasToppings = food => food.section === 'Pizza';

    return <>
        <DialogShadow onClick={() => { setOpenFood(null) }}/>
        <Dialog>
            <DialogBanner img={openFood.img}>
                <DialogBannerName>{openFood.name}</DialogBannerName>
            </DialogBanner>
            <DialogContent>
                <QuantityInput quantity={quantity}/>
                {
                    hasToppings(openFood) &&
                    <>
                        <h3>Would you like toppings?</h3>
                        <Toppings {...toppings}/>
                    </>
                }
                {
                    openFood.choices && <Choices openFood={openFood} choiceRadio={choiceRadio} />
                }
            </DialogContent>
            <DialogFooter>
                <ConfirmButton 
                    onClick={isEditing ? editOrder : () => { setOrders([...orders, order]); setOpenFood(null);}} 
                    disabled={openFood.choices && !choiceRadio.value}>
                    {isEditing ? 'Update Order:' : 'Add to Cart:'} {formatPrice(getPrice(order))}
                </ConfirmButton>
            </DialogFooter>
        </Dialog>
    </>
}

export function FoodDialog(props) {
    if(!props.openFood) return null;
    return <FoodDialogContainer {...props} />
};