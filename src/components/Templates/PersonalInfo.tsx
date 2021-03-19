import { Button, Card, Input, Item, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useStateContext } from '../../context/state';
import { NetworkResponse } from '../../models';
import ApiCalls from '../../network/ApiCalls';
import { PersonalInfoUpdateRequest } from '../../types/post/PersonalInfoUpdateRequest';
import { Text } from '../atom';

interface IPersonalInfo {

}

export const PersonalInfo: React.FC<IPersonalInfo> = () => {
    const { context } = useStateContext()
    const [isLoading, setLoading] = useState(false);

    const [isEditing, setisEditing] = useState(false)
    const [firstNameInput, setFirstNameInput] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [zipcodeInput, setZipCodeInput] = useState("");
    const [addressInput, setAddressInput] = useState("");

    const [lastNameInputError, setLastNameInputError] = useState(false);
    const [firstNameInputError, setFirstNameInputError] = useState(false);
    useEffect(() => {
        setFirstNameInput(context.user!.customerInfo.firstName);
        setLastNameInput(context.user!.customerInfo.lastName);
        setCountryInput(context.user!.customerInfo.country || "");
        setStateInput(context.user!.customerInfo.state || "");
        setCityInput(context.user!.customerInfo.city || "");
        setZipCodeInput(context.user!.customerInfo.zipCode || "");
        setAddressInput(context.user!.customerInfo.address || "");
    }, [context.user!.customerInfo]);
    const onEditClick = () => {
        setisEditing(true)
    }

    const clearInputs = () => {
        setCountryInput("");
        setStateInput("");
        setFirstNameInput("");
        setCityInput("");
        setZipCodeInput("");
        setAddressInput("");
        setLastNameInput("");

        setLastNameInputError(false);
        setFirstNameInputError(false);
    }
    const cancelEditing = () => {
        setisEditing(false)
    }
    const validateInputs = () => {
        if (lastNameInput === "") {
            setLastNameInputError(true);
            // TO DO 
            // toast last name input error
            return false;
        }

        if (firstNameInput === "") {
            setFirstNameInputError(true);
            // toast first name input error
            return false;
        }

        return true;
    }
    const onUpdateUserInfo = () => {
        // TO DO handle UpdateUserInfo
        if (validateInputs()) {
            let personalInfoUpdateRequest: PersonalInfoUpdateRequest = { address: addressInput, zipcode: zipcodeInput, city: cityInput, country: countryInput, firstName: firstNameInput, lastName: lastNameInput, state: stateInput }
            setLoading(true);
            ApiCalls.updateUserProfile(personalInfoUpdateRequest, context.user!.customerAccountInfo.customerId).then((response) => {
                if (response instanceof NetworkResponse) {
                    console.log("succes")
                    // RE auth
                }
                else {
                    // TO DO SHOW ERROR
                    console.log("fail")
                }
                setLoading(false);
                setisEditing(false)
                clearInputs();
            })

        }
    }

    return (
        <Card style={{ marginLeft: 20, marginTop: 15, paddingBottom: 40, marginRight: 20, borderRadius: 10, overflow: "hidden" }}>
            <View style={{ paddingLeft: 20, height: 40, backgroundColor: Colors.common.walletHeader, alignItems: "center", flexDirection: "row" }}>
                <Text style={{ flex: 1, textAlign: "left", color: Colors.common.white, fontWeight: "bold", fontSize: 18 }}>{"Kişisel Bilgiler"}</Text>
            </View>

            {
                !isEditing &&
                <TouchableOpacity onPress={onEditClick} style={{ alignItems: "center", marginRight: 20, marginLeft: 20, flexDirection: "row", height: 40, backgroundColor: "#F7F7F6", marginTop: 20 }}>
                    <View style={{ height: 40, width: 50, backgroundColor: "#E5E5E5", alignItems: "center", justifyContent: "center" }}>
                        <Image source={require("../../../assets/images/icons/user-circle-regular.png")} resizeMode="contain" style={{ tintColor: "black", height: 20, width: 20 }} />
                    </View>
                    <Text style={{ marginLeft: 20, flex: 1, fontWeight: "bold" }}>{context.user?.customerAccountInfo.displayName}</Text>
                    <Image source={require("../../../assets/images/icons/edit.png")} resizeMode="contain" style={{ marginRight: 20, height: 13, width: 13 }} />
                </TouchableOpacity>
            }
            { !isLoading && isEditing &&
                <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <Item error={firstNameInputError} style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setFirstNameInput(text)} defaultValue={context.user?.customerInfo.firstName} autoCapitalize="none" autoCorrect={false} placeholder='Adınız' />
                    </Item>
                    <Item error={lastNameInputError} style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setLastNameInput(text)} defaultValue={context.user?.customerInfo.lastName} autoCapitalize="none" autoCorrect={false} placeholder='Soyadınız' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setCountryInput(text)} defaultValue={context.user?.customerInfo.country} autoCapitalize="none" autoCorrect={false} placeholder='Ülke' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setStateInput(text)} defaultValue={context.user?.customerInfo.state} autoCapitalize="none" autoCorrect={false} placeholder='Bölge' />
                    </Item>

                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setCityInput(text)} defaultValue={context.user?.customerInfo.city} autoCapitalize="none" autoCorrect={false} placeholder='Şehir' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setZipCodeInput(text)} defaultValue={context.user?.customerInfo.zipCode} autoCapitalize="none" autoCorrect={false} placeholder='Posta kodu' />
                    </Item>
                    <Item style={{ height: 43, paddingLeft: 10, borderRadius: 5, marginTop: 30 }} rounded>
                        <Input onChangeText={(text) => setAddressInput(text)} defaultValue={context.user?.customerInfo.address} autoCapitalize="none" autoCorrect={false} placeholder='Adres' />
                    </Item>
                </View>
            }

            {
                !isLoading && isEditing &&
                <View style={{ marginTop: 10,paddingRight: 20, paddingLeft: 20 }}>
                    <Button onPress={onUpdateUserInfo} style={{   borderRadius: 5, height: 44,  marginBottom: 10, marginTop: 10, backgroundColor: Colors.common.loginButton }} full>
                        <Text style={{ color: Colors.common.white, fontWeight: "bold", fontSize: 14 }}> GÜNCELLE</Text>
                    </Button>
                    <Button onPress={cancelEditing} style={{   borderRadius: 5, height: 44,   marginBottom: 10, marginTop: 10, backgroundColor: Colors.common.buttonMistyRose }} full>
                        <Text style={{ color: Colors.common.orangered, fontWeight: "bold", fontSize: 14 }}>İPTAL</Text>
                    </Button>

                </View>
            }
            {
                isLoading && <Spinner />
            }


        </Card>
    )


};