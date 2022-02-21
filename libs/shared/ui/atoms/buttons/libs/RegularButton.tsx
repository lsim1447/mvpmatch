import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  background?: string;
  color?: string;
};

type IButtonProps = {
  background?: string;
  color?: string;
};

export const StyledButton = styled.div<IButtonProps>`
  background: ${(props) => (props.background ? props.background : '#ffffff')};
  border-radius: 5px;
  color: ${(props) => (props.color ? props.color : '#000000')};
  cursor: pointer;
  float: right;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  padding: 8px 10px;
  height: 32px;
  width: 120px;
`;

export const RegularButton = ({
  children,
  onClick,
  background,
  color
}: ButtonProps) => (
  <StyledButton onClick={onClick} background={background} color={color}>
    {children}
  </StyledButton>
);

export default RegularButton;
