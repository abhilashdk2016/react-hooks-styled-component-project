import React from 'react';
import styled from 'styled-components';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';

const ToppingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr)
`;

const ToppingCheckbox = styled.input`
    margin-right: 10px;
    cursor: pointer;
`;

const CheckBoxLabel = styled.label`
    cursor: pointer;
`;

const Toppings = ({toppings, checkTopping}) => {
    console.log(toppings);
    return (<ToppingGrid>
        {
            toppings.map((topping, i) => (<CheckBoxLabel>
                <ToppingCheckbox type="checkbox" checked={topping.checked} onClick={() => {
                    checkTopping(i);
                }}/>
                {topping.name}
            </CheckBoxLabel>))
        }
    </ToppingGrid>)
}

export default Toppings;