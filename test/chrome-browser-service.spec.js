/**
 * Created by dieffrei on 15/01/17.
 */
describe('br.com.dieffrei.chromeForce', function() {

    var tabUrl = 'https://cs2.salesforce.com/idofrecord';
    var sessionId = 'sidvalue9394545j';

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


    describe('chromeBrowserService', function() {

        beforeEach(inject(function (_chromeBrowserService_, _$rootScope_) {
            chromeBrowserService = _chromeBrowserService_;
            rootScope = _$rootScope_;
        }));

        it('handling chrome browser methods service', function(){

            expect(chromeBrowserService).not.toBe(null);

            var cookie = null;

            chromeBrowserService.getCookie(tabUrl, 'sid').then(function(_cookie_){
                cookie = _cookie_;
                expect(cookie.value).toBe(sessionId);
            });

            rootScope.$digest();

            chromeBrowserService.getCurrentTab().then(function(tab){
                expect(tab.url).toBe(tabUrl);
            })


        });

    });

});