import { StackNavigationProp } from "@react-navigation/stack";
import { NetworkResponse } from "../models";
import { AuthParamList } from "../Routes/AuthStackNavigator/AuthParamList";
import { Action, ActionType } from "./reducer";

class ActionHelper {

    setLogin = async (email: string, password: string, dispatch: React.Dispatch<Action>, callBack: (response: NetworkResponse) => void, navigation?: StackNavigationProp<AuthParamList, "Login">) => {
       
    }



    register = async (username: string, password: string, email: string, dispatch: React.Dispatch<Action>, callBack: (response: NetworkResponse) => void, navigation: StackNavigationProp<AuthParamList, "Register">) => {

        
    }


}

export default new ActionHelper();