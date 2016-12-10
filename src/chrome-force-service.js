/**
 * Created by dieffrei on 08/12/16.
 */
angular.module('chromeForce', [])
    .service('chromeService', function ($q) {

        function isStandardUi(url){
            return (url.indexOf('salesforce.com/') >= 0);
        }

        function isLightning(url){
            return url.indexOf('lightning.force.com/one/one.app') >= 0;
        }

        function isVisualforce(url){
            return url.indexOf('visual.force.com') >= 0;
        }

        function isOnSalesforceDomain(url){
            if (url == null) return false;
            return isLightning(url) || isStandardUi(url) || isVisualforce(url);
        }

        function getInstanceName(url) {
            if (isStandardUi(url) || isLightning(url)){
                return url.split("//")[1].split(/.salesforce/)[0];
            } else if (isVisualforce(url)) {
                return url.split("https://c.")[1].split(".")[0]
            }
        }

        function getRecordId(url){
            if (isStandardUi(url)){
                var values = url.split('/');
                return values[values.length - 1];
            } else if (isLightning(url)) {
                var urlLight = url;
                urlLight = urlLight.split('one.app#/sObject/');
                return urlLight[1].split('/')[0];
            }
        }

        return {

            getSessionId: function(){
                var deferred = $q.defer();
                var that = this;
                try {
                    that.getCurrentTab().then(function(currentTab) {
                        if (currentTab == null){
                            deferred.reject("It's not a salesforce domain.");
                            return deferred.promise;
                        }
                        var currentUrl = currentTab.url;
                        if (isOnSalesforceDomain(currentUrl)){
                            var instanceName = getInstanceName(currentUrl);
                            that.getCookie(instanceName).then(function(cookie){
                                console.info("sf cookie: ", cookie);
                                deferred.resolve([cookie.value, instanceName]);
                            }, function(err){
                                deferred.resolve(err);
                            })
                        } else {
                            deferred.reject("It's not a salesforce domain.");
                            return deferred.promise;
                        }
                    }, function(err){
                        deferred.resolve(ex);
                    });
                } catch(ex) {
                    deferred.resolve(ex);
                }
                return deferred.promise;
            },

            getCookie : function(instanceName){
                var deferred = $q.defer();
                chrome.cookies.get({
                    url: 'https://' + instanceName + '.salesforce.com',
                    name: 'sid'
                }, function(response){
                    deferred.resolve(response)
                });
                return deferred.promise;
            },

            getCurrentTab : function(){
                var deferred = $q.defer();
                chrome.tabs.query({"currentWindow": true}, function (tabs) {  //Tab tab
                    var activeTab = _.find(tabs, function (it) {
                        return it.active;
                    });
                    deferred.resolve(activeTab);
                });
                return deferred.promise;
            }

        }
    });