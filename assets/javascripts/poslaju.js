angular.module('myApp', ['angular-loading-bar'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    })
    .controller('myController', ['$scope', '$http', function ($scope, $http) {
        $scope.appInfo = [];
        $scope.appInfo.version = '2.1';
        $scope.appInfo.name = 'Pos Laju Tracking';
        $scope.checkParcel = function () {
            $scope.poslajuUrl = 'https://ruby-jempol.rhcloud.com/poslaju/' + $scope.user.trackCode;
            getParcelStatus()
            $scope.user.request = 1;
        };
        var getParcelStatus = function () {

            $http.get($scope.poslajuUrl).
                then(function (response) {
                    //console.log('success');
                    $scope.parcelStatus = response.data;
                    $scope.user.requestComplete = 1;
                    showModal();
                }, function (response) {
                    $scope.user.requestComplete = 1;

                    //console.log('error')
                });


        };

        var showModal = function(){
            $('.ui.modal')
                .modal('show')
            ;
        };

        $scope.reset = function () {
            $scope.user.trackCode = '';
            $scope.poslajuTrackers.$invalid = true;
        };
    }]);