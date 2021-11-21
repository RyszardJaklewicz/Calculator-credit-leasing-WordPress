<?php
/*
  Template Name: Nowy-Kalkulator
 */
get_header();
?>
<!-- LEASING -->
<!-- Leasing AUTO - Mille Auto -->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/31"></script>
<!-- Leasing TRANS - Auto Bonus-->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/46"></script>
<!-- Leasing AGRO - Mille Bud--> 
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/45"></script>
<!-- Leasing BUD - Mille Bud-->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/43"></script>
<!-- Leasing TECHNO - Techno Komfort -->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/24"></script>
<!-- KREDYT -->
<!-- Kredyt AUTO Auto Bonus-->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/32"></script>
<!-- Kredyt TRANS Bonus -->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/47"></script>
<!-- Kredyt AGRO -->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/20"></script>
<!-- Kredyt BUD -->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/"></script>
<!-- Kredyt TECHNO -->
<script type="text/javascript" src="https://sofa.cls.pl/kalkulator/21"></script>
<style type="text/css">
    .bd-inne {
        border: 1px #A3A3A3 solid;
        height:100px;
        margin-top:20px;
        text-align:center;
        vertical-align:middle;
    }
    .bd-inne p {
        font-size:19px;
        left:50%;
        line-height:40px;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        position:absolute;
        top:60%;
    }
    .bd-inne p a {
        border: 1px solid #FE7425;
        border-radius:5px;
        -moz-border-radius:5px;
        -ms-border-radius:5px;
        -webkit-border-radius:5px;
        font-size:14px;
        padding:5px 20px;
        text-transform:uppercase;
    }
    .bd-inne p a:hover {
        background-color: #FE6D1E;
    }
    #bd-otrzymaj {
        background-size: cover;
        height:200px;
        margin-top:4px;
        width:100%;
    }
    #bd-otrzymaj p {
        left:50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        position:absolute;
        top:50%;                
    }
    #bd-otrzymaj p a {
        background-color: #FE6D1E;
        border-radius:5px;
        -moz-border-radius:5px;
        -ms-border-radius:5px;
        -webkit-border-radius:5px;
        font-size:19px;
        padding:5px 20px;
    }
</style>
<section id="offer">
    <div class="container" style="max-width:100%;">
    	<div class="row" id="myCalc"></div>
    	<div class="row">    	
    		<div class="col-md-12">    		
				<div class="darkBox calc" style="float:left;">				
                	<div class="col-md-6" style="width:70%;min-width:320px;">
                	  	<h1>Oblicz ratę <span id="oblicz_kredyt">kredytu</span><span id="oblicz_leasing_kredyt_ukosnik">/</span><span id="oblicz_leasing">leasingu</span></h1>           	  	
        				<h3>Wybierz przedmiot finansowania</h3>
                        <ul class="carList">
                            <li class="act" id="AUTO" onClick="BAZYDANYCH.FUNKCJE.ustalOkresy('AUTO', true);">
                                <div class="imgWrap">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/ico/ico-car_15.png" alt="Samochody osobowe"/>
                                </div>
                                <h3 data-id="ko" data-text="Oferta skalkulowana dla fabrycznie nowego samochodu osobowego lub dostawczego do 3,5t DMC o stawce amortyzacji 20% bez uwzględnienia kosztów ubezpieczenia OC/AC.">
                                    Samochody<br>osobowe
                                </h3>
                            </li>
                            <li id="TRANS" onClick="BAZYDANYCH.FUNKCJE.ustalOkresy('TRANS', true);">
                                <div class="imgWrap">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/ico/ico-car_12.png" alt="Samochody ciężarowe"/>
                                </div>
                                <h3 data-id="kc" data-text="Oferta skalkulowana dla fabrycznie nowego samochodu ciężarowego, autobusu, ciągnika siodłowego, przyczepy lub naczepy o stawce amortyzacji 14% bez uwzględnienia kosztów ubezpieczenia OC/AC."> 
                                    Samochody<br>ciężarowe
                                </h3>
                            </li>
                            <li id="AGRO" onClick="BAZYDANYCH.FUNKCJE.ustalOkresy('AGRO', true);">
                                <div class="imgWrap">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/ico/ico-car_06.png" alt="Maszyny rolnicze"/>
                                </div>
                                <h3 data-id="km" data-text="
    							Oferta skalkulowana dla fabrycznie nowego ciągnika lub innej maszyny rolniczej silnikowej, przyczepy specjalistycznej 
    							o stawce amortyzacji 14% bez uwzględnienia kosztów ubezpieczenia OC/AC.">
                                    Maszyny<br>rolnicze
                                </h3>
                            </li>
                            <li id="BUD" onClick="BAZYDANYCH.FUNKCJE.ustalOkresy('BUD', true);">
                                <div class="imgWrap">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/ico/ico-car_03.png" alt="Maszyny budowlane"/>
                                </div>
                                <h3 data-id="kb" data-text="Oferta skalkulowana dla fabrycznie nowej koparki, ładowarki lub innej maszyny do robót ziemnych o stawce amortyzacji 20% bez uwzględnienia kosztów ubezpieczenia.">
                                    Maszyny<br>budowlane
                                </h3>
                            </li>
                            <li id="TECHNO" onClick="BAZYDANYCH.FUNKCJE.ustalOkresy('TECHNO', true);">
                                <div class="imgWrap">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/ico/ico-car_09.png" alt="Maszyny i urządzenia przemysłowe"/>
                                </div>
                                <h3 data-id="kp">
                                    Maszyny i urządzenia przemysłowe
                                </h3>
                            </li>
                            <li id="MED">
                                <div class="imgWrap">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/ico/ico-car_09.png" alt="Urządzenia medyczne"/>
                                </div>
                                <h3 data-id="medyczne">
                                    Urządzenia<br/>medyczne
                                </h3>
                            </li>
                        </ul>
						<div class="clearfix"></div>
                        <h3>Wpisz wartość</h3>
                        <label style="width:290px;">
                            <span>netto:</span>
                            <input id="cr_amount" name="cr_amount" type="text" value="" placeholder="np. 50 000">
                        </label>
                        <label style="width:290px;">
                            <span>brutto:</span>
                            <input id="cr_amount_vat" name="cr_amount_vat" type="text" value="" placeholder="np. 61 500">
                        </label>
        				<div class="row">
                        	<!-- KREDYT -->
                            <div class="col-md-6" id="suwaki_kredyt">
                                <h2 style="font-size:20px;">Kalkulator kredytowy</h2>
                                <form novalidate="novalidate" id="params_od2" name="params_od2">
                                    <div>
                                        <div id="lrat_od2" class="sliderWrap">
                                            <h3>Okres (miesiące): <span class="wartoscWrap"><span id="suwak_kredyt_okres_wartosc"></span></span></h3>
                                            <div id="suwak_kredyt_okres"></div>
                                        </div>                                     
                                        <div id="ow_od2" class="sliderWrap">
                                            <input type="hidden" value="0" id="ow_val_od2i">
                                            <h3>Wpłata własna (w%) <span class="wartoscWrap"><span id="suwak_kredyt_wplata_wlasna_wartosc" ></span>%</span></h3>
                                            <div id="suwak_kredyt_wplata_wlasna"></div>
                                        </div>                                      
                                        <div id="wykup_od2" class="sliderWrap" style="display:none;">
                                            <input type="hidden" value="0" id="wykup_val_od2i">
                                            <h3>Wykup (w%) <span class="wartoscWrap"><span id="wykup_val_od2"></span></span></h3>
                                            <div id="slider_wykup_od2"></div>
                                        </div>
                                        <h3>Rata kredytu: <span class="waluta" id="rata_kredytu"></span></h3>
                                    </div>
                                    <div id="pojazd_kredyt" style="font-size:12px;text-align:justify;"></div>
                                </form>
                            </div>
                            <!-- LEASING -->
                            <div class="col-md-6" id="suwaki_leasing">
                                <h2 style="font-size:20px;">Kalkulator leasingowy</h2>
                                <form novalidate="novalidate" id="params_od" name="params_od">
                                    <div>
                                        <div id="lrat_od" class="sliderWrap">
                                            <h3>Okres (miesiące): <span class="wartoscWrap"><span id="suwak_leasing_okres_wartosc"></span></span></h3>
                                            <div id="suwak_leasing_okres"></div>
                                        </div>                                    
                                        <div id="ow_od" class="sliderWrap">
                                            <input type="hidden" value="1" id="ow_val_odi">
                                            <h3>Wpłata własna (w%) <span class="wartoscWrap"><span id="suwak_leasing_wplata_wlasna_wartosc"></span>%</span></h3>
                                            <div id="suwak_leasing_wplata_wlasna"></div>
                                        </div>
                                        <div id="wykup_od" class="sliderWrap">
                                            <input type="hidden" value="19" id="wykup_val_odi">
                                            <h3>Wykup (w%) <span class="wartoscWrap"><span id="suwak_leasing_wykup_wartosc"></span>%</span></h3>
                                            <div id="suwak_leasing_wykup"> </div>
                                        </div>
                                        <h3>Rata leasingu: <span class="waluta" id="rata_leasingu"></span></h3>
                                    </div>
                                    <div id="pojazd_leasing" style="font-size:12px;text-align:justify;"></div>
                                </form>
                            </div>
        				</div>        				
                	</div>
					<div id="bd-contactform" class="col-md-6" style="width:30%;min-width:320px;">
                		<h1>Zamów ofertę</h1>
                		<h3 style="color:#FD7D2F;font-weight:bold;text-align:center;width:100%;">665 800 803</h3>
                		<form id="print-form">
                    		<input class="form-control" type="email" id="e-mail" name="e-mail" placeholder="Twój adres e-mail" />
    						<input class="form-control" type="text" id="telefon" name="telefon" placeholder="Twój telefon" maxlength="15" onkeypress="return BAZYDANYCH.FUNKCJE.tylkoCyfry(event, 1);" style="margin-top:-5px;" />
    						<textarea class="form-control" id="pytanie" name="pytanie" placeholder="Wskaż nam szczegóły przedmiotu, który chcesz sfinansować i napisz czego oczekujesz" style="height:100px;margin-top:-5px;"></textarea>
    						<div class="text-center"><img class="hidden" id="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></div>
    						<div>
    							<input type="checkbox" id="acceptance-wniosek" name="acceptance-wniosek" class="acceptance-wnosek" style="cursor:pointer;left:15px;position:absolute;" value="1" />
    							<p style="font-size:12px;line-height:18px;margin-left:20px;margin-top:5px;text-align:justify;">Niniejszym wyrażam zgodę - <a style="color:#FD7B2D;" href="/deklaracja-zgody-rodo" target="_blank">deklaracja zgody</a> - na przetwarzanie moich danych osobowych w celu realizacji mojego zapytania.</p>
    						</div>
    						<div style="text-align:center;width:100%;">
    							<input id="button_process-button" name="button_process-button" type="submit" value="wyślij" style="margin-top:2px;width:100%;" />
    						</div>
						</form>
                	</div>
    				<div class="col-md-6">
            			<div id="inne_kredyt" class="bd-inne"><p>Poznaj inne oferty dla kredytu<br/><a id="a_inne_kredyt" href="#" onclick="BAZYDANYCH.FUNKCJE.inneOferty('kredyt');return false;">sprawdź</a></p></div>
            		</div>
            		<div class="col-md-6">
            			<div id="inne_leasing" class="bd-inne"><p>Poznaj inne oferty dla leasingu<br/><a id="a_inne_leasing" href="#" onclick="BAZYDANYCH.FUNKCJE.inneOferty('leasing');return false;">sprawdź</a></p></div>
            		</div>
            		<div class="col-md-12">
            			 <div id="bd-otrzymaj"><p><a href="https://cls.pl/kontakt/">Otrzymaj ofertę za darmo</a></p></div>
            		</div>
                </div>                                
			</div>
    	</div>
		
		<!-- TEKST POD POZYCJONOWANIE NIE USUWAĆ!!! -->
		<div id="news">
			<article class="single">
				<?php the_content(); ?>
			</article>
		</div>
		<!-- END -->
		
    </div>
</section>
<div id="canvasTmp"></div>
<div class="hidden" id="canvas"></div>
<script src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator.js?v=<?php print rand(1,10000); ?>" type="text/javascript"></script>
<?php get_footer(); ?>
<script src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator/jspdf.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator/standard_fonts_metrics.js"></script> 
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator/split_text_to_size.js"></script> 
<script src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator/html2canvas.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator/slider.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/new_kalkulator/slider2.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery-ui.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery-ui_002.js" type="text/javascript"></script>
<script src="<?php echo get_template_directory_uri(); ?>/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js" type="text/javascript"></script>
