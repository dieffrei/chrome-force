/**
 * Created by dieffrei on 15/01/17.
 */
angular.module('br.com.dieffrei.chromeForce')
    .service('chromeBrowserService', ['$q', function ($q) {

        return {

            getCurrentTab : [function(){
                var deferred = $q.defer();
                chrome.tabs.query({"currentWindow": true}, function (tabs) {
                    try {
                        var activeTab = _.find(tabs, function (it) {
                            return it.active;
                        });
                        deferred.resolve(activeTab);
                    } catch(ex){
                        deferred.reject(ex);
                    }
                });
                return deferred.promise;

            }],

            getCookie: [function(url, name){
                var deferred = $q.defer();
                chrome.cookies.get({
                    url: url,
                    name: sid
                }, function (response) {
                    deferred.resolve(response)
                });
                return deferred.promise;

            }]

        }
    }]);