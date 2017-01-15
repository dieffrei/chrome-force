'use strict';

describe('br.com.dieffrei.chromeForce', function() {

    beforeEach(angular.mock.module('br.com.dieffrei.chromeForce'));


    describe('chromeForceService', function(){

        var standardUrl = 'https://cs12.salesforce.com/';
        var lightningUrl = 'https://cs12.lightning.force.com/one/one.app?source=aloha';
        var visualforceUrl = 'https://c.cs12.visual.force.com/apex/mypage';

        var chromeForceService;

        beforeEach(inject(function (_chromeForceService_) {
            chromeForceService = _chromeForceService_;
        }));

        it ('chromeForceService', function() {
            expect(false).not.toBe(null);
        });

        it('standard ui url', function(){
            expect(chromeForceService.isStandardUi(standardUrl)).toBe(true);
            expect(chromeForceService.isOnSalesforceDomain(standardUrl)).toBe(true);
            expect(chromeForceService.getInstanceName(standardUrl)).toBe('cs12');
        });

        it('lightningUrl url', function(){
            expect(chromeForceService.isLightning(lightningUrl)).toBe(true);
            expect(chromeForceService.isOnSalesforceDomain(lightningUrl)).toBe(true);
            expect(chromeForceService.getInstanceName(lightningUrl)).toBe('cs12');
        });

        it('visualforce url', function(){
            expect(chromeForceService.isVisualforce(visualforceUrl)).toBe(true);
            expect(chromeForceService.isOnSalesforceDomain(visualforceUrl)).toBe(true);
            expect(chromeForceService.getInstanceName(visualforceUrl)).toBe('cs12');

        });

    });

});