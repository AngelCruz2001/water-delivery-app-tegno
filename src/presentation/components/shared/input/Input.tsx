





import { View, TextInput, ViewStyle, StyleProp } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldError, FieldErrorsImpl, Merge, RegisterOptions } from 'react-hook-form'
import { fontSizeMap } from '../sizes';
import { colors } from '../../../../config/theme/colors';
import { AppText } from '../AppText';
import { inputSizeMap, roundedMap } from '../../../../config/theme/globalstyle';
import Icon from 'react-native-vector-icons/FontAwesome';


export type InputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    control: Control<any, any>;
    editable?: boolean;
    rules: Omit<
        RegisterOptions<Record<string, any>>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    accessoryLeft?: string;
    contrast?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
    autoCorrect?: boolean,
    textContentType?: "none" | "name" | "URL" | "addressCity" | "addressCityAndState" | "addressState" | "countryName" | "creditCardNumber" | "creditCardExpiration" | "creditCardExpirationMonth",
    keyboardType?: "default" | 'numeric' | 'email-address' | "ascii-capable" | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'phone-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password',
    isPassword?: boolean
    initialValue?: string
    isDirty?: boolean,
    size?: 'sm' | 'md' | 'lg',
    grow?: boolean;
    constainerStyle?: StyleProp<ViewStyle>
}


export const Input = (props: InputProps) => {

    const {
        name,
        label,
        placeholder,
        control,
        editable,
        rules,
        error,
        accessoryLeft,
        contrast,
        autoCapitalize = 'none',
        autoCorrect = false,
        textContentType = 'none',
        keyboardType = 'default',
        isPassword = false,
        initialValue = '',
        isDirty = false,
        size = 'lg',
        grow = true,
        constainerStyle = {}
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[{
            gap: 5,
            width: inputSizeMap[size],
            flexGrow: grow ? 1 : 0,
        }, constainerStyle]} >
            {label &&
                <AppText style={{
                    fontWeight: 'bold',
                }}>{label}</AppText>
            }
            <View
                style={{
                    backgroundColor: contrast ? colors.white : colors.background,
                    borderRadius: roundedMap.sm,
                    paddingHorizontal: accessoryLeft ? 10 : 12,
                    borderWidth: 2,
                    borderColor: isDirty ? colors.warning : isFocused ? colors.primary : error ? 'red' : 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 5,
                    shadowColor: colors.textMuted,
                    shadowOffset: { width: 0.5, height: 0.27 },
                    shadowOpacity: 0.3,
                    elevation: 5
                }}
            >
                {accessoryLeft && (
                    <Icon
                        name={accessoryLeft}
                        size={17}
                        color={colors.primary}
                    />
                )}
                <Controller
                    control={control}
                    rules={rules}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            secureTextEntry={isPassword}
                            style={{
                                fontSize: fontSizeMap.base,
                                flex: 1,
                                paddingVertical: 10,
                                color: colors.text
                            }}
                            textContentType={textContentType}
                            placeholder={placeholder}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setIsFocused(false);
                                onBlur();
                            }}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            editable={!editable}
                            keyboardType={keyboardType}
                        />
                    )}
                    name={name}
                />
            </View>
            {error && typeof error === 'string' && (
                <AppText
                    style={{ color: 'red', marginBottom: 10 }}
                    size='sm'
                >{error}
                </AppText>
            )}
        </View>


    )
}
