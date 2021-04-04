import { Card, Icon, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text } from "react-native";
import { ChartCard, GraphCard } from "../../../components";
import { TopBar } from "../../../components/Organisms/TopBar";
import Colors from "../../../constants/Colors";
import { HomeStackNavProps } from "../HomeParamList";
import { TestComponent } from "../../../test";
import { useStateContext } from "../../../context/state";
import { AccountGraphInfo, DepositGraphInfo, NetworkResponse, WithdrawGraphInfo } from "../../../models";
import ApiCalls from "../../../network/ApiCalls";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../enums";

function HomeScreen({ }: HomeStackNavProps<"Home">) {
  const { t } = useTranslation();

  const { context } = useStateContext()
  const [wthdrawGraph, setwthdrawGraph] = useState<WithdrawGraphInfo>()
  const [depositGraph, setdepositGraph] = useState<DepositGraphInfo>()
  const [accountGraph, setaccountGraph] = useState<AccountGraphInfo>()

  useEffect(() => {
    fetchGraphs()

  }, [])
  const fetchGraphs = () => {

    ApiCalls.getUserWithdrawGraphData(context.user!.customerAccountInfo.customerId).then((response) => {
      if (response instanceof NetworkResponse) {
        let withdrawGraphInfo: WithdrawGraphInfo = response.data;
        setwthdrawGraph(withdrawGraphInfo)
      }
    })

    ApiCalls.getUserDepositGraphData(context.user!.customerAccountInfo.customerId).then((response) => {
      if (response instanceof NetworkResponse) {
        let depositGraphInfo: DepositGraphInfo = response.data;
        setdepositGraph(depositGraphInfo)
      }
    })
    ApiCalls.getUserAccountGraphData(context.user!.customerAccountInfo.customerId).then((response) => {
      if (response instanceof NetworkResponse) {
        let accountGraphInfo: AccountGraphInfo = response.data;
        setaccountGraph(accountGraphInfo)
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
          <ChartCard t={t} accountGraph={accountGraph} />
          <GraphCard t={t} TransactionGraphInfo={context.walletInfo?.transactionGraphInfo} balance={context.walletInfo ? context.walletInfo.wallet.balance : 0} title={t(Locales.Wallet + ":TITLE")} colorActive={Colors.common.cardHeader} color={Colors.common.walletBar} />
          {
            depositGraph && <GraphCard t={t} TransactionGraphInfo={depositGraph} balance={depositGraph?.data.length > 0 ? depositGraph?.data.reduce((prevValue, currentValue) => prevValue + currentValue) : 0} title={t(Locales.Tranactions + ":DEPOSITS")} colorActive={Colors.common.cardHeaderAlt} color={Colors.common.depositBar} />

          }
          {
            wthdrawGraph && <GraphCard t={t} TransactionGraphInfo={wthdrawGraph} balance={wthdrawGraph?.data.length > 0 ? wthdrawGraph?.data.reduce((prevValue, currentValue) => prevValue + currentValue) : 0} title={t(Locales.Tranactions + ":WITHDRAWS")} colorActive={Colors.common.cardHeaderAlt2} color={Colors.common.withdrawBar} />
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;
