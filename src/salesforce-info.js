/**
 * Created by dieffrei on 11/01/17.
 */
var ChromeForce = ChromeForce || {};

ChromeForce.SalesforceSessionInfo = (function(){

    function SalesforceSessionInfo(_instanceName_, _sessionId_){
        this.instanceName = _instanceName_;
        this.sessionId = _sessionId_;
    }

    return SalesforceSessionInfo;

})();