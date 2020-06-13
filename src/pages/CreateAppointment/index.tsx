import React, { useEffect, useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '~/hooks/auth';

import api from '~/services/api';

import scissorImg from '~/assets/scissor.png';

import { RouteParams, Provider } from './interfaces';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDayPickerButton,
  OpenDatePickerButtonText,
} from './styles';

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const { goBack } = useNavigation();

  const { user } = useAuth();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleNavigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback((providerIdd: string) => {
    setSelectedProvider(providerIdd);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(oldValue => !oldValue);
  }, []);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              {provider.avatar_url ? (
                <ProviderAvatar
                  source={{
                    uri: provider.avatar_url,
                  }}
                />
              ) : (
                <ProviderAvatar source={scissorImg} />
              )}

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a Data</Title>

        <OpenDayPickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar Outra Data
          </OpenDatePickerButtonText>
        </OpenDayPickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            textColor="#f4ede8"
            value={selectedDate}
            onChange={handleDateChange}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
