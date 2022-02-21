import type { NextPage } from 'next';
import styled from 'styled-components';
import Content from '../libs/shared/ui/layouts/content/Content';
import LateralNav from '../libs/shared/ui/layouts/lateral-nav/LateralNav';

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  padding-top: 50px;
  margin-right: 100px;
`;

const HomePage: NextPage = () => {
  return (
    <PageGrid>
      <LateralNav />
      <Content />
    </PageGrid>
  );
};

export default HomePage;
