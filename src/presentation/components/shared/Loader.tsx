



import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../config/theme/colors'
import { Card } from './Card'
import { AppText } from './AppText'
import { useUiStore } from '../../../store/ui/useUiStore'

type Props = {}

export const Loader = (props: Props) => {
    const loadingText = useUiStore(state => state.loadingText)
    return (
        <View
            style={styles.container}
        >
            <Card
                style={{
                    width: 400,
                    maxWidth: '50%',
                    height: 250,
                    maxHeight: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20
                }}
            >
                <ActivityIndicator color={colors.primary} size={'large'} />
                <AppText
                    weight='bold'
                >
                    {loadingText}
                </AppText>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    }
})