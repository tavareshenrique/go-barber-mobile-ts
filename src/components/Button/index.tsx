import React from 'react';

import { ButtonProps } from './interfaces';

import { Container, ButtonText } from './styles';

const Button: React.FC<ButtonProps> = ({
  children,
  containerStyle = {},
  color = '#ff9000',
  fontColor = '#312e38',
  ...rest
}) => (
  <Container style={containerStyle} color={color} {...rest}>
    <ButtonText fontColor={fontColor}>{children}</ButtonText>
  </Container>
);

export default Button;
