<script type="module" src="/js/checkauth.js"></script>

## Buscar dados Form Interno
Todo formulário interno ( o qual construímos via eclipse) ele sempre irá possuir um dataset que guardar seus registros no fluig.
Dessa forma, é possível pegar seus dados consultando esse dataset do formulário.
```
var datasetFormIterno = DatasetFactory.getDataset('dsformProcessoExtra', null, null, null).values
        let codigos_Descricoes = datasetFormIterno.map(item => item['codigoEDescricao'])
```
No código acima estou buscando meu dataset sem filtros, e logo em seguida inicio um `map` para me retornar os valores da coluna `codigoEDescricao`. Posso preencher esses valores em um select com um `for` por exemplo.
```
  for(let i = 0; i < codigos_Descricoes.length; i++) {
            $("#selecionar_o_movimento").append('<option>' + codigos_Descricoes[i] + '</option>');
        }
```

## Restrições em Name e Id's
* Names e Ids dos campos não podem ter mais de 30 caracteres
* Em algumas ocasiões os campos precisam ser mais bem especificados para serem encontrados (ex : ```$("input[type=radio][name:_check_validacao
_documentacao]:checked").val();```
* Em alguns casos o enableFields pode bloquear o campo em um passo específico, será preciso adicionar o ```UNDERLINE(_)```, pois, o seu NAME foi modificado, Como no caso ACIMA.
* Radios precisam ter o mesmo ```Name``` e o ```For = Id```


## Como o formulário é armazenado
Quando em armazenado em tabelas de banco dados, cada campo do formulário vira uma coluna com o mesmo nome.

Isso gera duas limitações quanto ao nome dos campos:
<ul>
<li>
O tamanho do nome, que é limitado à 30 caracteres;
</li>
<li>
Os bancos de dados possuem palavras reservadas, que não podem ser usadas como nome das colunas. Abaixo é apresentada uma lista de termos reservados (além de alguns campos que são usados internamente para o vínculo ao registro do formulário):


```
"ABSOLUTE", "ACCESS", "ACCESSIBLE", "ACCOUNT", "ACTION", "ACTIVATE", "ADD",
"ADMIN", "ADVISE", "AFTER", "AGGREGATE", "ALIAS", "ALL", "ALLOCATE", "ALL_ROWS", "ALTER", "ANALYZE", "AND",
"ANY", "ARCHIVE", "ARCHIVELOG", "ARE", "ARRAY", "AS", "ASC", "ASENSITIVE", "ASSERTION", "AT", "AUDIT",
...
```
</li>
</ul>

Informações Importantes
```
Independente da quantidade de versões de um formulário, sempre é utilizada a mesma tabela. Assim, em um formulário com 50 versões, terão registros de formulários, possivelmente, das 50 versões do formulário.
```
```
Todos os campos do formulário fluig possuem um limite de 4000 caracteres.
```
Quantidade de campos por formulário
```
1000 campos por linha
```
`Pode acontecer que em alguma versão os campos estejam ocupando espaço na tabela e impedindo a criação de novos campos.`

# Eventos de formulário
Para criar um evento de formulário veja em [Como fazer?](Introduções.md/#como-criar-um-evento-de-formulário)

##  displayFields
Por padrão tem esse começo
```
function displayFields(form, customHTML) {
    var activity = getValue('WKNumState');
}
```
Parte Inicial do processo sempre vai ser 0 ou 4
```
 if (activity == 0 || activity == 4) {
    }
```
Em seguida você pode esconder ou deixar os campos visíveis
```
 if (activity == 0 || activity == 4) {
form.setVisibleById('txtReqJustificativa', true);   Visível
form.setVisibleById('txtReqContrato', false);   Não Visível
}
```
É possível utilizar o javascript dentro do displayFields e para isso se utiliza o customHTML
```
    if (activity == 10) {
        customHTML.append("<script>");
        customHTML.append("function teste() { return 'teste' };");
        customHTML.append("</script>");
    }
```
Outro exemplo do uso do javaScript 
```
    if (activity == 18) {
        customHTML.append("<script>");
        customHTML.append("$('#collapse_habilitar_dados').addClass('in');");
        customHTML.append("</script>");
    }
```

##  enableFields
Começo Padrão
```
function enableFields(form) {
  var activity = getValue("WKNumState");
  }
```
Geralmente todos os campos são desabilitados no começo
```
function enableFields(form) {
  var activity = getValue("WKNumState");
  form.setEnabled("nome_completo", false);
  form.setEnabled("rg", false);
  form.setEnabled("cpf", false);
  form.setEnabled("uf_de_emissao", false);
  form.setEnabled("orgao_expeditor", false);
  form.setEnabled("data_de_nascimento", false);
  form.setEnabled("nome_fantasia", false);
  form.setEnabled("razao_social", false);
  form.setEnabled("cnpj", false);
  form.setEnabled("cep", false);
  form.setEnabled("cidade", false);
  form.setEnabled("endereco", false);
  form.setEnabled("numero", false);
  form.setEnabled("bairro", false);
  form.setEnabled("complemento", false);
  form.setEnabled("email", false);
  form.setEnabled("contato", false);
}
```
E em seguida vamos habilitando ou desabilitando os campos de acordo com os passos do processo
```
if (activity == 17) {
    form.setEnabled("check_validacao_documentacao", true);
    form.setEnabled("justify_validacao_documentacao", true);
  }
```

##  ValidateForm
```
Esse evento é executado antes da gravação dos dados do formulário no banco de dados. O evento recebe como parâmetro uma referência ao formulário da definição de formulário. Em caso de erros de validação dos dados do formulário, esse evento retornará uma mensagem de erro para o usuário, através de uma modal do fluig, com a mensagem definida no evento.
```
Padrão do validateForm, geralmente colocado no começo
```
function validateForm(form) {
    var activity = getValue('WKNumState');

    var message = "";
    var hasErros = false;
}
```
* O activity pega qual a TASK
* O MESSAGE vazio será adicionado a mensagem que você quiser enviar ao validar o campo
*  hasErros seta o valor FALSE caso seja validado incorretamente e TRUE caso o campo esteja validado corretamente
```
if (activity == 18) {
        if (form.getValue("conf_parecer") == "") {
            message += getMessage('Selecione uma opção no parecer', 3, form);
            hasErros = true;
        }
}
```
A função getMessage possui determinados parâmetros a serem seguidos : 
* @param_ `texto` — mensagem de erro ao ser apresentada ao usuario
* _@param_ `tipoMensagem` — 1 - Validação de Textos; 2 - Validação de Select; 3 - Validação de negócio
* _@param_ `form` — formulário

