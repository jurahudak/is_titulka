# is_titulka - úprava titulky ISu v novém designu

Grease/Tamper/Violent-monkey/Guerilla-scripting skript pro úpravu vzhledu titulky ISu v novém designu.


## Umožňuje

* změnu pořadí dlaždic
* po změně pořadí zbývající dlaždice ze stránky odstranit
* zobrazení oblastí v Drilu a počet slovíček ke drilování
* zkrácení "Života" na výšku dlaždic s vyhledáváním
* zobrazování diskusních fór s nenulovým počtem nových příspěvků
* zobrazit číslo týdne v patičce
  * v rámci celého balíku nebo jako [samostatný skript](is_paticka_tyden.js)

Skript byl funkční ve Firefoxu (55.0.3, <strike title="GM změnil strukturu a zatím jsem neměl čas a sílu na úpravu">Greasemonkey</strike>Tampermonkey), Palemoon (27.4.2, Guerilla scripting), Chrome (61.0.3163.79, Tampermonkey) a Opera (47.0.2631.55, Violentmonkey), všechny Archlinux x86-64.


## Použití

Skript používáte na vlastní riziko!

Pokud postrádáte nějaký odkaz, než napíšete na podporu, zobrazte si titulku s vypnutým skriptem!

Skript žádným způsobem neovlivňuje uživatelská data v ISu, nic nemění, nic nezapisuje, nic neregistruje, známky nezadává, zkoušky za uživatele nesplní!


## Nastavení

Nastavení lze používat statické (= uvedené přímo v samotném uživatelském skriptu) nebo na externím URL (ale v ISu).

	// konfigurační hash - prázdná definici, kam se vloží statická nebo načtená konfigurace
	var config = {

### Nastavení v externím konfiguračním souboru

Při zobrazení titulní stránky se načte konfigurační soubor, provede se a použijí se v něm obsažené volby.

	// použít nastavení z URL - zakomentovat pro použití statické konfigurace
	'config_url': 'https://is.muni.cz/auth/www/'+is.session.get('uco')+'/is_titulka.conf.js',

### Vlastní pořadí dlaždic

Pořadí se určuje uvedením názvu dlaždice v poli odpovídajícímu použitému jazyku:

	'tiles_my_order': {
		"cs":[
			'Vývoj','Systém','Lidé',
			'Soubory','Pošta','Nástroje',
			'Publikace','Karty','Studijní',
		],
		"en":[
			'Development','System','People',
			'Files','My Mail','Tools',
			'Publications','Cards','Studies',
		],
		"sk":[
			'Vývoj','Systém','Ľudia',
			'Soubory','Pošta','Nástroje',
			'Publikácie','Karty','Študijné',
		],
	},

Nenalezená dlaždice, např. s překlepem, je ignorována.

### Mazání dlaždic, které nejsou v poli pro pořadí

Mazání zbývajících dlaždit lze zapnout

	'tiles_delete': true, // false

### Odebírání a přidávání odkazů uvnitř dlaždic

Přidávání odkazu umožňuje nahradit řetězec `%uco%` za uživatelovo učo.

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

### Oblasti drilu

Zapnout vytváření první pseudo-dlaždice s oblastmi Drilu

	'lookup_dril': true, // false

### Nezobrazovaní pravého sloupce se Životem

Nesledovat Život na škole

	'have_no_life': true, // false

### Zkrácení pravého sloupce se Životem

Zkrátit sloupec Života na délku dlaždic

	'tile_long_life': true, // false

### Zobrazování diskusních fór s nenulovým počtem nových příspěvků

Zobrazovat disk. fóra

	'lookup_discussion': true, // false

### Ignorování vybraných diskusních fór

	'discussion_ignore': [
		'název fóra',
	],

### Zobrazování čísla týdne v patičce

Zobrazovat číslo týdne mezi datem a časem v patičce

	'have_week_number': true, // false

### Upozornění na nevyplněný/nevytištěný pracovní výkaz

Zobrazovat odkaz na tisk pracovního výkazu.

	'pers-prac-doba': 'moje_nastaveni/pers-prac-doba.txt',

Hodnotou klíče je relativní cesta k existujícímu souboru ve "www"
stromu uživatele. `/www/učo/moje_nastaveni/pers-prac-doba.txt`.
User script se pokusí navázat handlery na stažení a tisk výkazu a při
stažení/tisku do tohoto souboru poznačí období (YYYY-MM), za který
se naposledy tisklo. Na titulce se pak tento soubor čte a porovnává
s aktuálním (předchozím) období.

## Co zlepšit

* <strike>pro oblasti Drilu využívat lokální úložiště (localStorage) a ušetřit tak při každém zobrazení AJAXový GET na titlku Drilu, ale je potřeba nějak zajistit aktualizaci při aktivaci nové nebo deaktivaci oblasti, resp. periodicky aktualizovat při zobrazení</strike>
* <strike>diskusní fóra umožnit volitelně zobrazit jako dlaždici před/za drilem</strike>

