/**
 * Created by dieffrei on 10/12/16.
 */

var ChromeForce = ChromeForce || {};

ChromeForce.SalesforceApi = (function(){

    var sessionId, instanceName, $q, $http;

    function ChromeForce(options){
        sessionId = options.sessionId;
        instanceName = options.instanceName;
        $q = options.$q;
        $http = options.$http;
    }

    ChromeForce.prototype.getServiceEndpoint = function(path){
        return "https://" + instanceName + ".salesforce.com/services/data/v35.0" + path;
    };

    ChromeForce.prototype.callRestApi = function(path, method){
        var deferred = $q.defer();
        $http({
            method: method,
            url: this.getServiceEndpoint(path),
            headers: {
                "Authorization": "Bearer " + sessionId
            }
        }).then(function successCallback(response) {
            return deferred.resolve(response);
        }, function errorCallback(response) {
            return deferred.reject(response);
        });
        return deferred.promise;
    };

    return ChromeForce;

})();