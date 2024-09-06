<script type="module" src="/js/checkauth.js"></script>


# Como fazer?


## PaiXFilho

 Este é um exemplo simples de uma tabela Pai x Filho

```
 <table border="1" tablename="teste" addbuttonlabel="Adicionar Filho" customFnDelete="fnCustomDelete(this)">
        <thead>
          <tr>
            <td><b>Nome</b></td>
            <td><b>Idade</b></td>
            <td><b>
                <font face="arial" size=5 color="blue">Sim:
              </b></td>
            <td><b>
                <font face="arial" size=5 color="blue">Não:
              </b></td>
          </tr>
        </thead>
        <tr>
          <td><input type="text" name="nomefilho"></td>
          <td><input type="text" name="idadefilho"></td>
          <td><input type="radio" name="nameradiofilho" id="idsimfilho" value="ant_yes"></td>
          <td><input type="radio" name="nameradiofilho" id="idnaofilho" value="ant_no"></td>
        </tr>
      </table>
```

Segundo a documentação do TDN FLuig(), tablename="teste"> - A propriedade tablename determina que Agora abaixo dessa tabela será implementado um sistema de `pai filho` dentro da definição de formulário. A tag `table` terá seus parâmetros varridos na busca de outros parâmetros relacionados à técnica que serão explicados mais adiante nesse texto. Será criada uma outra `table` ao redor da tabela principal que conterá um  botão que permite adicionar novos filhos. Isso não ocorrerá apenas em casos em que a propriedade noaddbutton também seja informada em conjunto com  a propriedade tablename.                                     

Existem algumas propriedades da tabela pai x filho que podem ser usadas no desenvolvimento dos formulários.

`nonoaddbutton` - Remove o botão padrão de deletar os filhos, permitindo implementar outro modo de excluir
```
<table tablename="teste" nodeletebutton=true>
```
`addbuttonlabel` - Determina o texto do botão de adicionar filho (opcional)
```
 <table tablename="teste" addbuttonlabel="Adicionar novo ingrediente">
```
`customFnDelete` - Permite a customização da função que é chamada ao clicar no botão que elimina um filho da tabela.

```javascript
  function fnCustomDelete(oElement) {
    FLUIGC.toast({
      title: 'Aviso: ',
      message: 'Filho excluído com sucesso!',
      type: 'success'
    });
    fnWdkRemoveChild(oElement);
  }
```

Algumas informações importantes :
```
Não estão disponíveis para serem utilizados como descrição dos registros de formulários na configuração do formulário;
```
```
não devem ser colocados no "head" ou "footer" de um HTML pois eles não serão considerados, coloque os campos apenas no "body".
```
```
O índice de formulário pai e filho é utilizado da seguinte forma ex: indice___1. Em input dinâmicos não é recomendado adicionar valores no atributo name após o indice.
```
```
Para utilizar campos radio button, além da definição padrão do componente html, é necessário que seja utilizado o atributo ‘value’ para os dados serem salvos corretamente.
```

 É possível utilizar apenas alguns elementos html:

<ul>
<li>text</li>
<li>radio button</li>
<li>checkbox</li>
<li>select</li>
<li>select multiple</li>
<li>shidden</li>
<li>textarea</li>
<li>image</li>
<li>button</li>
</ul>


## Como criar um evento de formulário?

Os eventos de formulários são um conjunto de scripts carregados pela API de Formulários, os quais são desenvolvidos utilizando Javascript e são chamados durante a execução de ação em formulários ou em momentos específicos de interação em formulários.

Geralmente em quase todos os nossos formulários estão presentes três destes eventos, displayFields, enableFields e validateForm.

Para criar um evento de formulário é preciso seguir os passos:
* Botão direito no Package Explorer do eclipse > New > Fluig Script > Script Evento da Definição de Formulário
* E por último relacionar o formulário o qual você quer utilizar o evento

# Referencias
[Eventos de Formulário - TDN](https://tdn.totvs.com/pages/releaseview.action?pageId=270924158)



# Como criar um evento de processo?

Os eventos de um processo são um conjunto de scripts carregados pela API de workflow. Tais scripts são desenvolvidos com o uso da linguagem JavaScript e chamados ao longo da execução do processo em momentos predeterminados, como por exemplo a criação da solicitação do processo ou a entrada em uma nova atividade.


Para criar um evento BeforeTaskSave ( o qual é executado sempre no início) ou AfterProcess (executado no final)

É preciso seguir os passos:
* Botão direito no Package Explorer do eclipse > New > Fluig Script > Script Evento Workflow > Nome do evento(Before ou After)
* E por último relacionar o processo o qual você quer utilizar o evento

Na utilização desses dois tipos de script é comum setar o número do processo no AfterProcessCreate

# Referencias
[Link Eventos de Processo - TDN](https://tdn.totvs.com/display/public/fluig/Eventos+de+Processos)


# Como criar um evento de global?
Os eventos globais do fluig são executados pela plataforma antes ou após alguma ação ocorrer (Ex: Aprovação de documento, movimentação de processo, publicação de comentário etc). Tais eventos podem ser personalizados através da linguagem Javascript. Os eventos são divididos em eventos do tipo before, que ocorre antes que a ação que disparou o evento seja efetivada e do tipo after, que ocorre após a ação acontecer.


Para criar um evento global é preciso seguir os passos:
* Botão direito no Package Explorer do eclipse > New > Fluig Global Event 
* E por último relacionar o servidor e o evento global


# Referencias
[Link Eventos de Globais - TDN](https://tdn.totvs.com/display/public/fluig/Desenvolvimento+de+Eventos)



