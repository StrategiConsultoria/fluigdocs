# Introduções de ferramentas


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







