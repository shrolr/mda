const Endpoints = {
    "sites-route": ":5003/api/v1",
    "identity-route": ":5002/api/v1",
    "gateway-route" : ":5001/api/v1/gateway",
    
    "notification-socket-route": ":5001/hubs/notification-user",
  
    "auth": "/login",
    "auth-with-token": "/login/with-token",
    "register": "/security/register",
    "verify-user": "/security/verify-user",
  
    "request-verification-with-email": "/security/request-verification-with-email",
    "restart-validation-user": "/security/restart-validation-user",
    "request-email-validation": "/security/request-email-validation",
    "validate-email": "/security/validate-email",
  
    "forgot-password": "/security/reset-password-request",
    "reset-password": "/security/reset-password",
    "update-password": "/security/update-password",
  
    "site-info": "/sites",
  
    "customer-account": {
      "update-settings": "/customer-account-settings"
    },
  
    "customer": {
      "main": "/customer",
      "upload-picture": "/customer/upload-picture",
      "identifiers": "/customer/identifiers",
      "profile": "/customer/profile"
    },
  
    "deposit": {
      "main": "/deposit",
      "deposit-list": "/deposit/customer",
      "deposit-account": "/deposit-account",
      "customer-deposit-account": "/customer-deposit-account",
      "customer-deposit-account-detail": "/customer-deposit-account-detail",
      "customer-deposit-account-customer": "/customer-deposit-account/customer",
      "graph": "/deposit/graph"
    },
  
    "withdraw": {
      "main": "/withdraw",
      "withdraw-list": "/withdraw/customer",
      "customer-withdraw-account": "/customer-withdraw-account",
      "customer-withdraw-account-detail": "/customer-withdraw-account-detail",
      "customer-withdraw-account-customer": "/customer-withdraw-account/customer",
      "graph": "/withdraw/graph"
    },
  
    "ib": {
      "main": "/ib",
      "graph": "/ib/graph",
      
      "info": "/ib/customer",
      "commission-info": "/ib/commission-info",
      "sub-customers": "/ib/sub-customers",
      "refunds": "/ib/refunds"
    },
  
    "notification": {
      "main": "/notification",
      "info": "/notification/info/customer",
      "customer": "/notification/customer",
      "update-list-status": "/notification/list-status",
      "update-status": "/notification/status"
    },
  
    "account": {
      "main": "/account",
      "graph": "/account/graph",
      "customer": "/account/customer",
      "request": "/account-request",
      "request-customer": "/account-request/customer",
      "status": "/account-status",
      "types": "/account-types",
      "leverages": "/account-leverages",
      "servers": "/account-server-name",
      "trading-platforms": "/account-trading-platform",
      "change-password": "/account/account-password"
    },
  
    "transfer": {
      "main": "/transfer",
      "customer": "/transfer/customer"
    },
  
    "wallet": {
      "main": "/wallet",
      "graph": "/wallet/graph",
      "customer": "/wallet/customer",
      "customer-transactions": "/wallet-transaction/customer"
    }
  }
export default Endpoints