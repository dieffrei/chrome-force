describe('salesforce api calls', function(){

    const sessionId = '23sadlafslfasdasdfsdd';
    const instanceName = 'cs2';

    beforeEach(inject(function (_$http_, _$q_, _$rootScope_, _$httpBackend_) {
        $http = _$http_;
        $q = _$q_;
        rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    it ('handle calls correctly', function(){

        var api = new ChromeForce.SalesforceApi({
            sessionId: sessionId,
            instanceName: instanceName,
            $q: $q,
            $http: $http
        });

        const path = '/myservice/path';
        const servicePath = api.getServiceEndpoint(path);
        expect(servicePath).toBe("https://cs2.salesforce.com/services/data/v35.0" + path);


        var responseData = null;
        expect(api.callRestApi(path, 'GET').then(function(response){
            responseData = response.data;
        }));

        $httpBackend
            .when('GET', servicePath)
            .respond(200, { foo: 'bar' });

        $httpBackend.flush();

        expect(responseData).not.toBe(null);

    });

});