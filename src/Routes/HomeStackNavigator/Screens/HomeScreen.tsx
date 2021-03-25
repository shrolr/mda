import { Card, Icon, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text } from "react-native";
import { ChartCard, GraphCard } from "../../../components";
import { TopBar } from "../../../components/Organisms/TopBar";
import Colors from "../../../constants/Colors";
import { HomeStackNavProps } from "../HomeParamList";
import { TestComponent } from "../../../test";
import { useStateContext } from "../../../context/state";
import { DepositGraphInfo, NetworkResponse, WithdrawGraphInfo } from "../../../models";
import ApiCalls from "../../../network/ApiCalls";

function HomeScreen({ }: HomeStackNavProps<"Home">) {
  const { context } = useStateContext()
  const [wthdrawGraph, setwthdrawGraph] = useState<WithdrawGraphInfo>()
  const [depositGraph, setdepositGraph] = useState<DepositGraphInfo>()

  useEffect(() => {
    fetchGraphs()

  }, [])
  const fetchGraphs = () => {
    -
      ApiCalls.getUserWithdrawGraphData(context.user!.customerAccountInfo.customerId).then((response) => {
        if (response instanceof NetworkResponse) {
          let withdrawGraphInfo: WithdrawGraphInfo = response.data;
          setwthdrawGraph(withdrawGraphInfo)
        }
      })

    ApiCalls.getUserDepositGraphData(context.user!.customerAccountInfo.customerId).then((response) => {
      if (response instanceof NetworkResponse) {
        console.log(response.data)
        let depositGraphInfo: DepositGraphInfo = response.data;
        setdepositGraph(depositGraphInfo)
      }
    })

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
        <TestComponent />
        <ScrollView style={{ flex: 1 }}>
          <ChartCard />
          <GraphCard TransactionGraphInfo={context.walletInfo.length > 0 ? context.walletInfo[0].transactionGraphInfo : undefined} balance={context.walletInfo.length > 0 ? context.walletInfo[0].wallet.balance : 0} title="Cüzdan" colorActive={Colors.common.cardHeader} color={Colors.common.walletBar} />
          <GraphCard TransactionGraphInfo={depositGraph} balance={depositGraph ? depositGraph?.data.reduce((prevValue, currentValue) => prevValue + currentValue) : 0} title="Yatırımlar" colorActive={Colors.common.cardHeaderAlt} color={Colors.common.depositBar} />
          <GraphCard TransactionGraphInfo={wthdrawGraph} balance={wthdrawGraph ? wthdrawGraph?.data.reduce((prevValue, currentValue) => prevValue + currentValue) : 0} title="Çekimler" colorActive={Colors.common.cardHeaderAlt2} color={Colors.common.withdrawBar} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;
