registrationModule.controller('mainController', function ($scope, $rootScope, $location, localStorageService) {

    $scope.init = function () {
        if (parseInt(localStorage.getItem('login')) == 1) {
            $rootScope.ver = true;
            $location.path('/home');
        } else {
            $location.path('/login');
        }
    }

    // ************** NOTA se limpian todos los localStorage utilizados
    $scope.salir = function () {
        $(".mainnav-toggle").click();
        localStorage.removeItem('login');
        $location.path('/login');
    }
});
