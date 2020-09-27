import React from 'react';
import styled from 'styled-components';

const CursorPointer = `cursor: pointer`;

const RadioInput = styled.input`
    ${CursorPointer}
`;

const Label = styled.label`
    ${CursorPointer}
`;

export function Choices({openFood, choiceRadio}) {
    return (
        <>
            <h3>Choices</h3>
            {
                openFood.choices && openFood.choices.map(choice => (
                    <>
                        <RadioInput 
                            type="radio"
                            id={choice}
                            name="choice"
                            value={choice}
                            checked={choiceRadio.value === choice}
                            onChange={choiceRadio.onChange}
                        />
                        <Label for={choice}>{choice}</Label>{" "}
                    </>
                ))
            }
        </>
    )
}