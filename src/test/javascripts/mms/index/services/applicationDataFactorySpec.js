describe("mms.index module", function() {

    beforeEach(angular.mock.module('mms', function($provide) {
        $provide.constant('contextPath', '/mms');
    }));

    describe('applicationDataFactory', function() {
        var applicationDataFactory, $httpBackend;

        beforeEach(angular.mock.inject(function(_applicationDataFactory_, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            applicationDataFactory = _applicationDataFactory_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should get application data on .get()", function() {
            function headerValidation(headers) {
                return headers["X-Requested-With"] == "XMLHttpRequest";
            }
            $httpBackend.expectGET("/mms/application/index", headerValidation).respond(200);

            var promise = applicationDataFactory.get();

            var successFunction = jasmine.createSpy('successFunction');
            promise.then(successFunction);

            $httpBackend.flush();

            expect(successFunction).toHaveBeenCalled();
        });
    });
});
