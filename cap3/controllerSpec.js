/**
 * Created by lauro on 10/12/16.
 */
describe('Controller: ListCtrl', function () {
    beforeEach(module('notesApp'));

    var ctrl;

    beforeEach(inject(function ($controller) {
        ctrl = $controller('ListCtrl');
    }));

    it('should have highlight items based on state', function () {
        expect(ctrl.items).toEqual([
            {id: 1, label: 'Primeiro', done: true},
            {id: 2, label: 'Segundo', done: false}
        ]);
    });

    it('should have highlight items based on stated', function () {
        var item = {id: 1, label: 'First', done: true};
        var actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeTruthy();
        expect(actualClass.unfinished).toBeFalsy();

        item.done = false;
        actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeFalsy();
        expect(actualClass.unfinished).toBeTruthy();
    })
});