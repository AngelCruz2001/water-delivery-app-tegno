



import React, { useMemo, useState } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { AppButton, AppText } from '../../components/shared'
import { ScreenContainer } from '../../components/shared/ScreenContainer'
import { Card } from '../../components/shared/Card'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { formatDate } from '../../../helpers/date'
import { FlatList, View } from 'react-native'
import { colors } from '../../../config/theme/colors'
import { useSalesStore } from '../../../store/sales/useSalesStore'
import { useGetSales } from '../../hooks/sales/useGetSales'
import { paddingMap } from '../../../config/theme/globalstyle'
import { parsePrice } from '../../../helpers/price'
import { DataItem } from '../../components/shared/DataItem'
import { es } from 'date-fns/locale'

export const SalesScreen = () => {

    const [selectedDate, setSelectedDate] = useState<DateType>(dayjs());
    const [isSelecting, setIsSelecting] = useState(false);
    const { isLoading, isError } = useGetSales(selectedDate?.toString() || '');
    const sales = useSalesStore(state => state.sales);
    const totalSales = useMemo(() => sales.reduce((acc, sale) => acc + sale.total, 0), [sales])

    return (
        <ScreenContainer
            style={{
                gap: 20
            }}
        >
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
                <View
                >
                    <AppText>
                        Viendo resultados del
                    </AppText>
                    <AppText
                        weight='bold'
                        style={{
                            marginTop: 5
                        }}
                    >
                        {formatDate(new Date(selectedDate?.toString() || ''))}
                    </AppText>
                </View>
                <AppButton
                    onPress={() => setIsSelecting(!isSelecting)}
                    style={{
                        backgroundColor: isSelecting ? colors.red : colors.primary,
                    }}
                >
                    {isSelecting ? 'cancelar' : 'cambiar fecha'}
                </AppButton>
            </View>
            {

                isSelecting && (
                    <Card>
                        <DateTimePicker
                            locale={'es'}
                            mode="single"
                            date={selectedDate}
                            onChange={(params) => {
                                setSelectedDate(params.date)
                                setIsSelecting(false)
                            }}
                        />
                    </Card>
                )
            }

            <FlatList
                data={sales}
                style={{
                    flex: .5,
                    // marginBottom: 10,
                    padding: 5,
                }}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            marginBottom: 15,
                            paddingVertical: 15
                        }}
                    >
                        <AppText
                            style={{
                                marginBottom: 10
                            }}
                        >
                            {item.clientAddress}
                        </AppText>

                        {
                            item.products.map(product => (
                                <DataItem
                                    key={product.name}
                                    label={product.name}
                                    value={String(product.quantity)}
                                />
                            ))
                        }

                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                gap: 5,
                                alignSelf: 'flex-end'
                            }}
                        >
                            <AppText>
                                Total
                            </AppText>
                            <AppText
                                weight='bold'
                                style={{

                                }}
                            >
                                ${parsePrice(item.total)}
                            </AppText>

                        </View>

                    </Card>
                )}
            />
            <View
                style={{
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <AppText
                    style={{
                        color: colors.primaryDark
                    }}
                >
                    Total de ventas
                </AppText>
                <AppText
                    weight='bold'
                    style={{
                        color: colors.primary
                    }}
                    size='lg'
                >
                    ${parsePrice(totalSales)}
                </AppText>
            </View>
        </ScreenContainer>
    )
}
