import { View } from "react-native";
import { Text } from "react-native-svg";
import Toast, { BaseToast, ErrorToast, ToastShowParams } from "react-native-toast-message";
import { colors } from "../../../config/theme/colors";
import { AppText } from "../shared";
import { paddingMap, roundedMap } from "../../../config/theme/globalstyle";
import Icon from "react-native-vector-icons/Ionicons";



export const toastConfig = {
  success: (props: ToastShowParams) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.secondary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props: ToastShowParams) => {

    const { text1 } = props

    return (
      <View
        style={{ minHeight: 40, width: '70%', backgroundColor: colors.red, borderRadius: roundedMap.lg, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', shadowOffset: { width: 0.5, height: 0.27 }, shadowOpacity: 0.3, elevation: 5, paddingHorizontal: paddingMap.verticalCard, paddingVertical: 7, position: 'relative', marginTop: 15 }}>
        <Icon name="ban" size={25} color={colors.white} style={{ position: 'absolute', left: 10 }} />
        <AppText style={{ textAlign: 'center', flex: 1, color: colors.white, maxWidth: '92%', marginLeft: 'auto' }} size="sm" weight="bold" >{text1}</AppText>
      </View>
    )
  },
  createdToast: (props: ToastShowParams & {}) => (
    <View
      style={{ minHeight: 40, width: '70%', backgroundColor: colors.success, borderRadius: roundedMap.lg, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', shadowOffset: { width: 0.5, height: 0.27 }, shadowOpacity: 0.3, elevation: 5, paddingHorizontal: paddingMap.verticalCard, paddingVertical: 7, position: 'relative', marginTop: 15 }}>
      <Icon name="checkmark" size={25} color={colors.white} style={{ position: 'absolute', left: 10 }} />
      <View
        style={{
          maxWidth: '92%',
          marginLeft: 'auto',
          flex: 1,
          paddingLeft: 7,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <AppText style={{ textAlign: 'center', flex: 1, color: colors.white }} size="sm" weight="bold" >{props.text1}</AppText>
        <AppText style={{ textAlign: 'center', flex: 1, color: colors.white }} size="sm" weight="bold" >{props.text2}</AppText>
      </View>
    </View>
  )
};

export const showLoadingToast = (message = 'Cargando...') => {
  Toast.show({
    type: 'loading',
    text1: message,
    visibilityTime: 4000,
  });
}

export const showCreatedToast = (message = 'Cliente registrado') => {
  Toast.show({
    type: 'createdToast',
    text1: message,
  });
}

export const showErrorToast = (message = 'Error al registrar el cliente') => {
  Toast.show({
    type: 'error',
    text1: message,
  });
}
