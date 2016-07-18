(function () {
  'use strict';


  angular.module('btest')
    .service('parserService', parserService);

  parserService.$inject = [];
  function parserService() {
    var _this = this;
    _this.data = '';
    _this.masks = {
      newline: /\n+/g,
      h1: /^#[а-яА-ЯёЁ0-1\s\w]+$/gm,
      h2: /^#{2}[а-яА-ЯёЁ0-1\s\w]+$/gm,
      h3: /^#{3}[а-яА-ЯёЁ0-1\s\w]+$/gm,
      h4: /^#{4}[а-яА-ЯёЁ0-1\s\w]+$/gm,
      h5: /^#{5}[а-яА-ЯёЁ0-1\s\w]+$/gm,
      h6: /^#{6}[а-яА-ЯёЁ0-1\s\w]+$/gm,
      code: /`([^`]+)`/gm,
      italic: /\s\*([^\*]+)\*\s/gm,
      bold: /\s\*{2}([^\*]+)\*{2}\s/gm

    };

    _this.parse = parse;


    /*
     * Приватный метод separateOneLineText
     * Метод проверяет простой текст на наличие в нем md-элементов
     *
     * Аргументы:
     *   data - массив строк
     *
     *
     *
     * Возвращает объект c 2-мя свойтвами:
     *  simple - массив однострочных элементов
     *  complex - массив массивов многострочных элементов
     * */

    function separateOneLineText(data) {

      var simpleArr = [];
      var complexArr = [];

      for (var item in data) {

      }
    }


    /*
     * Приватный метод partitionLine
     *
     * Аргументы:
     *   data - строка с markdown текстом
     *
     *
     * Возвращает массив с линиями
     * */

    function partitionLine(data) {
      return data.split(_this.masks.newline);
    }

    /*
     * Открытый метод parse
     *
     * Аргументы:
     *   data - строка с markdown текстом
     *
     *
     * Возвращает строку с html - тестом
     * */

    function parse(data) {
      var arrayData = partitionLine(data);

      var complexArr = separateOneLineText(arrayData);
      console.log(complexArr)


    }
  }

})();
