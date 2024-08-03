import React from "react"
import { TDisplayOrder } from "../../../interfaces/order"
import { useRouteOnView } from "../../hooks/routes/useRouteOnView"
import { Card } from "../shared/Card"
import { DataItem } from "../shared/DataItem"
import { AppText } from '../shared/AppText';
import { ScrollView, View } from "react-native"
import { OrderResume } from '../orders/OrderResume';
import { ScreenScrollContainer } from "../shared/ScreenScrollContainer"


type DataOverviewCardProps = {
    driverId: string
}

export const DataOverviewCard = React.memo(({ driverId }: DataOverviewCardProps) => {

    const { routeOnView } = useRouteOnView(driverId || '');

    return (
        <View style={{ width: '100%', gap: 5 }}>
            <Card
                style={{
                    height: 85,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <DataItem label='Ordenes' value={String(routeOnView?.routeOrders.length)} />
                <DataItem label='Productos' value={String(
                    routeOnView?.routeOrders.reduce((acc, order) => acc + order.totalProducts, 0)
                )} />
                {/* En progreso */}
            </Card>
            {
                routeOnView?.routeOrders.map((order: TDisplayOrder) => (
                    <Card key={order._id}>
                        <DataItem label={order.addressName} value={String(order.totalProducts)} key={order._id} />
                    </Card>
                ))
            }
        </View>
    )
})
