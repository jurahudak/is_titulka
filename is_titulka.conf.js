 //
// Nastaveni pro is_titulka.js
//

var config = {
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
  }, // tiles_my_order
  'tiles_link_remove':{
      'cs': {
          'Lidé': [ 'Skupiny osob', ],
          'Systém': [ 'Podnětovna pro SO' ],
      },
  },
  'tiles_link_add':{
      'cs': {
          'Lidé': [ '<a href="/auth/osoba/%uco%">Moje os. stránka</a>' ],
      },
  },
  'tiles_delete': true,
  'lookup_dril': true,
  'lookup_discussion': true,
  'discussion_ignore': [
      'Ptejte se Studentských poradců',
      'Záhrobní Plkárna 3.0',
      'Předměty',
   ],
  'have_no_life': false,
  'tile_long_life': true,
  'have_week_number': true,
  // www/$UCO/
  'pers-prac-doba': 'moje_nastaveni/pers-prac-doba.txt',
};

// vim: tabstop=2 shiftwidth=2 softtabstop=2 expandtab
