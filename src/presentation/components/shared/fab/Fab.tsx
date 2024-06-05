
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { roundedMap } from '../../../../config/theme/globalstyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../../config/theme/colors';

type Props = {
    iconName: string;
    onPress: () => void;

    style?: StyleProp<ViewStyle>
    iconColor?: string;
    iconProvider?: 'FontAwesome' | 'Ionicons'
}

export const FAB = (props: Props) => {
    const { iconName, onPress, style, iconColor = colors.white, iconProvider = 'FontAwesome' } = props;
    return (
        <Pressable onPress={onPress} style={[styles.fab, style]} >
            {iconProvider === 'FontAwesome' ? <Icon name={iconName} size={25} color={iconColor} /> : <IconIon name={iconName} size={25} color={iconColor} />}
        </Pressable>
    )
}


const styles = StyleSheet.create({
    fab: {
        zIndex: 2,
        position: 'absolute',
        height: 50,
        width: 50,
        backgroundColor: colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: roundedMap.full,
        elevation: 5,
        shadowOffset: { width: 0.5, height: 0.27 },
        shadowOpacity: 0.3
    }
})