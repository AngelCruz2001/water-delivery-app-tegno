import React, { useState } from 'react'
import { FlatList, Pressable } from 'react-native'
import { Card } from '../shared/Card'
import { useGetUsers } from '../../hooks/users/useGetUsers';
import { useUserStore } from '../../../store/users/useUserStore';
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle';
import { colors } from '../../../config/theme/colors';
import { TUser } from '../../../interfaces/user';
import { AppText } from '../shared';
import { View } from 'moti';
import DropDownPicker, { ThemeNameType } from 'react-native-dropdown-picker'
import { useTheme } from '@react-navigation/native';
import { fontSizeMap } from '../shared/sizes';

type DriversPickerProps = {
    currentDriverId: string;
    onDriverChange: (driverId: string) => void
}

export const DriversPicker = ({ currentDriverId, onDriverChange }: DriversPickerProps) => {

    const { isLoading, isError, refetch } = useGetUsers();
    const users = useUserStore(state => state.users);
    const drivers = users.filter(user => user.type === 'driver');

    const [show, setShow] = useState(false);

    const [isDirty, setIsDirty] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState(false);
    const [statusValue, setStatusValue] = useState(currentDriverId);

    const [newDriver, setNewDriver] = useState<TUser | null>(null)

    const { dark } = useTheme();

    return (
        <DropDownPicker
            open={show}
            value={statusValue}
            items={drivers.map(item => ({ label: item.name, value: item._id }))}
            setOpen={setShow}
            setValue={setStatusValue}
            setItems={(items) => console.log({ items })}
            onSelectItem={(value) => {
                console.log("value", value);
                console.log("statusValue", statusValue);
                if (value && value.value && value.value !== statusValue) {
                    console.log("value2", value);
                    setStatusValue(value.value);
                    onDriverChange(value.value);
                }
            }}
            theme={dark ? 'DARK' : 'LIGHT' as ThemeNameType}
            placeholder=''
            containerStyle={{
                borderRadius: roundedMap.sm,
                borderColor: isDirty ? colors.warning : isFocused ? colors.primary : error ? 'red' : "",
                zIndex: 10,
                flex: 1,
                
            }}
            style={{
                borderWidth: 0,

            }}

            labelStyle={{
                color: colors.primary, fontWeight: 'bold',
                fontSize: fontSizeMap.md,
                textAlign: 'right',
            }}

            dropDownContainerStyle={{
                borderColor: isDirty ? colors.warning : isFocused ? colors.primary : error ? 'red' : "",
                borderWidth: 0,
                elevation: 5,
            }}
            listItemLabelStyle={{
                borderWidth: 0,

            }}
        />
    )
}
