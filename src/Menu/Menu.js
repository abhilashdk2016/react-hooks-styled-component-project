import React from 'react';
import styled from 'styled-components';
import { foods } from '../Data/FoodData';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';
import { formatPrice } from '../Data/FoodData';

const MenuStyled = styled.div`
    height: 1000px;
    margin: 0px 400px 50px 20px;
`;

const Menu = ({setOpenFood}) => {
    return (
        <MenuStyled>
            {Object.entries(foods).map(([sectionName, foods], index) => (
                <>
                    <h1>{sectionName}</h1>
                    <FoodGrid key={index}>
                        {
                            foods.map((food, index) => (
                                <Food img={food.img} onClick={() => { setOpenFood(food)}} key={index + 1}>
                                    <FoodLabel>
                                        <div>
                                            {food.name}
                                        </div>
                                        <div>
                                            {formatPrice(food.price)}
                                        </div>
                                    </FoodLabel>
                                </Food>
                            ))
                        }
                    </FoodGrid>
                </>
            ))}
        </MenuStyled>
    );
}

export default Menu;