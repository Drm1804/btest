(function () {
    'use strict';


    angular.module('btest')
        .service('parserService', parserService);

    parserService.$inject = [];
    function parserService(){
        var _this = this;
        _this.data = '';
        _this.masks = {
            newline: /\n+/g
        };

        _this.parse = parse;

        /*
         * Приватный метод simpleText
         * Метод проверяет простой текст на наличие в нем md-элементов
         *
         * Аргументы:
         *   data - строка с markdown текстом
         *
         *
         * Возвращает массив с линиями
         * */

        function simpleText(){

        }

        /*
         * Приватный метод oneLineElement
         * Метод проверяет строку, которая начинается с md-символа
         *
         * Аргументы:
         *   data - строка с markdown текстом
         *
         *
         * Возвращает массив с линиями
         * */

        function oneLineElement(){

        }

        /*
         * Приватный метод moreLineElement
         * Метод проверяет строку, которая начинается с md-символа
         *
         * Аргументы:
         *   data - строка с markdown текстом
         *
         *
         * Возвращает массив с линиями
         * */

        function moreLineElement(){

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

        function partitionLine(data){
            return data.split( _this.masks.newline);
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

        function parse(data){
            var arrayData = partitionLine(data);
            console.log(arrayData)


        }
    }

})();