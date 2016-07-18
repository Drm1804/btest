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

    _this.parseMD = parseMD;


    /*
     * Открытый метод parseMD
     *
     * Аргументы:
     *   data - строка с markdown текстом
     *
     *
     * Возвращает строку с html - тестом
     * */

    function parseMD(data) {

      data = data.replace( _this.masks.h1, function(result){

        result = result.replace('\#', '');
        return '<h1>'+ result+ '</h1>'
      });
      
      data = data.replace( _this.masks.italic, '<code>$1</code>');


      console.log(data)

      return data


    }
  }

})();
