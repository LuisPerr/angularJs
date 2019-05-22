registrationModule.controller('loginController', function ($scope, $rootScope, $location, loginRepository, localStorageService) {

    $scope.init = function () {
        $rootScope.ver = false;
    };

    $scope.prueba = function () {
        if ($scope.usuario == '' || $scope.contrasena == '' || $scope.usuario == undefined || $scope.contrasena == undefined) {
            swal('Alto', 'Pon datos', 'error');
        } else {
            loginRepository.login($scope.usuario, $scope.contrasena).then(function (res) {
                console.log('res', res);
                $rootScope.ver = true;
                localStorage.setItem('login', 1);
                $location.path('/home');
            });
        }
    }

    $scope.pruebaRe = function () {
        console.log('Hola');
    }
});
