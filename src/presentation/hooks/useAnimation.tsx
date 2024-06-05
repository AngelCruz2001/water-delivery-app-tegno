// import { useRef } from "react"
// import { Animated, Easing } from "react-native"


// export const useAnimation = () => {

//     const animatedOpacity = useRef(new Animated.Value(0)).current;

//     const fadeIn = ({ duration = 300, toValue = 1, easing = Easing.bounce, callback = () => { } }) => {
//         Animated.timing(animatedOpacity, {
//             toValue: toValue,
//             duration: duration,
//             useNativeDriver: true,
//             easing
//         }).start(callback)
//     }

//     return {
//         animatedOpacity,

//         // Methods
//         fadeIn
//     }
// }
