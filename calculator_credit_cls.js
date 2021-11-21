/**
 * Fragment kodu java script realizujacego funkcjonalność kalkulatora
 */
(function($){
	/**
	 * @desc Walidacja i obsluga wysylki zapytania z formularza
	 */
	$('#print-form').validate({
		rules:{
			'e-mail':{required:true,email:true},
			'acceptance-wniosek':{required:true}
		},
		submitHandler:function(form){
            $.post( "https://cls.pl/wp-content/themes/cls/_sender.php", BAZYDANYCH.FUNKCJE.zwrocDaneDoWyslania(),function(data){
            	try{obj=jQuery.parseJSON(data);}catch(x){alert("BĹÄdna odpowiedĹş.");}
            	if(!obj.operation_result){
            	alert(obj.warnings.join(", "));
            	} else {
            		alert("DziÄkujemy za przesĹanie zapytania!");
            		$('#e-mail').val('');
            		$('#telefon').val('');
            		$('#pytanie').val('');
            		document.getElementById("acceptance-wniosek").checked = false;
            	}
            });
		}
	});
})(jQuery);
/**
 * @desc	Steruje wygladem etykietek do piktogramow
 */
jQuery('.carList li').on('click', function () {
	jQuery('.carList li').removeClass('act');
	jQuery(this).addClass('act');                                    
});
/**
 * @desc	Formatuje kwote
 */
var makeMoney = function(str){
	m=parseFloat(str);
	try{return m.formatMoney(2,',','.');}catch(x){return '0,00';}
};
/**
 * @desc	Przeszukuje tablice w poszukiwaniu elementu o podanej wartosci.
 * @param	mixed	$search_term	szukana wartosc
 */
Array.prototype.inArray=function(search_term) {
	var i=this.length;
    if(i>0){
        do {if(this[i] === search_term) return true;} while (i--);
    }
    return false;
};
/**
 * @desc 	Formatuje kwotÄ.
 * @param	integer $c	liczba miejsc po separatorze dziesietnym
 * @param	string  $d	separator dziesietny
 * @param 	string  #t	separator tysiecy
 * 
 * 			Np.: 23456.8.formatMoney(2, ",", ".") zwraca "23.456,80"
 */
Number.prototype.formatMoney = function(c, d, t){
	var n=this, c=isNaN(c=Math.abs(c))?2:c, d=d==undefined?".":d, t=t==undefined?".":t, s=n<0?"-":"", i=parseInt(n=Math.abs(+n || 0).toFixed(c))+"", j=(j=i.length)>3?j%3:0; return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g, "$1"+t)+(c?d+Math.abs(n-i).toFixed(c).slice(2):"");
};
jQuery( document ).ready(function(){
	if(typeof(BAZYDANYCH)=='undefined') return;
	/**
	 * @desc 	Parametry startowe kalkulatora: 
	 */
	BAZYDANYCH.KWOTY={netto:0,brutto:0};
	/**
	 * @desc 	Deklaracje zmiennych i obiektow:
	 */
	BAZYDANYCH.RATY={kredyt:0,leasing:0};
	BAZYDANYCH.SEKCJE=['AUTO','TRANS','BUD','AGRO','TECHNO','MED'];
	BAZYDANYCH.WYBRANA_SEKCJA=null;
	BAZYDANYCH.OKRESY={kredyt:[], leasing:[]};
	BAZYDANYCH.OPISY={kredyt:'', leasing:''};
	BAZYDANYCH.WPLATY_WLASNE={kredyt:[], leasing:[]};
	BAZYDANYCH.WYKUPY={leasing:[]};
	BAZYDANYCH.INNE_OFERTY={kredyt:'', leasing:''};
	BAZYDANYCH.SCIEZKA_OBRAZKI='https://cls.pl/wp-content/themes/cls/images/';
	/**
	 * @desc Wartosci suwakow:
	 */
	BAZYDANYCH.SUWAKI={};
	/**
	 * @desc Zestaw funkcji:
	 */
	BAZYDANYCH.FUNKCJE={
		/**
		 * @desc	Aktualizuje kwote brutto na podstawie wpisanej kwoty netto
		 */
		aktualizujBrutto:function(){
			v=$('#cr_amount').val();			
			if(typeof(v)=='string'){
				if(v.indexOf(',')!=-1 && v.indexOf('.')!=-1) v=v.replace('.','');
				if(v.indexOf(',')!=-1) v=v.replace(',','.');
				v=(isNaN(v)?0:Math.round(v*100)/100);
			}
			BAZYDANYCH.KWOTY.netto=v;
			v=1.23*parseFloat(v);			
			BAZYDANYCH.KWOTY.brutto=(isNaN(v)?0:Math.round(v*100)/100);
			$('#cr_amount_vat').val(isNaN(v)?'':v.formatMoney(2,".",""));
		},
		/**
		 * @desc	Aktualizuje kwote netto na podstawie wpisanej kwoty brutto
		 */
		aktualizujNetto:function(){
			v=$('#cr_amount_vat').val();
			if(typeof(v)=='string'){
				if(v.indexOf(',')!=-1 && v.indexOf('.')!=-1) v=v.replace('.','');
				if(v.indexOf(',')!=-1) v=v.replace(',','.');
				v=(isNaN(v)?0:Math.round(v*100)/100);
			}
			BAZYDANYCH.KWOTY.brutto=v;
			v=parseFloat(v)/1.23;
			BAZYDANYCH.KWOTY.netto=(isNaN(v)?0:Math.round(v*100)/100);
			$('#cr_amount').val(isNaN(v)?'':v.formatMoney(2,".",""));
		},
		/**
		 * @desc 	Sprawdza czy sa dopiete jakiekolwiek kalkulatory
		 */
		czySaKalkulatory:function(){
			if(typeof(BAZYDANYCH.KALKULATORY)=='undefined' || BAZYDANYCH.KALKULATORY.length==0) return false;
			return true;
		},
		/**
		 * @desc	Przechodzi do stony podpietej pod przycisk "inne oferty - kredyt" lub "inne oferty - leasing"
		 */
		inneOferty:function(co){
			if(typeof(BAZYDANYCH.INNE_OFERTY[co])=='undefined' || BAZYDANYCH.INNE_OFERTY[co]=='') return true;
			window.location.href=BAZYDANYCH.INNE_OFERTY[co];
		},
		/**
		 * @desc	Oblicza rate kredytu
		 */
		liczRateKredytu:function(){
			BAZYDANYCH.RATY.kredyt=0;
			if(typeof(BAZYDANYCH.KALKULATORY)=='undefined' || BAZYDANYCH.KALKULATORY.length==0) return BAZYDANYCH.RATY.kredyt;
			lth=BAZYDANYCH.KALKULATORY.length;
			for(i=0;i<lth;i++){
				if(BAZYDANYCH.KALKULATORY[i].typ=='kredyt' && BAZYDANYCH.KALKULATORY[i].target==BAZYDANYCH.WYBRANA_SEKCJA){
					if(BAZYDANYCH.KALKULATORY[i].factorsCount==0 || typeof(BAZYDANYCH.KALKULATORY[i].factors)=='undefined') return BAZYDANYCH.RATY.kredyt;
					for(k in BAZYDANYCH.KALKULATORY[i].factors){
						if(BAZYDANYCH.KALKULATORY[i].factors.hasOwnProperty(k) && k==BAZYDANYCH.SUWAKI.suwak_kredyt_okres.v){
							liczbaFaktorow = BAZYDANYCH.KALKULATORY[i].factors[k].length;
							for(j=0;j<liczbaFaktorow;j++){
								if(BAZYDANYCH.KALKULATORY[i].factors[k][j].ow == BAZYDANYCH.SUWAKI.suwak_kredyt_wplata_wlasna.v){
									BAZYDANYCH.RATY.kredyt=(BAZYDANYCH.KWOTY.brutto/100)*BAZYDANYCH.KALKULATORY[i].factors[k][j].f;
									rata = (BAZYDANYCH.KWOTY.brutto/100)*BAZYDANYCH.KALKULATORY[i].factors[k][j].f;
									if(parseFloat(rata)!=0) $('#rata_kredytu').text(makeMoney(rata)+' zĹ');
									else $('#rata_kredytu').text('');
									break;
								}
							}
						}
					}
				}
			}
			return BAZYDANYCH.RATY.kredyt;
		},
		/**
		 * @desc	Oblicza rate leasingu
		 */
		liczRateLeasingu:function(){
			BAZYDANYCH.RATY.leasing=0;
			if(typeof(BAZYDANYCH.KALKULATORY)=='undefined' || BAZYDANYCH.KALKULATORY.length==0) return BAZYDANYCH.RATY.leasing;
			lth=BAZYDANYCH.KALKULATORY.length;
			for(i=0;i<lth;i++){
				if(BAZYDANYCH.KALKULATORY[i].typ=='leasing' && BAZYDANYCH.KALKULATORY[i].target==BAZYDANYCH.WYBRANA_SEKCJA){
					if(BAZYDANYCH.KALKULATORY[i].factorsCount==0 || typeof(BAZYDANYCH.KALKULATORY[i].factors)=='undefined') return BAZYDANYCH.RATY.leasing;
					for(k in BAZYDANYCH.KALKULATORY[i].factors){
						if(BAZYDANYCH.KALKULATORY[i].factors.hasOwnProperty(k) && k==BAZYDANYCH.SUWAKI.suwak_leasing_okres.v){
							liczbaFaktorow = BAZYDANYCH.KALKULATORY[i].factors[k].length;
							for(j=0;j<liczbaFaktorow;j++){
								if(BAZYDANYCH.KALKULATORY[i].factors[k][j].ow == BAZYDANYCH.SUWAKI.suwak_leasing_wplata_wlasna.v && BAZYDANYCH.KALKULATORY[i].factors[k][j].r == BAZYDANYCH.SUWAKI.suwak_leasing_wykup.v){
									BAZYDANYCH.RATY.leasing=(BAZYDANYCH.KWOTY.netto/100)*BAZYDANYCH.KALKULATORY[i].factors[k][j].f;
									rata = (BAZYDANYCH.KWOTY.netto/100)*BAZYDANYCH.KALKULATORY[i].factors[k][j].f;
									if(parseFloat(rata)!=0) $('#rata_leasingu').text(makeMoney(rata)+' zĹ');
									else $('#rata_leasingu').text('');
									break;
								}
							}
						}
					}
				}
			}
			return BAZYDANYCH.RATY.leasing;
		},
		/**
		 * @desc	Formatuje int
		 */
		tylkoCyfry:function(e,decReq){
		    key = e.keyCode||e.which;
		   	obj = e.srcElement||e.target;
		   	isNum = ((key > 47 && key < 58) || key == 37 || key == 39 || key == 27 || key == 8 || key == 9) ? true:false;
		   	dotOK = (key == 46 && decReq && obj.value.indexOf(".") < 0) ? true : false;
		   	return (isNum || dotOK);
		},
		/**
		 * @desc 	Formatuje kwote
		 */
		tylkoKwota:function(e,decReq){
	        var key = e.keyCode||e.which;
	        var obj = e.srcElement||e.target;
	        var isNum = ((key>47 && key<58) || key==27 || key==8 || key==44 || key==46 || key==9) ? true:false;
	        var dotOK = (key==46 && decReq && obj.value.indexOf(".")<0) ? true:false;
	        return (isNum || dotOK);
		},
		/**
		 * @desc 	Przenosi okresy ustalone z wybranych kalkulatorow do globalnej zmiennej BAZY.DANYCH.OKRESY
		 * @param 	string 	$cel - wybrana sekcja: 'AUTO', 'TRANS', 'BUD', 'AGRO', 'TECHNO', 'MED'
		 * @param	boolean $zwroc - czy dodatkowo zwrocic tablice
		 */
		ustalOkresy:function(cel,zwroc){
			BAZYDANYCH.OKRESY={kredyt:[], leasing:[]};
			BAZYDANYCH.OPISY={kredyt:'', leasing:''};
			BAZYDANYCH.INNE_OFERTY={kredyt:'', leasing:''};
			if(!BAZYDANYCH.FUNKCJE.czySaKalkulatory()) return;
	    	if(typeof(cel)=='undefined'){
	    		//ustal okresy dla pierwszego kalkulatora dla kredytow i pierwszego kalkulatora dla leasingu:
	    		for(i=0; i<BAZYDANYCH.KALKULATORY.length; i++){
	    			if(typeof(BAZYDANYCH.KALKULATORY[i].typ)!='undefined' && BAZYDANYCH.OKRESY[BAZYDANYCH.KALKULATORY[i].typ].length==0 && typeof(BAZYDANYCH.KALKULATORY[i].factors)!='undefined'){
	    				for(okres in BAZYDANYCH.KALKULATORY[i].factors){
	    					if(BAZYDANYCH.KALKULATORY[i].factors.hasOwnProperty(okres)) BAZYDANYCH.OKRESY[BAZYDANYCH.KALKULATORY[i].typ].push(parseInt(okres));
	    				}
	    				if(BAZYDANYCH.WYBRANA_SEKCJA==null) {
	    					BAZYDANYCH.WYBRANA_SEKCJA=BAZYDANYCH.KALKULATORY[i].target;
	    					$('#bd-otrzymaj').css('background-image',"url('"+BAZYDANYCH.SCIEZKA_OBRAZKI+"calc_bottom/"+BAZYDANYCH.WYBRANA_SEKCJA+".jpg')");
	    				}
	    				if(typeof(BAZYDANYCH.OPISY[BAZYDANYCH.KALKULATORY[i].typ])=='undefined' || BAZYDANYCH.OPISY[BAZYDANYCH.KALKULATORY[i].typ]=='') BAZYDANYCH.OPISY[BAZYDANYCH.KALKULATORY[i].typ] = BAZYDANYCH.KALKULATORY[i].description;
	    				if(typeof(BAZYDANYCH.INNE_OFERTY[BAZYDANYCH.KALKULATORY[i].typ])=='undefined' || BAZYDANYCH.INNE_OFERTY[BAZYDANYCH.KALKULATORY[i].typ]=='') BAZYDANYCH.INNE_OFERTY[BAZYDANYCH.KALKULATORY[i].typ] = BAZYDANYCH.KALKULATORY[i].infoUrl;
	    			}
	    		}
	    	} else {
	    		//ustal okresy dla wskazanego kalkulatora dla kredytĂłw i leasingu:
	    		BAZYDANYCH.WYBRANA_SEKCJA=cel;
	    		$('#bd-otrzymaj').css('background-image',"url('"+BAZYDANYCH.SCIEZKA_OBRAZKI+"calc_bottom/"+BAZYDANYCH.WYBRANA_SEKCJA+".jpg')");
	    		for(i=0; i<BAZYDANYCH.KALKULATORY.length; i++){
	    			if(BAZYDANYCH.KALKULATORY[i].target==cel && typeof(BAZYDANYCH.KALKULATORY[i].factors)!='undefined'){
	    				for(okres in BAZYDANYCH.KALKULATORY[i].factors){
	    					if(BAZYDANYCH.KALKULATORY[i].factors.hasOwnProperty(okres)) BAZYDANYCH.OKRESY[BAZYDANYCH.KALKULATORY[i].typ].push(parseInt(okres));
	    				}
	    				if(typeof(BAZYDANYCH.OPISY[BAZYDANYCH.KALKULATORY[i].typ])=='undefined' || BAZYDANYCH.OPISY[BAZYDANYCH.KALKULATORY[i].typ]=='') BAZYDANYCH.OPISY[BAZYDANYCH.KALKULATORY[i].typ] = BAZYDANYCH.KALKULATORY[i].description;
	    				if(typeof(BAZYDANYCH.INNE_OFERTY[BAZYDANYCH.KALKULATORY[i].typ])=='undefined' || BAZYDANYCH.INNE_OFERTY[BAZYDANYCH.KALKULATORY[i].typ]=='') BAZYDANYCH.INNE_OFERTY[BAZYDANYCH.KALKULATORY[i].typ] = BAZYDANYCH.KALKULATORY[i].infoUrl;
	    			}
	    		}
	    		//kredyt - zaktualizuj suwak 'okres':
	    		if(typeof(BAZYDANYCH.SUWAKI.suwak_kredyt_okres)!='undefined') BAZYDANYCH.FUNKCJE.zmienSuwak('suwak_kredyt_okres', BAZYDANYCH.OKRESY.kredyt, function(){}, true);
	    		//kredyt - zaktualizuj wplaty wlasne:
		    	if(BAZYDANYCH.OKRESY.kredyt.length!=0) BAZYDANYCH.FUNKCJE.ustalWplatyWlasne('kredyt', BAZYDANYCH.OKRESY.kredyt[BAZYDANYCH.OKRESY.kredyt.length-1]);
		    	else BAZYDANYCH.FUNKCJE.ustalWplatyWlasne('kredyt',0);
		    	//kredyt - zaktualizuj suwak 'wplata wlasna':
		    	if(typeof(BAZYDANYCH.SUWAKI.suwak_kredyt_wplata_wlasna)!='undefined') BAZYDANYCH.FUNKCJE.zmienSuwak('suwak_kredyt_wplata_wlasna', BAZYDANYCH.WPLATY_WLASNE.kredyt, function(){}, false);
		    	BAZYDANYCH.FUNKCJE.liczRateKredytu();
		    	
		    	//leasing - zaktualizuj suwak 'okres':
		    	if(typeof(BAZYDANYCH.SUWAKI.suwak_leasing_okres)!='undefined') BAZYDANYCH.FUNKCJE.zmienSuwak('suwak_leasing_okres', BAZYDANYCH.OKRESY.leasing, function(){}, true);		    	
		    	//leasing - zaktualizuj wplaty wlasne:
		    	if(BAZYDANYCH.OKRESY.leasing.length!=0) BAZYDANYCH.FUNKCJE.ustalWplatyWlasne('leasing', BAZYDANYCH.SUWAKI.suwak_leasing_okres.v);		    	
		    	else BAZYDANYCH.FUNKCJE.ustalWplatyWlasne('leasing',0);
		    	//leasing - zaktualizuj suwak 'wplata wlasna':
		    	if(typeof(BAZYDANYCH.SUWAKI.suwak_leasing_wplata_wlasna)!='undefined') BAZYDANYCH.FUNKCJE.zmienSuwak('suwak_leasing_wplata_wlasna', BAZYDANYCH.WPLATY_WLASNE.leasing, function(){}, false);		    	
		    	//leasing - zaktualizuj wykupy:
		    	if(BAZYDANYCH.WPLATY_WLASNE.leasing.length!=0) BAZYDANYCH.FUNKCJE.ustalWykupy(BAZYDANYCH.SUWAKI.suwak_leasing_wplata_wlasna.v, BAZYDANYCH.SUWAKI.suwak_leasing_okres.v);
		    	else BAZYDANYCH.FUNKCJE.ustalWykupy('leasing', 0);
		    	//leasing - zaktualizuj suwak 'wykup':
		    	if(typeof(BAZYDANYCH.SUWAKI.suwak_leasing_wykup)!='undefined') BAZYDANYCH.FUNKCJE.zmienSuwak('suwak_leasing_wykup', BAZYDANYCH.WYKUPY.leasing, function(){}, true);
		        BAZYDANYCH.FUNKCJE.liczRateLeasingu();
	    	}
			$("#pojazd_kredyt").text(BAZYDANYCH.FUNKCJE.zwrocDaneDoWyslania().kredyt_opis);
			$("#pojazd_leasing").text(BAZYDANYCH.FUNKCJE.zwrocDaneDoWyslania().leasing_opis);
	    	if(typeof(zwroc)!='undefined' && zwroc) return BAZYDANYCH.OKRESY;
		},
		
});
