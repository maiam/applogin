angular.module('applogin')
  .controller('HomeController',
    function($scope) {

      $scope.contatos = [
        {
        "_id": 1,
        "nome": "Contato Angular 1",
        "email": "cont1@empresa.com.br"
        },
        {
        "_id": 2,
        "nome": "Contato Angular 2",
        "email": "cont2@empresa.com.br"
        },
        {
        "_id": 3,
        "nome": "Contato Angular 333",
        "email": "cont3@empresa.com.br"
        }
      ];

      $scope.filtro = '';

      

    });
