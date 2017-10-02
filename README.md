# is_titulka - úprava titulky ISu v novém designu

Grease/Tamper/Violent-monkey/Guerilla-scripting skript pro úpravu vzhledu titulky ISu v novém designu.


## Umožňuje

* změnu pořadí dlaždic
* po změně pořadí zbývající dlaždice ze stránky odstranit
* zobrazení oblastí v Drilu a počet slovíček ke drilování
* zkrácení "Života" na výšku dlaždic s vyhledáváním
* zobrazování diskusních fór s nenulovým počtem nových příspěvků
* zobrazit číslo týdne v patičce

Skript byl funkční ve Firefoxu (55.0.3, Greasemonkey), Palemoon (27.4.2, Guerilla scripting), Chrome (61.0.3163.79, Tampermonkey) a Opera (47.0.2631.55, Violentmonkey), všechny Archlinux x86-64.


## Použití

Skript používáte na vlastní riziko!

Pokud postrádáte nějaký odkaz, než napíšete na podporu, zobrazte si titulku s vypnutým skriptem!

Skript žádným způsobem neovlivňuje uživatelská data v ISu, nic nemění, nic nezapisuje, nic neregistruje, známky nezadává, zkoušky za uživatele nesplní!


## Nastavení

### Vlastní pořadí dlaždic

Pořadí se určuje uvedením názvu dlaždice v poli odpovídajícímu použitému jazyku:

	var tiles_my_order = {
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
	}[is.session.get('lang')];

Nenalezená dlaždice, např. s překlepem, je ignorována.

### Mazání dlaždic, které nejsou v poli pro pořadí

Mazání zbývajících dlaždit lze zapnout

	var tiles_delete = true;

nebo vypnout

	var tiles_delete = false;

### Oblasti drilu

Zapnout vytváření první pseudo-dlaždice s oblastmi Drilu

	var lookup_dril = true;

nebo nezapínat

	var lookup_dril = false;

### Nezobrazovaní pravého sloupce se Životem

Nesledovat Život na škole

	var have_no_life = true;

ponechat si zobrazování Života

	var have_no_life = false;

### Zkrácení pravého sloupce se Životem

Zkrátit sloupec Života na délku dlaždic

	var tile_long_life = true;

ponechat výchozí délku

	var tile_long_life = false;

### Zobrazování diskusních fór s nenulovým počtem nových příspěvků

Zobrazovat disk. fóra

	var lookup_discussion = true;

nezobrazovat disk. fóra

	var lookup_discussion = false;

### Zobrazování čísla týdne v patičce

Zobrazovat číslo týdne mezi datem a časem v patičce

	var have_week_number = true;

nezobrazovat číslo týdne

	var have_week_number = false;

## Co zlepšit

* pro oblasti Drilu využívat lokální úložiště (localStorage) a ušetřit tak při každém zobrazení AJAXový GET na titlku Drilu, ale je potřeba nějak zajistit aktualizaci při aktivaci nové nebo deaktivaci oblasti, resp. periodicky aktualizovat při zobrazení
* diskusní fóra umožnit volitelně zobrazit jako dlaždici před/za drilem

