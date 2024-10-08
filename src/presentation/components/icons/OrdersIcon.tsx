


import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { colors } from '../../../config/theme/colors'

export const OrdersIcon = () => {
    return (
        <Svg fill="none" >
            <Path
                stroke={colors.textLight}
                strokeLinecap="round"
                strokeWidth={1.75}
                d="m24.75 7.875-5 2.5m0 0-.625.313L13.5 13.5m6.25-3.125v4.375m0-4.375L7.875 4.125M13.5 13.5 2.25 7.875M13.5 13.5v11.875m4.473-22.648 2.5 1.313c2.688 1.411 4.033 2.116 4.78 3.385C26 8.693 26 10.271 26 13.428v.146c0 3.155 0 4.734-.746 6.001-.748 1.269-2.093 1.975-4.782 3.386l-2.5 1.312C15.777 25.422 14.68 26 13.5 26c-1.18 0-2.277-.575-4.473-1.727l-2.5-1.313c-2.688-1.411-4.033-2.116-4.78-3.385C1 18.308 1 16.729 1 13.575v-.146c0-3.156 0-4.735.746-6.003.748-1.269 2.093-1.975 4.782-3.385l2.5-1.312C11.221 1.576 12.32 1 13.5 1c1.18 0 2.277.575 4.473 1.728Z"
            />
        </Svg>
    )
}

export const OrdersIconSelected = () => {
    return (
        <Svg fill="none" style={{ right: 1 }}>
            <Path
                fill="#fff"
                d="m20.316 3.055-2.512-1.32C15.6.58 14.496 0 13.31 0c-1.185 0-2.288.578-4.494 1.736l-.403.212 11.208 6.405 5.044-2.525c-.812-.92-2.12-1.606-4.349-2.776m5.238 4.439-5.021 2.512v3.813a.942.942 0 1 1-1.885 0v-2.871l-4.396 2.198V25c.902-.225 1.928-.762 3.552-1.615l2.512-1.32c2.702-1.417 4.054-2.126 4.805-3.4.75-1.274.75-2.86.75-6.03v-.146c0-2.378 0-3.865-.317-4.998ZM12.368 25V13.143L1.067 7.491C.75 8.624.75 10.111.75 12.486v.147c0 3.172 0 4.758.75 6.032.751 1.274 2.102 1.984 4.804 3.402l2.512 1.318c1.624.853 2.65 1.39 3.552 1.615ZM1.956 5.83l11.354 5.677 4.285-2.142L6.434 2.987l-.13.068C4.077 4.223 2.767 4.91 1.956 5.83"
            />
        </Svg>
    )
}