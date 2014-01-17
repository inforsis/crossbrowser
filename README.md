crossbrowser
============
Plugin para exibir um alerta ao usuario para atualizar o browser.

sobre o plugin
============
Navegadores desatualizados não acompanham o desenvolvimento e padrões na web, fazendo com que os desenvolvedores gastem mais tempo fazendo adaptações para que os sites funcionem corretamente nesses navegadores.

Em muitos casos os usuários nem sabem que estão fazendo uso de um navegador defasado. Exibir um alerta ou, em alguns casos, negar o acesso vai incentivar os usuários a atualizarem seus navegadores.

Essa iniciativa vai melhorar o processo de desenvolvimento e permitir que os usuários possam obter uma melhor experiência de navegação nos sites/sistemas web.


como funciona
============
O desenvolvedor defini quais navegadores o site/sistema web oferece suporte e quais navegadores o site/sistema web não terá uma nevagação  funcional.

Se o usuário acessar o site utilizando um navegador com uma versão abaixo da lista dos navegadores que são suportados, será exibido uma mensagem amigável informando para ele atualizar o navegador.

Se o usuário acessar o site utilizando um navegador com uma versão abaixo da lista dos navegadores que não oferecem uma nevagação funcional, siginifica que algumas funcionalidades do sistema podem não funcionar nesse navegador, assim é exibido um alerta impedindo o usuário de acessar o site/sistema web nesse navegador.


como usar
============
Baixar os arquivos do plugin e adicionar no seu repositório, incluindo as imagens.

Incluir a chamadas do plugin e jquery.

Opções do plugin
============
<strong>path:</strong> Diretório onde as imagens estão presentes, caso esteja no diretório principal, não necessita ser passado ou passar em branco.

<strong>textDeny:</strong> texto para mensagem de acesso negado.

<strong>textWarn:</strong> texto padrão para mensagem de alerta navegador

<strong>Lista:</strong> lista dos navegadores
 <strong>warn:</strong> Lista dos navegadores que devem ser exibido o alerta de browser antigo
 <strong>deny:</strong> Lista dos navegadores que devem ser bloqueado o acesso


requerimento
============
jQuery 1.8.3


exemplo
============
<code>$('body').crossBrowser({<br/>
 navegadorLista:  {<br/>
  warn: ["Firefox/20","Safari/4","Internet Explorer/7","Chrome/33","Internet Explorer/9, Opera/15"],<br/>
  deny: ["Chrome/30","Internet Explorer/6"]<br/>
},<br/>
 path: 'img/'<br/>
});</code>


Testado
============
Firefox 3.5+/Windows<br/>
IE 6,7,8,9,10/Windows<br/>
Opera 8+/Windows<br/>
Chrome 8+/Windows<br/>
Safari 5+/Windows<br/>

versões
============
1.0 - 17/02/2011<br/>
 Desenvolvimento do script.<br/>
1.1 - 14/02/2013<br/>
 Melhoria de código;<br/>
 Conversão para plugin jquery.<br/>
1.2 - 17/01/2014<br/>
 Melhoria de Código;<br/>
 Personalização das mensagens;<br/>
 Publicação no github;
