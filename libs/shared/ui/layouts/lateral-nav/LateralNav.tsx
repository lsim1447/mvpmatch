import type { NextComponentType } from 'next';
import {
  MenuItem1,
  MenuItem2,
  MenuItem3,
  MenuItem4,
  MenuItem5
} from '../../atoms/icons';
import styled from 'styled-components';

const LateralNavContainer = styled.div`
  min-height: 800px;
`;

const MenuItemContainer = styled.div`
  padding-bottom: 24px;
  text-align: center;
`;

const LateralNav: NextComponentType = () => {
  return (
    <LateralNavContainer>
      <MenuItemContainer>
        <MenuItem1 />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem2 />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem3 />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem4 />
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItem5 />
      </MenuItemContainer>
    </LateralNavContainer>
  );
};

export default LateralNav;
