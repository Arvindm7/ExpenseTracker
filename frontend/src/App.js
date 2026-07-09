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
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { useAuth } from "./context/authContext";

function App() {
  const [active, setActive] = useState(1);
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'
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
        {orbMemo}
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </LoadingScreen>
    );
  }

  // Show auth pages if not logged in
  if (!isAuthenticated) {
    return (
      <AuthWrapper bg={bg}>
        {orbMemo}
        {authView === 'login' ? (
          <Login onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setAuthView('login')} />
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

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
  position: relative;
  overflow: auto;
`;

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    background: ${({ theme }) => theme.bgMain};
    border: 3px solid ${({ theme }) => theme.borderColor};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    transition: background 0.3s ease, border-color 0.3s ease;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  @media (max-width: 900px) {
    main {
      border-radius: 20px;
    }
  }
`;

export default App;
