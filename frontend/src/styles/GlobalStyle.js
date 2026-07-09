import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
}

:root{
    --primary-color: ${({ theme }) => theme.textPrimary};
    --primary-color2: ${({ theme }) => theme.textSecondary};
    --primary-color3: ${({ theme }) => theme.textMuted};
    --color-green: #42AD00;
    --color-grey: #aaa;
    --color-accent: #F56692;
    --color-delete: #FF0000;
}

body{
    font-family: 'Nunito', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: ${({ theme }) => theme.textSecondary};
    background: ${({ theme }) => theme.bg};
    transition: background 0.3s ease, color 0.3s ease;
}

h1, h2, h3, h4, h5, h6{
    color: ${({ theme }) => theme.textPrimary};
}

.error{
    color: red;
    animation: shake 0.5s ease-in-out;
    @keyframes shake {
        0%{
            transform: translateX(0);
        }
        25%{
            transform: translateX(10px);
        }
        50%{
            transform: translateX(-10px);
        }
        75%{
            transform: translateX(10px);
        }
        100%{
            transform: translateX(0);
        }
    }
}
`;