registrationModule.controller('registroController', function ($scope, $rootScope) {
    
    $scope.inti = function(){
        $rootScope.ver = true;
        console.log( 'Registro' );
    }

});