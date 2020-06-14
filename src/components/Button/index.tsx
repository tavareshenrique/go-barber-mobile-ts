import React from 'react';

import { ButtonProps } from './interfaces';

import { Container, ButtonText } from './styles';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
