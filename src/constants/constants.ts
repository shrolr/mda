import { Dimensions } from "react-native";

const ScreenWidth =  Dimensions.get("window").width
const AXIOS_ERROR = 0;
const AXIOS_OK = 201;
const SERVER_REQUEST_FAILED = 400;
const SERVER_REGISTER_FAILED = 409;
const AXIOS_NO_DATA = 2;
const screenshotTime = 5;
const ServerLink = "https://albaclient.com:5002/api/v1";
const Authenticated_Server_Link ="https://albaclient.com:5001/api/v1/gateway";
export {AXIOS_ERROR,screenshotTime,AXIOS_OK,AXIOS_NO_DATA,ScreenWidth,ServerLink,SERVER_REQUEST_FAILED,SERVER_REGISTER_FAILED,Authenticated_Server_Link}

