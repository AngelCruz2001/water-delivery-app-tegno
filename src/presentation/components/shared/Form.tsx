


import { View, ViewStyle } from "react-native"

import { AppText } from "./AppText"
import { AppButton } from "./AppButton";



type FormProps = {
    // onSubmit: (data: any) => void;
    children: React.ReactNode;
    style?: ViewStyle;
    buttons?: React.ReactNode;
}


export default function Form({ children, style, buttons }: FormProps) {

    return (
        <View style={[{
            gap: 15,
            rowGap: 15,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
        }, style]} >
            {children}
            <View
                style={{
                    marginTop: 5,
                    width: '100%',
                }}
            >
                {buttons}
            </View>
        </View>
    )
}

