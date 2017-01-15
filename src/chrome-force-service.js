/**
 * Created by dieffrei on 08/12/16.
 */
angular.module('br.com.dieffrei.chromeForce')
    .service('chromeForceService', ['$q', 'chromeBrowserService', function ($q, chromeBrowserService) {

    return {

            isStandardUi: function (url) {
                return (url.indexOf('salesforce.com/') >= 0);
            },

            isLightning: function (url) {
                return url.indexOf('lightning.force.com/one/one.app') >= 0;
            },

            isVisualforce: function(url) {
                return url.indexOf('visual.force.com') >= 0;
            },

            isOnSalesforceDomain: function(url) {
                if (url == null) return false;
                return this.isLightning(url) || this.isStandardUi(url) || this.isVisualforce(url);
            },

            getInstanceName : function(url) {
                if (this.isStandardUi(url)) {
                    return url.split("//")[1].split(/.salesforce/)[0];
                } else if (this.isLightning(url)){
                    return url.split("//")[1].split(/.lightning/)[0]
                } else if (this.isVisualforce(url)) {
                    return url.split("https://c.")[1].split(".")[0]
                }
            },

            getIsOnSalesforceDomain : function () {
                var deferred = $q.defer();
                var that = this;
                this.getCurrentUrl().then(function (url) {
                    deferred.resolve(that.isOnSalesforceDomain(url));
                });
                return deferred.promise;
            },

            getRecordId: function () {
                var deferred = $q.defer();
                var that = this;
                this.getCurrentUrl().then(function (url) {
                    if (that.isStandardUi(url)) {
                        var values = url.split('/');
                        deferred.resolve(values[values.length - 1]);
                    } else if (that.isLightning(url)) {
                        var urlLight = url;
                        urlLight = urlLight.split('#/sObject/');
                        deferred.resolve(urlLight[1].split('/')[0]);
                    }
                });
                return deferred.promise;
            },

            getCurrentUrl: function () {
                var deferred = $q.defer();
                chromeBrowserService.getCurrentTab().then(function (currentTab) {
                    if (currentTab != null){
                        deferred.resolve(currentTab.url);
                    } else {
                        deferred.resolve(null);
                    }
                });
                return deferred.promise;
            },

            getSalesforceInfo: function () {
                var deferred = $q.defer();
                var that = this;
                chromeBrowserService.getCurrentTab().then(function (currentTab) {
                    var currentUrl = currentTab.url;
                    if (that.isOnSalesforceDomain(currentUrl)) {
                        var instanceName = that.getInstanceName(currentUrl);
                        chromeBrowserService.getCookie('https://' + instanceName + '.salesforce.com', 'sid')
                            .then(function (cookie) {
                                var sfSessionInfo = new ChromeForce.SalesforceSessionInfo();
                                sfSessionInfo.sessionId = cookie.value;
                                sfSessionInfo.instanceName = instanceName;
                                deferred.resolve(sfSessionInfo);
                            }, function (err) {
                                deferred.resolve(err);
                            })
                    } else {
                        deferred.reject("It's not a salesforce domain.");
                        return deferred.promise;
                    }
                }, function (err) {
                    deferred.resolve(err);
                });
                return deferred.promise;
            }

        }
    }]);