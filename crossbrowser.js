/* ==========================================================================
	CrossBrowser - Atualize Seu Navegador
	@author Jadson Moreira - http://www.jadsonmoreira.com @inforsis
	@Description: Plugin para exibir um alerta ao usuario para atualizar o browser
	@version: 1.2 (14/11/2013)
	@since 17/02/2011 (1.0)
========================================================================== */

jQuery.fn.crossBrowser = function(options) {

    return this.each(function(){

    	var opts = jQuery.extend({}, jQuery.fn.crossBrowser.defaults, options);
			
    		var path 	  =  opts.path, //{string} //caminho dos icones e imagens
    			navegadorLista   = opts.navegadorLista, //{objeto} lista de arrays
    			textDeny = opts.textDeny, //{string} //texto para mensagem de acesso negado
    			textWarn = opts.textWarn; //{string} //texto para mensagem de acesso negado

    		//senao for setado valor para o path, usar caminho vazio
    		if (!opts.path) {   		
	    		var path = '';
	    	}
	    	//texto padrão para mensagem de acesso negado
	    	if (!opts.textDeny) {
	    		opts.textDeny = 'Alguns recursos de navegação do site podem ser prejudicados ou estarem inacessíveis em algum momento. Para uma melhor navegação atualize seu navegador ou instale um outro.';	
	    	}
	    	//texto padrão para mensagem de alerta
	    	if (!opts.textWarn) {
	    		opts.textWarn = 'Para uma melhor visualização do site atualize-o ou escolha outro navegador.';
	    	}
	    						
			//pegando o nome do navegador;
			var browserName = navigator.appName;
			//declarando variaveis
			var navegador, imagem, titulo, versao;
			//configurando o nome do navegador, imagem, e url para download
			var browser = {
				//navegadores
				name : ["Internet Explorer","Firefox","Chrome","Safari","Opera"],
				//icone dos navegadores
				image : ["ie","firefox","chrome","safari","opera"],
				//url para qual o usuário é redirecionado para baixar o navegador
				url : ["http://windows.microsoft.com/pt-BR/internet-explorer/products/ie/home","http://br.mozdev.org/download/","http://www.google.com/chrome/?hl=pt-BR","http://www.apple.com/br/safari/download/","http://www.opera.com/download/"]
			}
			
			switch(browserName) {
			//passando o nome do navegador para o navegador zero da lista, setando o icone que será usado; versao capturada através de split no atibuto appVersion presente no objeto navigator
			case "Microsoft Internet Explorer": navegador = browser.name[0]; imagem = browser.image[0]; var versao = navigator.appVersion; versao = versao.split("("); versao = versao [1].split(";"); versao = versao[1]; versao = versao.split(" "); versao = versao[2]; versao = versao.split("."); versao = versao[0]; break;
			//passando o nome do navegador para o navegador quatro da lista, setando o icone que será usado; versao capturada através de split no atibuto appVersion presente no objeto navigator
			case "Opera": navegador = browser.name[4]; imagem = browser.image[4]; var versao = navigator.appVersion; versao = versao.split("."); versao = versao[0]; break;
			//continuar daqui dando um loop for pegando o nome do navegador 9 para firefox  11 para chrome e 12 para safari
			case "Netscape": var navegador = (navigator.userAgent); var navegadorSplit = navegador.split(" "); for (i=0;i<=navegadorSplit.length-1; i++)
			{var navegadorSplit2 = navegadorSplit[i].split("/"); 
			switch (navegadorSplit2[0]) {
			//google chrome usa a mesma engine do safari por isso foi preciso fazer o if dentro do case para distinguir os dois navegadores :D
			case "Safari": var chrome = navegadorSplit[i-1]; chrome = chrome.split("/");
			if (chrome[0] == "Chrome") {navegador = browser.name[2]; imagem = browser.image[2]; var versao = chrome[1].split("."); versao = versao[0];}
	  		else {navegador = browser.name[3]; imagem = browser.image[3]; var versao = navegadorSplit2[1]; versao.split("."); versao = versao[0];} break;
			case "Firefox": navegador = browser.name[1]; imagem = browser.image[1]; var versao = navegadorSplit2[1]; /*versao = versao.substr(0,versao.length-3);*/ break; 	 	
			default: break;}
		}; break;
		default: navegador = "navegador"; break;
	}
			//convertendo a versão para float
			versao = parseFloat(versao);
			
			//configurando caminho das imagens e frases
			console.log (browserName+' - '+versao)
			//listando os icones dos navegadores com os links
			function listandoNavegadores() {
				for (i=0;i<browser.name.length;i++) {
					//se o browser.name é diferente do navegador do usuário é listado no box crossBrowserInstall
					if (browser.name[i] != navegador) {
						//estrutura do container com os icones
						var $crossBrowserInstallLink = $('<a/>').attr({'target':'blank','href':browser.url[i]}),
							$crossBrowserInstallIco  = $('<img/>').addClass('crossBrowserIco').attr({"src":path+browser.image[i]+".gif","alt":"icone","title":"Atualizar o "+navegador})
																  .css({"border":"none","width":"49px","margin":"auto 10px"});
							//inseindo na página
							$('.crossBrowserInstall').append($crossBrowserInstallLink.append($crossBrowserInstallIco));
						
					}
					//se o browser.name é igual ao navegador do usuário é listado no box crossBrowserUpdate
					else {
						var $crossBrowserUpdateLink = $('<a/>').attr({"target":"blank","href":browser.url[i]}),
							$crossBrowserUpdateIco  = $('<img/>').addClass("crossBrowserIco").attr({"src":path+browser.image[i]+".gif","alt":"icone","title":"Atualizar o "+navegador})
																 .css({"border":"none","width":"49px","height":"49px"});
						$(".crossBrowserUpdate").append($crossBrowserUpdateLink.append($crossBrowserUpdateIco));
						
					}
				}				
			
			}
			//html do box que exibe o alerta ao usuário
			function alertaBrowserAntigo() {				
				
					var $crossBrowserBar 		= $('<div/>').addClass('crossBrowserBar')
												      .css({'width':'100%', 'display':'none', 'visibility':'hidden', 'position':'relative', 'margin-bottom':'5px', 'background-color':'#e0e0e0', 'font-family':'Arial'}),
					$crossBrowserBarIcoAlert 	= $('<img/>').css({'margin-top':'18px', 'margin-left':'27px', 'float':'left', 'width':'50px', 'height':'47px'})
											              .attr({'title':'alerta','alt':'exclamacao','src':''+opts.path+'ico_alerta_crossbrowser.gif'});
					$crossBrowserBarTxt 		= $('<p/>').css({'width':'auto', 'height':'auto', 'float':'left', 'margin':'15px 10px', 'font-weight':'bold'})
					$crossBrowserBarTxt.append($('<span/>').css({'font-size':'14px'}).text('Seu '+navegador+' '+versao+' está DESATUALIZADO').after('<br/>'))
									   .append($('<span/>').css({'font-size':'10px'}).html(opts.textWarn));
					$crossBrowserUpdateBox 		= $('<div/>').css({'width':'127px', 'height':'50px', 'margin-top':'15px', 'margin-right':'20px', 'float':'left'})
														   .append($('<strong/>').css({'color':'#e30d3e', 'float':'left', 'margin-right':'10px', 'margin-top':'18px'}).text('Atualizar'))									   
														   .append($('<div/>').addClass('crossBrowserUpdate').css({'float':'right'}));
					$crossBrowserInstallBox 	= $('<div/>').css({'float':'left', 'width':'385px'})
					                                     .append($('<strong/>').css({'font-size':'12px', 'margin-top':'25px', 'color':'#666', 'margin-right':'10px', 'text-align':'right', 'float':'left'}).html('Instalar um<br/>outro navegador'))
					                                     .append($('<div/>').addClass('crossBrowserInstall').css({'margin-top':'13px'}));
					$crossBrowserIcoClose 		= $('<img/>').addClass('crossBrowserClose crossBrowserIco')
													   .css({'position':'absolute', 'cursor':'pointer', 'top':'10px', 'right':'10px', 'width':'13px', 'height':'13px'})	
													   .attr({'title':'Fechar','alt':'fechar','src':opts.path+'ico_fechar.gif'});
					$clear						= $('<div/>').css({'clear':'both'});
					$crossBrowserBar.append($crossBrowserBarIcoAlert,$crossBrowserBarTxt,$crossBrowserUpdateBox,$crossBrowserInstallBox,$crossBrowserInstallBox,$crossBrowserIcoClose,$clear);
					//inserindo no doom
					$("body").children().first().before($crossBrowserBar)
				
				listandoNavegadores();
				
				//abre o alerta com efeito slideDown
				$(".crossBrowserBar").css({visibility: "visible", dipslay: "block"}).slideDown("slow");
				
				//efeito nos icones dos browser e no botao fechar
				$('.crossBrowserIco').mouseover(function() {
					$(this).fadeTo("fast", 0.80);
				 });
				$('.crossBrowserIco').mouseout(function() {
					$(this).fadeTo("fast", 100);
				});
				
				//fecha o alerta com efeito slideUp e remove o código após 1.5 segundos
				$(".crossBrowserClose").click(function() {
					$(".crossBrowserBar").slideUp("slow");
					setTimeout(function() {$(".crossBrowserBar").remove();}, 1500);			
				});
			
			}//fim alertaBrowserAntigo()
			
			//html do box que exibe o alerta bloqueando o acesso do usuário
			function semAcessoBrowserAntigo() {
				
				var $crossBrowserContainerSemAcesso = $('<div/>').addClass('crossBrowserContainerSemAcesso')
																 .css({'width':'100%', 'position':'absolute', 'z-index':'9999'}),
					$crossBrowserOpacity			= $('<div/>').addClass('crossBrowserOpacity')
																 .css({'background-color':'#000', 'filter':'alpha(opacity=60)', '-moz-opacity':' 0.60', 'opacity':' 0.60', 'position':'absolute', 'z-index':'9999', 'width':'100%'}),
					$crossBrowserAlertaSemAcesso    = $('<div/>').addClass('crossBrowserAlertaSemAcesso')
														         .css({'position':'relative', 'z-index':'9999', 'font-family':'Arial', 'width':'600px', 'height':'255px', 'padding':'5px', 'background-color':'#fff'}),
				    $crossBrowserAlertaSemAcessoTitulo = $('<h5/>').addClass('crossBrowserAlertaSemAcessoTitulo')
				    											   .css({'height':'33px', 'padding-top':'20px', 'background-color':'#e30d3e', 'font-size':'16px', 'font-family':'Arial', 'color':'#fff', 'text-align':'center'})
				    											   .text('Seu '+navegador+' '+versao+' está DESATUALIZADO'),
				    $crossBrowserAlertaSemAcessoMsg = $('<p/>').addClass('crossBrowserAlertaSemAcessoMsg')
				    										   .css({'text-align':'center', 'margin':'5px 0 10px', 'color':'#333', 'font-size':'14px', 'font-family':'Arial', 'padding':'20px 30px', 'font-weight':'bold', 'background-color':'#e0e0e0'})
				    										   .text(opts.textDeny),
				    $crossBrowserAlertaSemAcessoIcones = $('<div/>').addClass('crossBrowserAlertaSemAcessoIcones')
				    												.css({'height':'80px', 'padding-left':'23px'});
				    $crossBrowserAlertaSemAcessoIcones.append($('<div/>').css({'width':'132px', 'margin-right':'44px', 'float':'left'})
				    										 			 .append($('<span/>').css({'width':'70px', 'color':'#e30d3e', 'font-size':'16px', 'font-weight':'bold', 'float':'left', 'padding-top':'20px', 'clear':'none'})
				    										 			 					 .text('Atualizar')	
				    										 			 	).append($('<div/>').addClass('crossBrowserUpdate')
				    										 			 		                .css({'width':'50px', 'float':'right', 'clear':'none'}))
				    									).append($('<div/>').css({'width':'400px', 'float':'left'})
				    									 .append($('<span/>').css({'width':'110px', 'padding-top':'12px', 'font-size':'12px', 'float':'left', 'font-weight':'bold', 'color':'#666', 'text-align':'right'})
				    										 			 					 .text('Instalar um outro navegador')	
				    										 			 	).append($('<div/>').addClass('crossBrowserInstall')
				    										 			 		                .css({'padding-left':'10px', 'float':'left'}))
				    									    );

				    $crossBrowserAlertaSemAcesso.append($('<div/>').append($crossBrowserAlertaSemAcessoTitulo,$crossBrowserAlertaSemAcessoMsg,$crossBrowserAlertaSemAcessoIcones))
				    $crossBrowserContainerSemAcesso.append($crossBrowserAlertaSemAcesso);
				 	$("body").children().first().before($crossBrowserOpacity, $crossBrowserContainerSemAcesso)   									
				
				
				//chamando a função para listar os navegadores
				listandoNavegadores();
				
				//efeito opacidade para dar aparencia de lightbox ao div crossBrowserOpacity
				$(".crossBrowserOpacity").css("height",document.documentElement.clientHeight);
				//overflow hidden para corrigir um bug em um dos navegadores
				$("body").css("overflow","hidden");
				
				//centralizando horizontalmente e verticalmente o box que exibe a mensagem de alerta para o bloqueio
				var crossBrowserAlertaMgTopo = (document.documentElement.clientHeight - $('.crossBrowserAlertaSemAcesso').height()) / 2;
				var crossBrowserAlertaMgLeft = (document.documentElement.clientWidth - $('.crossBrowserAlertaSemAcesso').width()) / 2;
				$(".crossBrowserAlertaSemAcesso").css("top",crossBrowserAlertaMgTopo);
				$(".crossBrowserAlertaSemAcesso").css("left",crossBrowserAlertaMgLeft);
						
			}//fim semAcessoBrowserAntigo()
			
			//executa um loop com os navegadores
			for (k=0;k<opts.navegadorLista.deny.length;k++) {
			//usando o padrão com barra para dar um split e assim ter apenas a versão do navegador e ser comparado
			var navegadorVersao = opts.navegadorLista.deny[k].split("/");
			//converte a versão para float tendo assim um padrão para comparação
			parseFloat(navegadorVersao[1]);
			//se o navegador presente na lista for igual ao navegador do usuário e a versão do navegador presente na lista for igual a versão do navegador do usuário
			if (navegadorVersao[0] == navegador && versao <= navegadorVersao[1]) {
					semAcessoBrowserAntigo();	
					return false; //interrompe a execução após executar a função semAcessoBrowserAntigo
				}//fecha if
			}//fecha for
			
			//executa um loop com os navegadores
			for (k=0;k<opts.navegadorLista.warn.length;k++) {
			//usando o padrão com barra para dar um split e assim ter apenas a versão do navegador e ser comparado
			var navegadorVersao = opts.navegadorLista.warn[k].split("/");
			//converte a versão para float tendo assim um padrão para comparação
			parseFloat(navegadorVersao[1]);
			//se o navegador presente na lista for igual ao navegador do usuário e a versão do navegador presente na lista for igual a versão do navegador do usuário
			if (navegadorVersao[0] == navegador && versao <= navegadorVersao[1]) {
					alertaBrowserAntigo();	
					return false; //interrompe a execução após executar a função alertaBrowserAntigo
				}//fecha if
			}//fecha for
			
    })
}
