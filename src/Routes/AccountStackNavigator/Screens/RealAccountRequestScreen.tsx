import { Button } from 'native-base';
import React, { useEffect, useState } from 'react'
import { StatusBar, View, SafeAreaView, FlatList, ListRenderItem } from 'react-native';
import { AccountRequestListItem, NavBar } from '../../../components';
import { Text } from '../../../components/atom';
import { TopBar } from '../../../components/Organisms/TopBar';
import Colors from '../../../constants/Colors';
import { useStateContext } from '../../../context/state';
import { AccountRequestListResponse } from '../../../models';
import { AccountRequestList } from '../../../models/ApiModels/Account/AccountRequestListApiModel';
import ApiCalls from '../../../network/ApiCalls';
import { PostAccountRequest } from '../../../types/post';
import { AccountStackNavProps } from '../AccountParamList';
// TO DO CHECK REAL ACCOUNT REQUEST BUTTONS ACTIVE OR DISABLED 
export default function RealAccountRequestScreen({ navigation }: AccountStackNavProps<"RealAccountRequest">) {
    const { context } = useStateContext()

    const [accountRequests, setaccountRequests] = useState<AccountRequestList[]>()
    useEffect(() => {
        fetchUserAccountRequests()
    }, [])
    const fetchUserAccountRequests = () => {
        ApiCalls.getCustomerAccountRequests(context.user!.customerAccountInfo.customerId).then((response) => {
            if (response instanceof AccountRequestListResponse) {
                setaccountRequests(response.data)
            }
        })
    }
    const _renderDepositHistory: ListRenderItem<AccountRequestList> = ({ item, index }) => (
        <AccountRequestListItem item={item} index={index} />
    )
    const onRealAccountRequest = () => {
        let postAccountRequest : PostAccountRequest = { customerId:context.user!.customerAccountInfo.customerId}
        ApiCalls.postAccountRequest(postAccountRequest).then(fetchUserAccountRequests)
    }
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
                <NavBar ImageProp="analytics" title="Gerçek Hesap Talebi" />
                <View style={{ flex: 1 }}>

                    <Button onPress={onRealAccountRequest} style={{ borderRadius: 5, height: 50, marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 20, backgroundColor: Colors.common.buttonOrange }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}>Gerçek Hesap Talebi Oluştur</Text>

                    </Button>
                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
                        data={accountRequests}
                        renderItem={_renderDepositHistory}
                        keyExtractor={(item) => item.id.toString()}

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
