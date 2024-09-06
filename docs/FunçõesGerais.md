<script type="module" src="/js/checkauth.js"></script>


# Funções de uso geral


## Abrir modal do fluig:

```javascript
function handleOpenModal(id_button, id_modal) {
  $(`#${id_button}`).on("click", (e) => {
    $(`#${id_modal}`).show(500);
    $("#formulario").addClass("modal_parent");
    e.stopPropagation();
  });

  $(`#${id_modal}`).on("click", (e) => {
    e.stopPropagation();
  });
}
```

## 

```javascript
function handleOnChange(name, obs_id) {
    const obs = $(`#${obs_id}`);
    $(`#${obs_id}`).on("change blur keyup", () => {
      if (!isEmpty(obs.val())) {
        obs.css("border", "solid 1px rgb(204,204,204)");
      } else {
        obs.css("border", "solid 1px #CC3D3D");
      }
    });
  }`
```

## Transformar Inputs em Spans:

```javascript
function transformInputsEmSpans(div) {
    let inputs = $(`#${div} input`).toArray();
    $.each(inputs, (i, item) => {
      item.value = "TESTESTESTESTE"; //retirar isso
      $(item).replaceWith($("<br><span>" + item.value + "</span>"));
    });
  }
```

## Verificar Inputs com mais de X caracteres:

```javascript
let teste = $("input").toArray();
$.each(teste, (i, item) => {
  if (item.name.length > 30) {
    console.error("AQ  " + item.name);
  }
});
```


##  Validação de CPF:
```javascript
function is_cpf(cpf) {

  cpf = cpf.split('.').join('');
  cpf = cpf.split('/').join('');
  cpf = cpf.split('-').join('');

  if (cpf.length != 11) {
    return false;
  }

  if (cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999") {
    return false;
  }

  var soma = 0;
  for (i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  var resto = (soma * 10) % 11;
  
  if ((resto == 10) || (resto == 11)) {
    resto = 0;
  }

  if (resto != parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) {
    resto = 0;
  }

  if (resto != parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
```


##  Validação de CNPJ:
```javascript
function is_cnpj(cnpj) {

  cnpj = cnpj.split('.').join('');
  cnpj = cnpj.split('/').join('');
  cnpj = cnpj.split('-').join('');

  if (cnpj.length != 14) {
    return false;
  }
  
  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999") {
    return false;
  }

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho) + "";
  digitos = cnpj.substring(tamanho) + "";

  soma = 0;
  pos = tamanho - 7;
  
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho) + "";
  soma = 0;
  pos = tamanho - 7;

  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(1)) {
    return false;
  }
  return true;
}
```


##  Validação de CEP:
```javascript
async function is_cep(cep) {
  //arruma formatação cep para consulta
  cep = cep.split('-').join('');

  //verifica validade do cep digitado
  if (cep.length !== 8) {
    return false
  }

  //realiza consulta do cep
  let url = `https://viacep.com.br/ws/${cep}/json/`

  // puxa os dados da api
  let response = await fetch(url);

  // transforma os dados em json
  let data = await response.json();

  if (data.erro) {
    return false
  } else {
    return true
  }
}

Validação de campos vazios:
function isEmpty(item) {
  return item == "" || item == undefined || item == null
}
```

##  Mostrar todos os Campos Ocultos:
```javascript
$("[style*='display: none']").show()
```

## Pegar valores independente de _  ou span:
```javascript
function getVal(id) {
    let el = $('#' + id)
    if (el == undefined) {
        el = $('#_' + id)
        if (el.is('span')) {
            return el.text()
        }
        return el.val()
    }
    if (el.is('span')) {
        return el.text()
    }
    return el.val()
}
```

## Transformar String BRL (ex: R$4,67) para Float:
```javascript
function transformSringBRLToFloat(valor) {
	return parseFloat(new java.lang.String(valor)
		.replaceAll("[R$ ]", "")
		.replaceAll("[R$]", "")
		.replaceAll("[./]", "")
		.replaceAll("[,/]", ".")
		.trim());
}
```

## Preencher Selects:
```javascript
function getTemplatesRecibo(id, PastaId) {
    const folderId = getFolderId(PastaId);
    const templates = getDocument(folderId)
    $(id).find('option').remove().end();
    $(id).append($("<option>", {
        text: "",
        value: ""
    }))
    $.each(templates, (i, item) => {
        $(id).append($("<option>", {
            text: item.description,
            value: item.url
        }))
    })
}
```

## Checar valor nulo:
```javascript
function isEmpty(valor) {
  return valor == null || valor == "" || typeof valor === undefined;
}
```

