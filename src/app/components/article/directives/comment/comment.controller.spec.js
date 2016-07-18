describe('Тестируем контроллер CommentController', function(){


  var $scope;
  var controller;
  var $rootScope;
  var parserService;
  var articleService;

  beforeEach(module('btest'));

  beforeEach(inject(function (_$rootScope_, $controller, _articleService_, _parserService_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    controller = $controller('CommentController', {
      $scope: $scope
    });

    articleService = _articleService_;
    parserService = _parserService_;

    spyOn(parserService, 'parseMD');
    spyOn(articleService, 'addComment').and.returnValue(true);
    spyOn(articleService, 'changeRating');
    spyOn($rootScope, '$emit');
    spyOn($rootScope, '$on');

  }));

  it('Проверяем контроллер на существование', function () {
    expect(controller).toBeDefined()
  });

  describe('Тестируем методы контроллера', function () {

    describe('Тестируем метод sendComment', function () {

      beforeEach(function () {

        controller.commentData = {
          id: 'some id'
        };

      });

      it('parserService.parseMD должен быть вызван', function () {
        controller.sendComment();
        expect(parserService.parseMD).toHaveBeenCalled();

      });

      it('articleService.parseMD должен быть вызван', function () {
        controller.sendComment();
        expect(articleService.addComment).toHaveBeenCalled()

      });

      it('articleService.addComment вернул true должено быть создано событие', function () {

        controller.sendComment();
        expect($rootScope.$emit).toHaveBeenCalledWith('comment:closeForm', {id: null})
      });


    });

    describe('Тестируем метод toggleForm', function () {

      it('controller.showForm = true, controller.showForm должно стать false', function () {

        controller.showForm = true;
        controller.toggleForm();

        expect(controller.showForm).toBeFalsy();

      });

      it('controller.showForm = false, controller.showForm должно стать true. Так же должен создаться ивент', function () {

        controller.commentData = {
          id: 'some id'
        };
        controller.showForm = false;
        controller.toggleForm();

        expect(controller.showForm).toBeTruthy();
        expect($rootScope.$emit).toHaveBeenCalledWith('comment:closeForm', {id: controller.commentData.id})

      });

    });

    describe('Тестируем метод changeRating', function () {

      it('Должен быть вызван метод articleService.changeRating', function () {

        controller.commentData = {
          id: 'some id'
        };

        controller.changeRating();
        expect(articleService.changeRating).toHaveBeenCalled()
      });
    });

    describe('Тестируем метод run', function () {

      it('Должен быть вызван метод $rootScope.$on', function () {

        controller.run();

        expect($rootScope.$on).toHaveBeenCalled()

      });

    });

  });

});
