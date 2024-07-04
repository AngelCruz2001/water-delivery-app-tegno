


import { TUser, userTypeMap } from '../../../interfaces/user'
import { colors } from '../../../config/theme/colors'
import { Card } from '../shared/Card'
import { AppText } from '../shared'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ClientStackProps } from '../../../navigation/clients/ClientsStackNavigator'
import { Pressable } from 'react-native'

type Props = {
    user: TUser
}

export const DisplayUser = (props: Props) => {

    const { user } = props;
    const { _id, createdAt, name, username, type } = user;

    const color = type === 'admin' ? colors.primary : type === 'driver' ? colors.warning : colors.success

    const navigation = useNavigation<NavigationProp<ClientStackProps>>()

    return (
        <Pressable>
            <Card
                style={{
                    width: '100%',
                    height: 100,
                    justifyContent: 'center',
                    marginBottom: 10
                }}
            >
                <AppText
                    weight='bold'
                >
                    {user.name}
                </AppText>
                <AppText
                    size='sm'
                >
                    {username}
                </AppText>
                <AppText
                    size='sm'
                    weight='bold'
                    style={{
                        alignSelf: 'flex-end',
                        color,
                        textTransform: 'uppercase',
                        marginTop: 5
                    }}>
                    {userTypeMap[type]}
                </AppText>
            </Card>
        </Pressable>
    )
}