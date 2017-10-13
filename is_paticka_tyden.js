// ==UserScript==
// @name         is_paticka_tyden
// @namespace    is_paticka
// @version      0.1
// @description  Week number in footer
// @author       Juraj Hudak
// @include      https://is.muni.cz/auth/
// @include      https://is.muni.cz/auth/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if ( window.is === undefined ) {
        return;
    }

    Date.prototype.getWeek = function() {
      var onejan = new Date(this.getFullYear(),0,1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
    };
    $('.footer_datum span:last').prepend('(<a href="/auth/rozvrh/sl_tyden" title="'+_m('WEEK_OF_YEAR')+'">'+(new Date()).getWeek()+'.</a>) ');
})();

function _m(msg) {
    var lang = is.session.get('lang');
    return {
        'cs':{
            'WEEK_OF_YEAR':'Kalendářní týden',
        },
        'en':{
            'WEEK_OF_YEAR':'Week of the year',
        },
        'sk':{
            'WEEK_OF_YEAR':'Týždeň v roku',
        },
    }[lang][msg] || msg;
}
