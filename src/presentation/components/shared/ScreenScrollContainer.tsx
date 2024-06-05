

import { PropsWithChildren, useState } from 'react'
import { StyleProp, ViewStyle, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native'
import { paddingMap } from '../../../config/theme/globalstyle'
import { RefreshControl } from 'react-native-gesture-handler'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'


type Props = PropsWithChildren & {
    style?: StyleProp<ViewStyle>
    onRefresh?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}

export const ScreenScrollContainer = ({ children, style, onRefresh }: Props) => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefreshHandler = async () => {
        setIsRefreshing(true);
        if (onRefresh) {
            await onRefresh()
        }
        setIsRefreshing(false);
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                paddingBottom: 20
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefreshHandler}
                    // progressViewOffset={top}
                    />
                }
                style={[{
                    // marginTop: 20,
                    paddingHorizontal: paddingMap.horizontalContainer,
                    paddingTop: paddingMap.verticalContainer,
                }, style]}>
                <View style={{ height: 20 }} />
                {children}
                <View style={{ height: 100 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
