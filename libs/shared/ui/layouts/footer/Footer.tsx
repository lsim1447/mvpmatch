import type { NextComponentType } from 'next';
import styled from 'styled-components';

const FooterContainer = styled.div`
  color: #005b96;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin: 22px 0px 22px 100px;
`;

const Footer: NextComponentType = () => {
  return <FooterContainer> Terms&Conditions | Privacy policy </FooterContainer>;
};

export default Footer;
