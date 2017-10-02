// ==UserScript==
// @name        is_titulka
// @namespace   is_titulka
// @include     https://is.*.cz/auth/
// @include     https://is.*.cz/auth/*
// @include     https://is.*.cz/auth/?*
// @version     1
// @grant       none
// ==/UserScript==

/*
   Sada funkcí, které trochu zlepší chování/vzhled/pořadí titulky IS (MU...) v novém designu.
   * změna pořadí dlaždic
   * mazání/skrytí zbývajících dlaždic
   * zobrazení oblastí drilu a počtu slovíček ke drilování
   * zkrácení života na délku dlaždic
   * zobrazení diskusí s nenulovým počtem nových příspěvků
   * zobrazení čísla týdne mezi datem a časem v patičce
*/

var config = {
  // externí nastavení - odkomentovat, uvést vlastní url a zakomentovat stat. nastavení
  // url _musí_ být na ISu
  'config_url': '/auth/www/'+is.session.get('uco')+'/is_titulka.conf.js',
  // statické nastavení - odkomentovat, uvést nstavení a zakomentovat url nastavení

/* // staticka konfigurace
    // zde uvést nadpisy dlaždic ve vytouženém pořadí pro používaný jazyk
    'tiles_my_order': {
      "cs":['Vývoj','Systém','Lidé',
          'Soubory','Pošta','Nástroje',
          'Publikace','Karty','Studijní',
         ],
      "en":['Development','System','People',
          'Files','My Mail','Tools',
          'Publications','Cards','Studies',
         ],
      "sk":['Vývoj','Systém','Ľudia',
          'Soubory','Pošta','Nástroje',
          'Publikácie','Karty','Študijné',
         ],
     },
    'tiles_link_remove':{
      'cs': {
          'Lidé': [ 'Skupiny osob', ],
console.log( 'get config ajax' )2
          'Systém': [ 'Podnětovna pro SO' ],
      },
    },
    'tiles_link_add':{
      'cs': {
          'Lidé': [ '<a href="/auth/osoba/%uco%">Moje os. stránka</a>' ],
      },
    },

    // nastavit na true, pokud uživatel chce uplně vymazat ostatní dlaždice, ktere nejsou uvedeny v tiles_my_order
    'tiles_delete': true,

    // dohledávat oblasti drilu
    'lookup_dril': true,

    // zobrazovat nove diskuse
    'lookup_discussion': true,

    // bez zivota (na MU)
    'have_no_life': false,

    // zivot stejne dlouhy jako dlazdice
    'tile_long_life': true,

    // číslo týdne
    'have_week_number': true,
*/ // staticka konfigurace
};

if ( config.config_url !== undefined ) {
  $.get(config.config_url, {}, function(data) { eval(data); run_me(config); });
} else {
  run_me(config);
}

/* definice funkcí a jejich spouštění ... za tímto komentařem už asi nic nechcete měnit ;-) */

// varování pro chybějící dlaždice
var _messages = {
  'cs' : {
          "TILE_MISSING": "Chybí nějaká dlaždice? Možná je potřeba <b>vypnout</b> tento užasný user-script pro titulku nebo <b>změnit</b> jeho nastavení. ;-)",
          "DISCUSSIONS": "Diskusní fóra",
          "WEEK_OF_YEAR": "Kalendářní týden",
         },
  'en' : {
          "TILE_MISSING": "An tile is missing? Maybe it's necessary to <b>turn off</b> this awesome user-script for the Title page or <b>change</b> its settings. ;-)",
          "DISCUSSIONS": "Discussions groups",
          "WEEK_OF_YEAR": "week of year",
         },
};
_messages['sk'] = {};
// okopírovat české texty do slovenských, nejsou-li uvedeny
for ( var msg in _messages['cs'] ) {
    if ( !(msg in _messages['sk']) ) {
        _messages['sk'][msg] = _messages['cs'][msg];
    }
}

function _m(m) {
  return _messages[is.session.get('lang')][m];
}

// záměna dvou dlaždice dle názvu
function dlazdice_replace(nazev1, nazev2) {
  //var prvni = $('.dlazdice .row .nazev a:contains(' + nazev1 + ')').parent().parent().parent();
  var prvni = $('.dlazdice .row .nazev a').filter(function() { return $(this).text() === nazev1; }).parent().parent().parent();
  //var druhy = $('.dlazdice .row .nazev a:contains(' + nazev2 + ')').parent().parent().parent();
  var druhy = $('.dlazdice .row .nazev a').filter(function() { return $(this).text() === nazev2; }).parent().parent().parent();
  // pouze, pokud jsou oba prvky nalezeny
  if ( prvni.size() === 1 && druhy.size() === 1 ) {
    var f_prvni = prvni.clone();
    var f_druhy = druhy.clone();
    prvni.replaceWith(f_druhy);
    druhy.replaceWith(f_prvni);
  } else {
      console.log( 'nenalezeno: ' + nazev1 + ' vs. ' + nazev2 + ' (' + prvni.size() + ' ' + druhy.size() + ')' );
  }
}

// celkové přeuspořádání dlaždic
function dlazdice_reorder(mp, mazat) {
  var stavajici_poradi = $('.dlazdice .row .nazev a').map(function () {
    return $(this).text();
  });
  var j;
  for ( j=0; j<mp.length; j++ ) {
    if (mp[j] !== stavajici_poradi[j]) {
      dlazdice_replace(mp[j], stavajici_poradi[j]);
    }
  }
  // explicitně neuvedené dlaždice vymazat ze stránky
  if ( mazat ) {
    stavajici_poradi = $('.dlazdice .row .nazev a').map(function () {
        return $(this).text();
      });
    if ( j < stavajici_poradi.length ) {
      for ( var i = j; i < stavajici_poradi.length; i++ ) {
        $('.dlazdice').has('.row .nazev a:contains('+stavajici_poradi[i]+')').remove();
      }
    }
  }
}

// ajax handler pro dril
function dril_ajax_count(o_nazev, o_id, o_href) {
    $.get('/auth/dril/dril-ajax', {'akce':'count_outstanding', 'oblast_id':o_id},
      function(d) {
        var _pocet_cols = $('#dril_dlazdice .row:last').size();
        if ( !$('#dril_dlazdice .row') || _pocet_cols % 3 === 0 ) {
          $('#dril_dlazdice').append('<div class="row"></div>');
        }
        $('#dril_dlazdice .row:last').append('<div class="small-4 column" style="padding-left: 2em; padding-right: 2em;">'+'<b><a href="/auth/dril/dril?akce=start_drill;oblast_id='+o_id+';force_phase=R;time_offset=0">'+
                                             o_nazev+'</a></b> (<a href="/auth/dril/dril?akce=whattolearn;oblast_id='+o_id+'">detail</a>): <span class="durazne">'+d.COUNT+'</span></div>');
        // prepocitat vysku az po pridani
        var _h = $('#dril_dlazdice .row:last').height();
        $('div.dlazdice #dril_dlazdice').parent().css('height', _h+10);
      } // function
    );
}

// přepočítání výsky života
function recount_life_height() {
  $('#zivot').height( $('#dlazdice').height() + $('#vyhledavani').height() - $('#diskuse_dlazdice').height() );
}


// hlavni funkce
function run_me(cfg) {

  // dlaždice dle jazyka
  var tiles_my_order = cfg.tiles_my_order[is.session.get('lang')];

  // přerovnat (a případně promazat) dlaždice
  if ( tiles_my_order !== undefined && tiles_my_order.length > 0 ) {
    dlazdice_reorder(tiles_my_order, cfg.tiles_delete);
  }

  // pokud uzivatel chce zobrazovat oblasti drilu na titulce
  if ( cfg.lookup_dril ) {
    // div pro dril
    $('#dlazdice').prepend(
      '<div class="row" style="padding-left: 2em;"><div class="column"><div class="dlazdice" style="text-align: left; "><div id="dril_dlazdice"><img src="/pics/design/pracuji.gif"></div></div></div></div>'
    );

    // zjistit oblasti drilu
    $.get('/auth/dril/', {},
        function(data) {
          $('#dril_dlazdice').html('');
          // vytahnout vsechny oblasti ke drilovani
          var pole = data.match(/(href=".*oblast_id=\d+.*<b>.*?<\/b>)/g);
          // pres vsechny oblasti zjistit nazev, id a pocet slovicek ke drilovani a vsechno vykreslit
          for ( var i in pole ) {
            var oblast_href = pole[i].match(/href="(.*)"/)[1];
            var oblast_id = pole[i].match(/oblast_id=(\d+)/)[1];
            var oblast_nazev = pole[i].match(/<b>(.*)<\/b>/)[1];
            dril_ajax_count(oblast_nazev, oblast_id, oblast_href);
          }
        }
    );
  }

  // pokud uzivatel chce zobrazit souhrn novych z diskusi
  if ( cfg.lookup_discussion ) {
    // vlozit jako dlazdici
  /*  $('#dlazdice').prepend(
      '<div class="row" style="padding-left: 2em;"><div class="column"><div class="dlazdice" style="text-align: left; overflow: auto;"><div id="diskuse_dlazdice"></div></div></div></div>'
    );
  */
    // vlozit pred Zivot
    $('.zivot_column').prepend('<div><div class="nazev" style="font-size: 1.5rem; margin-bottom: 1em;"><a href="/auth/diskuse/">'+_m('DISCUSSIONS')+'</a></div><div style="margin-bottom: 2em; height: 15em; overflow: auto;" id="diskuse_dlazdice"><img src="/pics/design/pracuji.gif"></div><hr /></div>');

    // zjistit diskuse
    $.get('/auth/diskuse/', {},
        function(data) {
          $('#diskuse_dlazdice').html('');
          var pole = data.match(/<li>(.*?\d+.*?(:?nov|new mess).*?)<\/li>/ig);
          for ( var i in pole ) {
            var nazev = (pole[i].match(/<b>(.*?)<\/b>/i) || ['',''])[1];
            var url = //'/auth'+(
                (pole[i].match(/href="([^"]+)"/i) || ['',''])[1];//.match(/(\/diskuse\/.*/))[1];
            url = url.replace('../','/auth/');
            var pocet = parseInt( (pole[i].match(/<font[^>]*>.*?(\d+)/i) || ['',0])[1] );
            // pouze ty diskuse s nenulovym poctem novych
            if ( pocet > 0 ) {
              $('#diskuse_dlazdice').append( '<a href="'+url+'">'+nazev+'</a> <b>('+pocet+')</b><br />' );
            }
          }
          recount_life_height();
        }
    );
  }

  // disclaimer na závěr
  $('#dlazdice').append('<div class="row"><div class="column" style="text-align: center;">' + _m('TILE_MISSING') + '</div></div>');

  // remove life :-)
  if ( cfg.have_no_life ) {
    $('#zivot').remove();
  } else {
    if ( cfg.tile_long_life ) {
      // zkrátit
      recount_life_height();
      // scrollbary
      $('#zivot').css( 'overflow', 'auto' );
    }
  }

  // číslo týdne v patičce
  if ( cfg.have_week_number ) {
    Date.prototype.getWeek = function() {
      var onejan = new Date(this.getFullYear(),0,1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
    };
    $('.footer_datum span').prepend('(<a href="/auth/rozvrh/sl_tyden" title="'+_m('WEEK_OF_YEAR')+'">'+(new Date()).getWeek()+'.</a>) ');
  }

} // run_me()

// vim: tabstop=2 shiftwidth=2 softtabstop=2 expandtab
