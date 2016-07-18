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
      h1: /^#[а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
      h2: /^#{2}[а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
      h3: /^#{3}[а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
      h4: /^#{4}[а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
      h5: /^#{5}[а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
      h6: /^#{6}[а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
      text: /^[^<][а-яА-ЯёЁ0-1\s\w][^\n]+$/gm,
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

      data = data.replace( _this.masks.h2, function(result){
        result = result.replace('\##', '');
        return '<h2>'+ result+ '</h2>'
      });

      data = data.replace( _this.masks.h3, function(result){
        result = result.replace('\###', '');
        return '<h3>'+ result+ '</h3>'
      });

      data = data.replace( _this.masks.h4, function(result){

        result = result.replace('\####', '');
        return '<h4>'+ result+ '</h4>'
      });

      data = data.replace( _this.masks.h5, function(result){
        result = result.replace('\#####', '');
        return '<h5>'+ result+ '</h5>'
      });

      data = data.replace( _this.masks.h6, function(result){
        result = result.replace('\######', '');
        return '<h6>'+ result+ '</h6>'
      });

      data = data.replace( _this.masks.text, '<p>$&</p>');

      data = data.replace( _this.masks.italic, '<i> $1 </i>');

      data = data.replace( _this.masks.bold, '<b> $1 </b>');

      data = data.replace( _this.masks.code, '<code> $1 </code>');

      return data


    }
  }

})();
