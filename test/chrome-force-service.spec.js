'use strict';

describe('br.com.dieffrei.chromeForce', function() {

    const recordId = 'idofrecord';
    const instanceName = 'na12';
    const tabUrl = 'https://' + instanceName + '.salesforce.com/' + recordId;
    const sessionId = 'sidvalue9394545j';

    beforeEach(angular.mock.module('br.com.dieffrei.chromeForce'));

    beforeEach(module(function($provide) {
        $provide.service('chromeBrowserService', function($q) {
            this.getCurrentTab = jasmine.createSpy('getCurrentTab').and.callFake(function() {
                return $q.when({url: tabUrl});
            });
            this.getCookie = jasmine.createSpy('getCookie').and.callFake(function() {
                return $q.when({value: sessionId});
            });
        });
    }));


    beforeEach(angular.mock.module('br.com.dieffrei.chromeForce'));

    describe('chromeForceService', function(){

        var standardUrl = 'https://' + instanceName + '.salesforce.com/';
        var lightningUrl = 'https://' + instanceName + '.lightning.force.com/one/one.app?source=aloha';
        var visualforceUrl = 'https://c.' + instanceName + '.visual.force.com/apex/mypage';

        var chromeForceService, rootScope;

        beforeEach(inject(function (_chromeForceService_, _$rootScope_) {
            chromeForceService = _chromeForceService_;
            rootScope = _$rootScope_;
        }));

        it ('chromeForceService', function() {
            expect(false).not.toBe(null);
        });

        it('standard ui url', function(){
            expect(chromeForceService.isStandardUi(standardUrl)).toBe(true);
            expect(chromeForceService.isOnSalesforceDomain(standardUrl)).toBe(true);
            expect(chromeForceService.getInstanceName(standardUrl)).toBe(instanceName);
        });

        it('lightningUrl url', function(){
            expect(chromeForceService.isLightning(lightningUrl)).toBe(true);
            expect(chromeForceService.isOnSalesforceDomain(lightningUrl)).toBe(true);
            expect(chromeForceService.getInstanceName(lightningUrl)).toBe(instanceName);
        });

        it('visualforce url', function(){
            expect(chromeForceService.isVisualforce(visualforceUrl)).toBe(true);
            expect(chromeForceService.isOnSalesforceDomain(visualforceUrl)).toBe(true);
            expect(chromeForceService.getInstanceName(visualforceUrl)).toBe(instanceName);
        });

        it('test maing methods', function(){

            var url = null;

            chromeForceService.getCurrentUrl().then(function(_url_){
                url = _url_;
            });
            rootScope.$digest();
            expect(url).toBe(tabUrl);

            chromeForceService.getRecordId().then(function(recordId){
                expect(recordId).toBe(recordId);
            });
            rootScope.$digest();

            chromeForceService.getSalesforceInfo().then(function(sessionInfo){
                expect(sessionInfo.sessionId).toBe(sessionId);
                expect(sessionInfo.instanceName).toBe(instanceName);
            });
            rootScope.$digest();

            var insOnSf;
            chromeForceService.getIsOnSalesforceDomain().then(function(_isOnSf_){
                insOnSf = _isOnSf_;
            });
            rootScope.$digest();
            expect(insOnSf).toBe(true);

        });

    });

});