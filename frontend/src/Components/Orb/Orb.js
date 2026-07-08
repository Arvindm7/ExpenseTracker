import React from 'react'
import styled, { keyframes, useTheme } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {

    const {width, height} = useWindowSize()
    const theme = useTheme()

    const moveOrb = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `

    const isDark = theme.name === 'dark';

    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: ${isDark
            ? 'linear-gradient(180deg, #6C63FF 0%, #5DADE2 100%)'
            : 'linear-gradient(180deg, #F56692 0%, #F2994A 100%)'};
        filter: blur(400px);
        opacity: ${isDark ? '0.15' : '1'};
        animation: ${moveOrb} 10s alternate linear infinite;
        transition: background 0.5s ease, opacity 0.5s ease;
    `;

    return (
        <OrbStyled></OrbStyled>
    )
}

export default Orb