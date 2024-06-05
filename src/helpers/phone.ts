import {Alert, Linking} from 'react-native';

export function formatPhoneNumber(number: string) {
  if (number.length !== 10) {
    return number;
  }

  const part1 = number.slice(0, 3);
  const part2 = number.slice(3, 6);
  const part3 = number.slice(6, 10);

  const formattedNumber = `${part1} ${part2} ${part3}`;

  return formattedNumber;
}

export function makeCall(phoneNumber: string) {
  let phoneLink = `tel:${phoneNumber}`;

  Linking.canOpenURL(phoneLink)
    .then(supported => {
      if (!supported) {
        Alert.alert('Error', 'Este dispositivo no puede hacer llamadas');
      } else {
        return Linking.openURL(phoneLink);
      }
    })
    .catch(err => console.error('Error al intentar hacer la llamada', err));
}
