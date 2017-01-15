/**
 * Created by dieffrei on 10/12/16.
 */

var ChromeForce = ChromeForce || {};

ChromeForce.SalesforceApi = (function(){

    var _sessionId, _instanceName, _$q, _$http;

    function ChromeForce(sessionId, instanceName, $q, $http){
        _sessionId = sessionId;
        _instanceName = instanceName;
        _$q = $q;
        _$http = $http;
    }

    ChromeForce.prototype.callRestApi = function(url, method){
        var deferred = _$q.defer();
        _$http({
            method: method,
            url: "https://" + _instanceName + ".salesforce.com/services/data/v35.0" + url,
            headers: {
                "Authorization": "Bearer " + _sessionId
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