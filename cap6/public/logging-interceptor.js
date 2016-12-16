/**
 * Created by lauro on 15/12/16.
 */
angular.module('notesApp', [])
    .controller('MainCtrl', ['$http', function ($http) {
        var self = this;
        self.items = [];
        self.newTodo = {};
        var fetchTodos = function () {
            return $http.get('/api/note').then(function (response) {
                self.items = response.data;
            }, function (errResponse) {
                console.log('Error while fetching notes');
            });
        };
        fetchTodos();

        self.add = function(){
            $http.post('/api/note', self.newTodo)
                .then(fetchTodos)
                .then(function (response) {
                    self.newTodo = {};
                });
        };
    }]).factory('MyLogginInterceptor', ['$q', function ($q) {
        return {
            request : function (config) {
                console.log('Request made with ', config);
                return config;
                // Se houver um erro, não houver permissão ou ocorrer um condição personalizada
                return $q.reject('Not allowed');
            },
            requestError: function (rejection) {
                console.log('Request error due to ', rejection);
                // Continua para garantir que a próxima cadeia de promise veja um erro
                return $q.reject(rejection);
            },
            response: function(response) {
                console.log('Response from server ', response);
                // Retorna uma promise
                return response || $q.when(response);
            },
            responseError: function(rejection){
                console.log('Error in response ', rejection);
                // Continua para garantir que a próxima cadeia de promise veja um erro
                // Pode verificar o código de status de auth aqui se for necessário
                // if (rejection.status == 403) {
                // Mostra um diálogo de login
                // Retorna um valor para dizer aos controladores que foi tratado
                // }
                // Ou retorna uma rejeição para continuar a
                // cadeia de falhas a promise
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('MyLoggingInterceptor');
    }]);

