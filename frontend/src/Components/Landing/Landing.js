import React from 'react';
import styled, { keyframes } from 'styled-components';

function Landing({ onGetStarted, onLogin }) {
    return (
        <LandingStyled>

            {/* Navigation */}
            <nav className="landing-nav">
                <div className="nav-brand">
                    <div className="brand-icon">
                        <i className="fa-solid fa-wallet"></i>
                    </div>
                    <span className="brand-name">ExpenseTracker</span>
                </div>
                <button className="nav-login-btn" onClick={onLogin}>
                    Sign In <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="badge">
                        <i className="fa-solid fa-bolt"></i>
                        <span>Smart Finance Management</span>
                    </div>
                    <h1>
                        Take Control of
                        <span className="gradient-text"> Your Finances</span>
                    </h1>
                    <p className="hero-description">
                        Track income, monitor expenses, and visualize your spending patterns —
                        all in one beautiful, intuitive dashboard. Start making smarter financial decisions today.
                    </p>
                    <div className="hero-actions">
                        <button className="cta-primary" onClick={onGetStarted}>
                            Get Started Free
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <button className="cta-secondary" onClick={onLogin}>
                            <i className="fa-solid fa-play"></i>
                            Sign In
                        </button>
                    </div>
                    <div className="trust-badges">
                        <div className="trust-item">
                            <i className="fa-solid fa-shield-halved"></i>
                            <span>Secure & Encrypted</span>
                        </div>
                        <div className="trust-divider"></div>
                        <div className="trust-item">
                            <i className="fa-solid fa-bolt"></i>
                            <span>Real-time Tracking</span>
                        </div>
                        <div className="trust-divider"></div>
                        <div className="trust-item">
                            <i className="fa-solid fa-chart-pie"></i>
                            <span>Visual Analytics</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="dashboard-preview">
                        <div className="preview-header">
                            <div className="preview-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span className="preview-title">Dashboard</span>
                        </div>
                        <div className="preview-content">
                            <div className="preview-stat green">
                                <i className="fa-solid fa-arrow-trend-up"></i>
                                <div>
                                    <span className="label">Income</span>
                                    <span className="value">₹1,25,000</span>
                                </div>
                            </div>
                            <div className="preview-stat red">
                                <i className="fa-solid fa-arrow-trend-down"></i>
                                <div>
                                    <span className="label">Expenses</span>
                                    <span className="value">₹48,500</span>
                                </div>
                            </div>
                            <div className="preview-stat purple">
                                <i className="fa-solid fa-wallet"></i>
                                <div>
                                    <span className="label">Balance</span>
                                    <span className="value">₹76,500</span>
                                </div>
                            </div>
                            <div className="preview-chart">
                                <div className="chart-bars">
                                    <div className="bar" style={{height: '40%'}}></div>
                                    <div className="bar" style={{height: '65%'}}></div>
                                    <div className="bar" style={{height: '45%'}}></div>
                                    <div className="bar" style={{height: '80%'}}></div>
                                    <div className="bar" style={{height: '55%'}}></div>
                                    <div className="bar" style={{height: '90%'}}></div>
                                    <div className="bar" style={{height: '70%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="floating-card card-1">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        <span>+₹25,000</span>
                    </div>
                    <div className="floating-card card-2">
                        <i className="fa-solid fa-chart-line"></i>
                        <span>+12.5%</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Everything you need to manage money</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon green-bg">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h3>Income Tracking</h3>
                        <p>Log salary, freelancing, investments, and all income sources with categories and dates.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon red-bg">
                            <i className="fa-solid fa-receipt"></i>
                        </div>
                        <h3>Expense Monitoring</h3>
                        <p>Categorize every expense and see exactly where your money goes each month.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon purple-bg">
                            <i className="fa-solid fa-chart-pie"></i>
                        </div>
                        <h3>Visual Reports</h3>
                        <p>Beautiful charts and graphs that make your financial data easy to understand at a glance.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon orange-bg">
                            <i className="fa-solid fa-user-shield"></i>
                        </div>
                        <h3>Secure & Private</h3>
                        <p>Your data is encrypted and private. Each user has their own isolated dashboard.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bottom-cta">
                <h2>Ready to take control?</h2>
                <p>Join today and start tracking your finances in seconds.</p>
                <button className="cta-primary" onClick={onGetStarted}>
                    Create Free Account
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-brand">
                    <div className="brand-icon small">
                        <i className="fa-solid fa-wallet"></i>
                    </div>
                    <span>ExpenseTracker</span>
                </div>
                <p>&copy; {new Date().getFullYear()} ExpenseTracker. Built with ❤️</p>
            </footer>
        </LandingStyled>
    );
}

const float = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
`;

const float2 = keyframes`
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
`;

const slideUp = keyframes`
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

const LandingStyled = styled.div`
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    background: ${({ theme }) => theme.bg};

    /* ---------- Navigation ---------- */
    .landing-nav {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.2rem 3rem;
        max-width: 1200px;
        margin: 0 auto;
        animation: ${slideUp} 0.6s ease-out;
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
    }

    .brand-icon {
        width: 42px; height: 42px;
        border-radius: 12px;
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);

        i { font-size: 1.1rem; color: #fff; }

        &.small {
            width: 32px; height: 32px;
            border-radius: 8px;
            i { font-size: 0.9rem; }
        }
    }

    .brand-name {
        font-size: 1.3rem;
        font-weight: 800;
        color: ${({ theme }) => theme.textPrimary};
    }

    .nav-login-btn {
        padding: 0.6rem 1.4rem;
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 12px;
        background: ${({ theme }) => theme.bgCard};
        color: ${({ theme }) => theme.textPrimary};
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s;
        backdrop-filter: blur(10px);

        &:hover {
            border-color: #6C63FF;
            color: #6C63FF;
            transform: translateY(-2px);
            box-shadow: ${({ theme }) => theme.shadowHover};
        }
    }

    /* ---------- Hero ---------- */
    .hero {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 3rem 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .hero-content {
        animation: ${slideUp} 0.8s ease-out;
    }

    .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 1rem;
        border-radius: 50px;
        background: ${({ theme }) => theme.badgeBg};
        color: #6C63FF;
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: 1.2rem;
        border: 1px solid ${({ theme }) => theme.borderColor};

        i { font-size: 0.75rem; }
    }

    h1 {
        font-size: 3.2rem;
        line-height: 1.15;
        margin-bottom: 1.2rem;
        color: ${({ theme }) => theme.textPrimary};
    }

    .gradient-text {
        background: linear-gradient(135deg, #6C63FF, #5DADE2, #2ED8A3);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: ${shimmer} 4s linear infinite;
    }

    .hero-description {
        font-size: 1.1rem;
        color: ${({ theme }) => theme.textSecondary};
        line-height: 1.7;
        margin-bottom: 2rem;
        max-width: 500px;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2.5rem;
    }

    .cta-primary {
        padding: 0.9rem 2rem;
        border: none;
        border-radius: 14px;
        background: linear-gradient(135deg, #6C63FF, #5DADE2);
        color: #fff;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        transition: all 0.3s;
        box-shadow: 0 4px 20px rgba(108, 99, 255, 0.35);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(108, 99, 255, 0.45);
        }

        i { transition: transform 0.3s; }
        &:hover i { transform: translateX(4px); }
    }

    .cta-secondary {
        padding: 0.9rem 1.8rem;
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 14px;
        background: ${({ theme }) => theme.bgCard};
        color: ${({ theme }) => theme.textPrimary};
        font-family: inherit;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        transition: all 0.3s;
        backdrop-filter: blur(10px);

        &:hover {
            border-color: #6C63FF;
            transform: translateY(-3px);
            box-shadow: ${({ theme }) => theme.shadowHover};
        }
    }

    .trust-badges {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .trust-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: ${({ theme }) => theme.textMuted};
        font-size: 0.8rem;
        font-weight: 600;

        i { font-size: 0.85rem; color: #6C63FF; }
    }

    .trust-divider {
        width: 1px; height: 16px;
        background: ${({ theme }) => theme.borderActive};
    }

    /* ---------- Hero Visual (Dashboard Preview) ---------- */
    .hero-visual {
        position: relative;
        animation: ${slideUp} 1s ease-out 0.2s both;
    }

    .dashboard-preview {
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 20px;
        box-shadow: ${({ theme }) => theme.shadow};
        overflow: hidden;
    }

    .preview-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem 1.2rem;
        border-bottom: 1px solid ${({ theme }) => theme.borderActive};
    }

    .preview-dots {
        display: flex; gap: 0.35rem;
        span {
            width: 10px; height: 10px;
            border-radius: 50%;
            &:nth-child(1) { background: #E74C3C; }
            &:nth-child(2) { background: #F2994A; }
            &:nth-child(3) { background: #42AD00; }
        }
    }

    .preview-title {
        font-size: 0.8rem;
        font-weight: 600;
        color: ${({ theme }) => theme.textMuted};
    }

    .preview-content {
        padding: 1.2rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0.8rem;
    }

    .preview-stat {
        background: ${({ theme }) => theme.bgMain};
        border-radius: 12px;
        padding: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        border: 1px solid ${({ theme }) => theme.borderColor};

        i {
            font-size: 1rem;
            width: 32px; height: 32px;
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            color: #fff;
            flex-shrink: 0;
        }

        .label {
            font-size: 0.65rem;
            color: ${({ theme }) => theme.textMuted};
            font-weight: 600;
            text-transform: uppercase;
            display: block;
        }

        .value {
            font-size: 0.95rem;
            font-weight: 800;
            display: block;
        }

        &.green i { background: linear-gradient(135deg, #42AD00, #2ED8A3); }
        &.green .value { color: #42AD00; }
        &.red i { background: linear-gradient(135deg, #E74C3C, #F56692); }
        &.red .value { color: #E74C3C; }
        &.purple i { background: linear-gradient(135deg, #6C63FF, #5DADE2); }
        &.purple .value { color: #6C63FF; }
    }

    .preview-chart {
        grid-column: 1 / -1;
        background: ${({ theme }) => theme.bgMain};
        border-radius: 12px;
        padding: 1rem;
        border: 1px solid ${({ theme }) => theme.borderColor};
        margin-top: 0.2rem;
    }

    .chart-bars {
        display: flex;
        align-items: flex-end;
        gap: 0.6rem;
        height: 80px;
    }

    .bar {
        flex: 1;
        background: linear-gradient(180deg, #6C63FF, #5DADE2);
        border-radius: 6px 6px 2px 2px;
        min-height: 10px;
        opacity: 0.85;
        transition: opacity 0.3s;

        &:nth-child(even) {
            background: linear-gradient(180deg, #42AD00, #2ED8A3);
        }
    }

    .floating-card {
        position: absolute;
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 14px;
        padding: 0.7rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: ${({ theme }) => theme.shadowHover};
        font-weight: 700;
        font-size: 0.9rem;
        z-index: 2;

        &.card-1 {
            top: -10px; right: -10px;
            color: #42AD00;
            animation: ${float} 4s ease-in-out infinite;
            i { color: #42AD00; }
        }

        &.card-2 {
            bottom: 30px; left: -20px;
            color: #6C63FF;
            animation: ${float2} 5s ease-in-out infinite 1s;
            i { color: #6C63FF; }
        }
    }

    /* ---------- Features ---------- */
    .features {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 3rem;

        h2 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 2.5rem;
            color: ${({ theme }) => theme.textPrimary};
        }
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    .feature-card {
        background: ${({ theme }) => theme.bgCard};
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 20px;
        padding: 1.8rem 1.5rem;
        text-align: center;
        transition: all 0.3s;
        box-shadow: ${({ theme }) => theme.shadow};

        &:hover {
            transform: translateY(-5px);
            box-shadow: ${({ theme }) => theme.shadowHover};
        }

        h3 {
            font-size: 1.05rem;
            margin-bottom: 0.5rem;
            color: ${({ theme }) => theme.textPrimary};
        }

        p {
            font-size: 0.85rem;
            color: ${({ theme }) => theme.textMuted};
            line-height: 1.6;
        }
    }

    .feature-icon {
        width: 52px; height: 52px;
        border-radius: 14px;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 1rem;
        i { font-size: 1.3rem; color: #fff; }

        &.green-bg { background: linear-gradient(135deg, #42AD00, #2ED8A3); }
        &.red-bg { background: linear-gradient(135deg, #E74C3C, #F56692); }
        &.purple-bg { background: linear-gradient(135deg, #6C63FF, #5DADE2); }
        &.orange-bg { background: linear-gradient(135deg, #F2994A, #F56692); }
    }

    /* ---------- Bottom CTA ---------- */
    .bottom-cta {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 4rem 3rem;
        max-width: 600px;
        margin: 0 auto;

        h2 {
            font-size: 2rem;
            margin-bottom: 0.8rem;
            color: ${({ theme }) => theme.textPrimary};
        }

        p {
            color: ${({ theme }) => theme.textMuted};
            margin-bottom: 1.5rem;
            font-size: 1.05rem;
        }

        .cta-primary {
            margin: 0 auto;
        }
    }

    /* ---------- Footer ---------- */
    .landing-footer {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 2rem 3rem;
        border-top: 1px solid ${({ theme }) => theme.borderActive};

        .footer-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;

            span {
                font-weight: 700;
                color: ${({ theme }) => theme.textPrimary};
                font-size: 0.95rem;
            }
        }

        p {
            color: ${({ theme }) => theme.textMuted};
            font-size: 0.8rem;
        }
    }

    /* ---------- Responsive ---------- */
    @media (max-width: 1024px) {
        .hero {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3rem 2rem 2rem;
        }

        h1 { font-size: 2.5rem; }

        .features-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 700px) {
        .landing-nav { padding: 1rem 1.5rem; }

        .hero { padding: 2rem 1.5rem 1.5rem; }

        h1 { font-size: 2rem; }

        .hero-description { font-size: 1rem; }

        .hero-actions {
            flex-direction: column;
            button { width: 100%; justify-content: center; }
        }

        .trust-badges {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .trust-divider { display: none; }

        .features-grid {
            grid-template-columns: 1fr;
        }

        .features, .bottom-cta {
            padding: 2.5rem 1.5rem;
        }

        .preview-content {
            grid-template-columns: 1fr;
        }

        .floating-card { display: none; }
    }
`;

export default Landing;
