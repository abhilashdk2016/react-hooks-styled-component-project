import styled from 'styled-components';
import { Title } from '../Styles/title';
export const FoodGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export const FoodLabel = styled(Title)`
    position: absolute;
    background-color: rgba(255, 255, 255, .8);
    padding: 5px;
`;

export const Food = styled(Title)`
    height: 100px;
    padding: 10px;
    font-size: 20px;
    background-image: ${(props) => `url(${props.img})`};
    background-position: center;
    background-size: cover;
    margin-top: 5px;
    filter: contrast(75%);
    border-radius: 11px;
    box-shadow: 0px 0px 2px 0px grey;
    transition: box-shadow margin-top 1s;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 5px 10px 0px grey;
        filter: contrast(100%);
        margin-top: 0px;
        margin-bottom: 5px;
    }
`;