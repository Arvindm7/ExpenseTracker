import React from 'react';
import styled, { keyframes } from 'styled-components';

function Loader() {
    return (
        <LoaderStyled>
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        </LoaderStyled>
    );
}

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
`;

const LoaderStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 300px;

    .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .spinner {
        width: 42px;
        height: 42px;
        border: 4px solid rgba(34, 34, 96, 0.1);
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: ${spin} 0.8s linear infinite;
    }

    p {
        font-size: 0.85rem;
        font-weight: 600;
        color: rgba(34, 34, 96, 0.4);
        animation: ${pulse} 1.5s ease-in-out infinite;
    }
`;

export default Loader;
