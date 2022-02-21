import styled from 'styled-components';

interface IconProps {
  userName: string;
}

const UserIconContainer = styled.span`
  background-color: #f6ca65;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 23px;
  font-weight: 700;
  padding: 8px 7px 8px 8px;
`;

export const UserIcon = ({ userName }: IconProps) => {
  return (
    <UserIconContainer>
      {userName.split(' ')[0][0]}
      {userName.split(' ')[1][0]}
    </UserIconContainer>
  );
};

export default UserIcon;
