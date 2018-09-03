angular.module('applogin', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $httpProvider) {

        $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        .when('/contatos', {
            templateUrl: 'partials/contatos.html',
            controller: 'ContatosController'
        })
    });
