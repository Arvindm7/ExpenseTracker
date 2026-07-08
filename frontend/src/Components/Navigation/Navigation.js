import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/icons';
import { useThemeToggle } from '../../context/themeContext';

function Navigation({ active, setActive }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isDark, toggle } = useThemeToggle();

    return (
        <>
            {/* Mobile hamburger button */}
            <MobileToggle onClick={() => setMobileOpen(!mobileOpen)} isDark={isDark}>
                <i className={`fa-solid fa-${mobileOpen ? 'xmark' : 'bars'}`}></i>
            </MobileToggle>

            {/* Overlay for mobile */}
            {mobileOpen && <MobileOverlay onClick={() => setMobileOpen(false)} />}

            <NavStyled className={mobileOpen ? 'mobile-open' : ''}>
                <div className="user-container">
                    <img src={avatar} alt="user avatar" />
                    <div className="text">
                        <h2>Track your Spending</h2>
                    </div>
                </div>

                <ul className="menu-items">
                    {menuItems.map((item) => {
                        return (
                            <li
                                key={item.id}
                                onClick={() => {
                                    setActive(item.id);
                                    setMobileOpen(false);
                                }}
                                className={active === item.id ? 'active' : ''}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </li>
                        );
                    })}
                </ul>

                <div className="bottom-nav">
                    {/* Theme toggle */}
                    <li className="theme-toggle" onClick={toggle}>
                        <i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}></i>
                        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </li>
                    <li>
                        {signout} <span>Sign Out</span>
                    </li>
                </div>
            </NavStyled>
        </>
    );
}

const MobileToggle = styled.button`
    display: none;
    position: fixed;
    top: 1.2rem;
    left: 1.2rem;
    z-index: 1001;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.borderColor};
    background: ${({ theme }) => theme.bgNav};
    backdrop-filter: blur(4.5px);
    box-shadow: ${({ theme }) => theme.shadow};
    cursor: pointer;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.3s ease;

    @media (max-width: 900px) {
        display: flex;
    }
`;

const MobileOverlay = styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.bgOverlay};
    z-index: 999;

    @media (max-width: 900px) {
        display: block;
    }
`;

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 280px;
    height: 100%;
    background: ${({ theme }) => theme.bgNav};
    border: 3px solid ${({ theme }) => theme.borderColor};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    flex-shrink: 0;
    transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

    .user-container {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        padding: .2rem;
        box-shadow: ${({ theme }) => theme.shadow};
    }

    h2 {
        color: ${({ theme }) => theme.textPrimary};
        font-size: 1.1rem;
    }

    p {
        color: ${({ theme }) => theme.textSecondary};
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;

        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .4rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .3s ease-in-out;
            color: ${({ theme }) => theme.textSecondary};
            padding: 0.6rem 1rem;
            border-radius: 12px;
            position: relative;

            i {
                color: ${({ theme }) => theme.textSecondary};
                font-size: 1.3rem;
                transition: all .3s ease-in-out;
            }

            &:hover {
                color: ${({ theme }) => theme.textPrimary};
                background: ${({ theme }) => theme.navHoverBg};

                i {
                    color: ${({ theme }) => theme.textPrimary};
                }
            }
        }
    }

    .active {
        color: ${({ theme }) => theme.textPrimary} !important;
        background: ${({ theme }) => theme.navActiveBg};
        border-radius: 12px;

        i {
            color: ${({ theme }) => theme.textPrimary} !important;
        }

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 60%;
            background: ${({ theme }) => theme.name === 'dark' ? '#6C63FF' : '#222260'};
            border-radius: 0 10px 10px 0;
            transition: all 0.3s ease;
        }
    }

    .bottom-nav {
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            font-weight: 500;
            cursor: pointer;
            transition: all .3s ease-in-out;
            color: ${({ theme }) => theme.textSecondary};
            padding: 0.6rem 1rem;
            border-radius: 12px;
            list-style: none;

            i {
                font-size: 1.3rem;
            }

            &:hover {
                color: var(--color-delete);
                background: rgba(231, 76, 60, 0.06);

                i {
                    color: var(--color-delete);
                }
            }
        }

        .theme-toggle {
            &:hover {
                color: #F2994A;
                background: rgba(242, 153, 74, 0.08);

                i {
                    color: #F2994A;
                }
            }
        }
    }

    @media (max-width: 900px) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
        border-radius: 0 32px 32px 0;
        transform: translateX(-110%);
        background: ${({ theme }) => theme.name === 'dark' ? 'rgba(22, 22, 40, 0.98)' : 'rgba(252, 246, 249, 0.98)'};

        &.mobile-open {
            transform: translateX(0);
        }
    }
`;

export default Navigation;
