import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../context/authContext';
import { useToast } from '../Toast/Toast';

function Login({ onSwitchToRegister, onSwitchToLanding }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        const result = await login(email, password);
        setIsSubmitting(false);

        if (result.success) {
            toast.success('Welcome back!');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <AuthPageStyled>
            <div className="auth-card">
                <button className="back-btn" onClick={onSwitchToLanding}>
                    <i className="fa-solid fa-arrow-left"></i> Back to Home
                </button>
                <div className="auth-header">
                    <div className="logo-icon">
                        <i className="fa-solid fa-wallet"></i>
                    </div>
                    <h1>Welcome Back</h1>
                    <p className="subtitle">Sign in to your ExpenseTracker account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <div className="input-icon">
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`}></i>
                        </button>
                    </div>

                    <button
                        id="login-submit"
                        type="submit"
                        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="spinner"></div>
                        ) : (
                            <>
                                Sign In
                                <i className="fa-solid fa-arrow-right"></i>
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{' '}
                        <button
                            id="switch-to-register"
                            type="button"
                            className="link-btn"
                            onClick={onSwitchToRegister}
                        >
                            Create one
                        </button>
                    </p>
                </div>
            </div>

            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </AuthPageStyled>
    );
}

const float = keyframes`
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
`;

const float2 = keyframes`
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-5deg); }
`;

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const AuthPageStyled = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 1rem;

    .floating-shapes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    .shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;
    }

    .shape-1 {
        width: 300px;
        height: 300px;
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
        top: -100px;
        right: -50px;
        animation: ${float} 8s ease-in-out infinite;
    }

    .shape-2 {
        width: 200px;
        height: 200px;
        background: linear-gradient(135deg, #F56692, #F2994A);
        bottom: -60px;
        left: -40px;
        animation: ${float2} 10s ease-in-out infinite;
    }

    .shape-3 {
        width: 150px;
        height: 150px;
        background: linear-gradient(135deg, #42AD00, #2ED8A3);
        top: 40%;
        left: 10%;
        animation: ${float} 12s ease-in-out infinite;
    }

    .auth-card {
        position: relative;
        z-index: 1;
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 28px;
        padding: 2.5rem 2.5rem 2rem;
        width: 100%;
        max-width: 440px;
        box-shadow: ${({ theme }) => theme.shadow};
        backdrop-filter: blur(10px);
        animation: ${fadeInUp} 0.6s ease-out;
    }

    .auth-header {
        text-align: center;
        margin-bottom: 2rem;

        .logo-icon {
            width: 68px;
            height: 68px;
            border-radius: 20px;
            background: linear-gradient(135deg, #6C63FF, #5DADE2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.2rem;
            box-shadow: 0 8px 25px rgba(108, 99, 255, 0.3);

            i {
                font-size: 1.8rem;
                color: #fff;
            }
        }

        h1 {
            font-size: 1.8rem;
            margin-bottom: 0.4rem;
            color: ${({ theme }) => theme.textPrimary};
        }

        .subtitle {
            color: ${({ theme }) => theme.textMuted};
            font-size: 0.95rem;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
    }

    .input-group {
        position: relative;
        display: flex;
        align-items: center;

        .input-icon {
            position: absolute;
            left: 1.1rem;
            color: ${({ theme }) => theme.textMuted};
            font-size: 1rem;
            pointer-events: none;
            transition: color 0.3s;
        }

        input {
            width: 100%;
            padding: 0.9rem 1rem 0.9rem 3rem;
            border: 2px solid ${({ theme }) => theme.borderColor};
            border-radius: 14px;
            background: transparent;
            font-family: inherit;
            font-size: 1rem;
            color: ${({ theme }) => theme.textPrimary};
            outline: none;
            transition: all 0.3s ease;

            &::placeholder {
                color: ${({ theme }) => theme.textPlaceholder};
            }

            &:focus {
                border-color: #6C63FF;
                background: ${({ theme }) => theme.bgInput};
            }

            &:focus + .input-icon,
            &:focus ~ .input-icon {
                color: #6C63FF;
            }
        }

        /* Fix: target input-icon when input is focused */
        input:focus ~ .input-icon {
            color: #6C63FF;
        }

        .toggle-password {
            position: absolute;
            right: 1rem;
            background: none;
            border: none;
            cursor: pointer;
            color: ${({ theme }) => theme.textMuted};
            font-size: 1rem;
            padding: 0.3rem;
            transition: color 0.2s;

            &:hover {
                color: ${({ theme }) => theme.textPrimary};
            }
        }
    }

    /* Make the icon color change work with the DOM order */
    .input-group {
        .input-icon {
            order: -1;
        }
    }

    .submit-btn {
        margin-top: 0.5rem;
        padding: 0.95rem;
        border: none;
        border-radius: 14px;
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
        color: #fff;
        font-family: inherit;
        font-size: 1.05rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);

        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(108, 99, 255, 0.4);
        }

        &:active:not(:disabled) {
            transform: translateY(0);
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        i {
            font-size: 0.9rem;
            transition: transform 0.3s;
        }

        &:hover i {
            transform: translateX(4px);
        }
    }

    .spinner {
        width: 22px;
        height: 22px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: ${spin} 0.6s linear infinite;
    }

    .auth-footer {
        text-align: center;
        margin-top: 1.5rem;
        padding-top: 1.2rem;
        border-top: 1px solid ${({ theme }) => theme.borderActive};

        p {
            color: ${({ theme }) => theme.textMuted};
            font-size: 0.9rem;
        }

        .link-btn {
            background: none;
            border: none;
            color: #6C63FF;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            transition: color 0.2s;

            &:hover {
                color: #5DADE2;
            }
        }
    }

    .back-btn {
        background: none;
        border: none;
        color: ${({ theme }) => theme.textMuted};
        font-family: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.5rem;
        transition: color 0.2s;

        &:hover {
            color: #6C63FF;
        }

        i { font-size: 0.8rem; }
    }

    @media (max-width: 500px) {
        .auth-card {
            padding: 2rem 1.5rem 1.5rem;
            border-radius: 20px;
        }

        .auth-header h1 {
            font-size: 1.5rem;
        }
    }
`;

export default Login;
