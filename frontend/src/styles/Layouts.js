import styled from "styled-components";

export const MainLayout = styled.div`   
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    min-height: 0;

    @media (max-width: 900px) {
        padding: 1rem;
        gap: 1rem;
    }
`;

export const InnerLayout = styled.div`   
    padding: 2rem 1.5rem;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
        padding: 1.2rem 1rem;
    }
`;