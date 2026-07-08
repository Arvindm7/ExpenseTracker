import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from './Components/Navigation/Navigation';
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Transactions from "./Components/Transactions/Transactions";

function App() {
  const [active, setActive] = useState(1);

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
