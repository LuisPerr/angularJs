registrationModule.controller('homeController', function ($scope, $rootScope, $location) {
    console.log( 'dataPrueba', $rootScope.dataPrueba );

    $scope.pruebaDale = function(){
        $location.path('/otra');
    }
});