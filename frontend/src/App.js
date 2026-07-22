import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from './Components/Navigation/Navigation';
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Transactions from "./Components/Transactions/Transactions";
import Analytics from "./Components/Analytics/Analytics";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { useAuth } from "./context/authContext";

function App() {
  const [active, setActive] = useState(1);
  // 'landing', 'login', 'register'
  const [authView, setAuthView] = useState('landing');
  const { isAuthenticated, loading } = useAuth();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <LoadingScreen bg={bg}>
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </LoadingScreen>
    );
  }

  // Show landing / auth pages if not logged in
  if (!isAuthenticated) {
    // Landing page
    if (authView === 'landing') {
      return (
        <Landing
          onGetStarted={() => setAuthView('register')}
          onLogin={() => setAuthView('login')}
        />
      );
    }

    // Login / Register pages (no orb, no scrollbar issues)
    return (
      <AuthWrapper bg={bg}>
        {authView === 'login' ? (
          <Login
            onSwitchToRegister={() => setAuthView('register')}
            onSwitchToLanding={() => setAuthView('landing')}
          />
        ) : (
          <Register
            onSwitchToLogin={() => setAuthView('login')}
            onSwitchToLanding={() => setAuthView('landing')}
          />
        )}
      </AuthWrapper>
    );
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.bg};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    z-index: 1;

    .loader {
      width: 48px;
      height: 48px;
      border: 4px solid ${({ theme }) => theme.borderColor};
      border-top-color: #6C63FF;
      border-radius: 50%;
      animation: ${spin} 0.8s linear infinite;
    }

    p {
      color: ${({ theme }) => theme.textMuted};
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const AuthWrapper = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.bg};
  position: relative;
  overflow: hidden;
`;

const AppStyled = styled.div`
  height: 100vh;
  overflow: hidden;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.bg};
  position: relative;

  main {
    flex: 1;
    min-width: 0;
    background: ${({ theme }) => theme.bgMain};
    border: 2px solid ${({ theme }) => theme.borderColor};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    transition: background 0.3s ease, border-color 0.3s ease;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.borderActive};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.textMuted};
    }
  }

  @media (max-width: 900px) {
    main {
      border-radius: 20px;
    }
  }
`;

export default App;
