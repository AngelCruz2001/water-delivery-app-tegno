


import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'
import { colors } from '../../../config/theme/colors'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenContainer } from './ScreenContainer'


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type Props = PropsWithChildren & {
    startHeight?: number

}

export const BottomSheet = ({ children, startHeight }: Props) => {

    const minTranslateY = -100;
    const translateY = useSharedValue(minTranslateY);
    const opacity = useSharedValue(0);
    const [showScreenBackground, setshowScreenBackground] = useState(false);
    const { top, bottom } = useSafeAreaInsets();
    const context = useSharedValue({ y: 0, opacity: 0 });
    const screenTop = SCREEN_HEIGHT - bottom - (startHeight || 80)
    // const height = SCREEN_HEIGHT - top
    const height = SCREEN_HEIGHT - top
    const maxTranslateY = screenTop - (height - screenTop) - 20
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { opacity: opacity.value, y: translateY.value };
        })
        .onUpdate((e) => {
            const translate = e.translationY + context.value.y
            const translateAbs = Math.abs(translate)

            if (translate > minTranslateY) {
                return
            }

            if (translateAbs > maxTranslateY) {
                return
            }

            const normalizedTranslate = Math.max(0, Math.min(.8, (translateAbs - minTranslateY) / (maxTranslateY - minTranslateY)));
            opacity.value = normalizedTranslate;
            translateY.value = translate;
        })
        .onEnd((e) => {
            const translate = e.translationY + context.value.y;
            const translateAbs = Math.abs(translate)


            if (translateAbs < height / 4) {
                const normalizedTranslate = Math.max(0, Math.min(.8, (0 - minTranslateY) / (maxTranslateY - minTranslateY)));
                opacity.value = withTiming(normalizedTranslate);
                return translateY.value = withTiming(minTranslateY)
            }

            if (translateAbs > height / 5) {
                const normalizedTranslate = Math.max(0, Math.min(.8, (maxTranslateY - minTranslateY) / (maxTranslateY - minTranslateY)));
                opacity.value = withTiming(normalizedTranslate);
                return translateY.value = withTiming(-maxTranslateY)
            }

        })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value
                }
            ],
        }
    })

    const screenStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        }
    })

    return (
        <>
            {/* <Animated.View style={[styles.screen, screenStyle]} /> */}
            <GestureDetector
                gesture={gesture}
            >

                <Animated.View
                    style={[styles.bottomSheetContainer, {
                        top: screenTop,
                        height
                    }, rBottomSheetStyle,]}
                >
                    <View
                        style={styles.line}
                    />

                    <ScreenContainer>
                        {children}
                    </ScreenContainer>
                </Animated.View>
            </GestureDetector>
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        zIndex: 2,
        pointerEvents: 'none',
    },
    bottomSheetContainer: {
        width: '100%',
        backgroundColor: colors.background,
        position: 'absolute',
        borderRadius: 25,
        zIndex: 3,
        shadowColor: colors.textMuted,
        shadowOffset: { width: 0.5, height: -5.27 },
        shadowOpacity: 0.1,
        elevation: 5
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: colors.muted,
        marginTop: 15,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})