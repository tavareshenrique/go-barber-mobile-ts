import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { ContainerProps, ButtonProps } from './interfaces/styles';

export const Container = styled(RectButton)<ContainerProps>`
  height: 60px;
  background: ${({ color }) => color};
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-family: 'RobotoSlab-Medium';
  color: ${({ fontColor }) => fontColor};
  font-size: 18px;
`;
