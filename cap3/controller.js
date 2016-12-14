/**
 * Created by lauro on 10/12/16.
 */
angular.module('notesApp', []).controller('ListCtrl', [function () {
    var self = this;
    self.items = [
        {id: 1, label: 'Primeiro', done: true},
        {id: 2, label: 'Segundo', done: false}
    ];
    self.getNoteClass = function (item) {
        return {
            finished: item.done,
            unfinished: !item.done
        };
    };
}]);