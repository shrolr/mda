import { Dimensions } from "react-native";

const ScreenWidth =  Dimensions.get("window").width
const AXIOS_ERROR = 0;
const AXIOS_OK = 201;
const SERVER_AUTH_FAILED = 401;
const SERVER_REGISTER_FAILED = 409;
const AXIOS_NO_DATA = 2;
const screenshotTime = 5;
const ServerLink = "https://40.85.120.216:5002/api/v1/";
export {AXIOS_ERROR,screenshotTime,AXIOS_OK,AXIOS_NO_DATA,ScreenWidth,ServerLink,SERVER_AUTH_FAILED,SERVER_REGISTER_FAILED}

