import React from 'react'
import { View, StatusBar, SafeAreaView, FlatList, ListRenderItem } from 'react-native'
import { NavBar, NotificationListItem } from '../../../components'
import { Text } from '../../../components/atom'
import { TopBar } from '../../../components/Organisms/TopBar'
import Colors from '../../../constants/Colors'
import { Card } from 'native-base'
import { HomeStackNavProps } from '../HomeParamList'
import { useStateContext } from '../../../context/state'
import { NotificationApiModel } from '../../../models/ApiModels/Notifications/NotificationApiModel'

import { useTranslation } from 'react-i18next';
import i18n from "../../../i18n";


export default function NotificationScreen({ navigation }: HomeStackNavProps<"NotificationScreen">) {


    const { t, i18n } = useTranslation();
   
    const { context } = useStateContext()
    const _renderDepositHistory: ListRenderItem<NotificationApiModel> = ({ item, index }) => (
        <NotificationListItem item={item} index={index} />
    )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.common.statusBarColor }}>
            <View style={{ flex: 1, backgroundColor: Colors.common.white }}>


                <StatusBar
                    animated={true}
                    backgroundColor={Colors.common.statusBarColor}
                    barStyle="light-content"
                    showHideTransition="slide"
                />
                <TopBar />
                <NavBar ImageProp="notification" title={t("Notification:TITLE")} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={context.notifications?.notifications}
                        renderItem={_renderDepositHistory}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
