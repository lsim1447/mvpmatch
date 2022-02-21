import type { NextComponentType } from 'next';
import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../utils/context/UserContext';
import { Logo, Hamburger, UserIcon } from '../../atoms/icons';

const NavContainer = styled.div`
  border-bottom: 2px solid #f3f6f9;
  padding: 21px 100px 19px 35px;
`;

const NavRightContainer = styled.div`
  float: right;
  margin-top: 9px;
  text-align: right;
`;

const UserName = styled.span`
  color: #005b96;
  font-size: 16px;
  font-weight: 700;
  margin-left: 11px;
`;

const getFullName = (firstName: string, lastName: string): string => {
  return firstName + ' ' + lastName;
};

const Header: NextComponentType = () => {
  const { users } = useContext(UserContext);

  return (
    <NavContainer>
      <Logo />
      <Hamburger />
      <NavRightContainer>
        <UserIcon
          userName={
            users?.length
              ? getFullName(users[0].firstName, users[0].lastName)
              : 'Szilard Lazar'
          }
        />
        <UserName>
          {users?.length
            ? getFullName(users[0].firstName, users[0].lastName)
            : 'Szilard Lazar'}
        </UserName>
      </NavRightContainer>
    </NavContainer>
  );
};

export default Header;
