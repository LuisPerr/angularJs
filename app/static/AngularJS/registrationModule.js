var registrationModule = angular.module("registrationModule", ["ngRoute", "colorpicker.module", "LocalStorageModule", 'ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.pinning', 'ui.grid.edit', 'ui.grid.moveColumns', 'angular.filter', 'ui.bootstrap', 'ui.bootstrap.modal'])

.config(function($routeProvider, $locationProvider) {

    /*cheange the routes*/
    $routeProvider.when('/login', {
        templateUrl: 'AngularJS/Templates/login.html',
        controller: 'loginController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'AngularJS/Templates/home.html',
        controller: 'homeController'
    });
    
    $routeProvider.when('/registro', {
        templateUrl: 'AngularJS/Templates/registro.html',
        controller: 'registroController'
    });
    $routeProvider.otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed             
        });
        changeHeight(); // when page loads          
    };
});
registrationModule.run(function($rootScope) {
    $rootScope.var = "full";

})
registrationModule.factory("utils", function($http) {
    return {
        b64toBlob: function(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
                type: contentType
            });
            return blob;
        }
    }
});