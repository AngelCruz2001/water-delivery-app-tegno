



import React from 'react'
import { Pressable, View } from 'react-native';
import { colors } from '../../../config/theme/colors';
import { paddingMap } from '../../../config/theme/globalstyle';
import { AppText } from '../shared/AppText';
import { TDisplayClient } from '../../../interfaces/clients';
import { AppButton } from '../shared/AppButton';
import { formatPhoneNumber } from '../../../helpers/phone';
import { useClientsStore } from '../../../store/clients/useClientsStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ClientStackProps } from '../../../navigation/clients/ClientsStackNavigator';
import { Card } from '../shared/Card';


type Props = {
    isLast?: boolean,
    client: TDisplayClient
}

export const DisplayClient = ({ isLast, client, client:
    { _id, name, phoneNumber, businessName, addressId, createdAt }
}: Props) => {

    const navigation = useNavigation<NavigationProp<ClientStackProps>>();

    const setClientToEditAddress = useClientsStore(state => state.setSpecificClient);

    return (
        <Pressable
            style={{
                backgroundColor: colors.white,
                width: '100%',
                marginBottom: isLast ? 0 : 8
            }}
            onPress={() => {
                if (!client.address) {
                    setClientToEditAddress({
                        _id,
                        name,
                        phoneNumber,
                        businessName,
                        createdAt,
                        registeredById: client.registeredById,
                        registeredByName: client.registeredByName,
                    });
                    return navigation.navigate('Registar Dirección', { id: _id })
                };
                navigation.navigate('Cliente', { client })
            }}
        >
            <Card
                style={{
                    paddingHorizontal: paddingMap.horizontalCard,
                    paddingVertical: paddingMap.verticalCard,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    gap: 5,
                }}>
                    <View style={{ gap: 2, justifyContent: 'space-between' }}>
                        <AppText weight='bold'>
                            {businessName}
                        </AppText>
                        <AppText size='sm' style={{ color: colors.primary }}>
                            {name}
                        </AppText>

                    </View>
                    <View
                        style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: 1,
                        }}
                    // onPress={() => {
                    //     makeCall(phoneNumber)
                    // }}
                    >
                        <AppText weight='bold' style={{ color: colors.primary }}>
                            {formatPhoneNumber(phoneNumber)}
                        </AppText>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'flex-end', marginTop: 5 }}>
                    {!addressId && (
                        <AppButton
                            size='sm' style={{ backgroundColor: colors.secondary }}
                            onPress={() => {
                                setClientToEditAddress({
                                    _id,
                                    name,
                                    phoneNumber,
                                    businessName,
                                    createdAt,
                                    registeredById: client.registeredById,
                                    registeredByName: client.registeredByName,
                                });
                                navigation.navigate('Registar Dirección', { id: _id })
                            }}
                        >
                            Registrar ubicación
                        </AppButton>
                    )}
                </View>
            </Card>
        </Pressable>
    )
}
