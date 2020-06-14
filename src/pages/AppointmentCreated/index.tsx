import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, Confirm, ConfirmText } from './styles';

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const handleConfirmPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento Concluído</Title>
      <Description>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur,
        in.
      </Description>

      <Confirm onPress={handleConfirmPressed}>
        <ConfirmText>Ok</ConfirmText>
      </Confirm>
    </Container>
  );
};

export default AppointmentCreated;
