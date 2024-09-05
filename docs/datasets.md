# Datasets


## Utilizando datasets

 Para utilizar datasets precisamos entender alguns conceitos básicos antes. O consumo de datasets no fluig exige o uso de 3 parametros que são:  

 • **Nome do dataset:** Geralmente você vai chamar pelo nome que é encontrado na aba datasets no painel de controle do Fluig (lembrando que esse valor é uma string, então sempre chamar o nome do dataset entre aspas).

 • **returnFields:** Esse parâmetro se refere aos valores que você deseja que retorne do dataset, nesse campo chamamos uma string com o nome da coluna que desejamos obter.

 • **constraints:** Esse campo serve para filtrar o dataset, para criar uma constraint usamos a função DatasetFactory.createConstraint("colunaDoDataset", inicioDoFiltro, fimDoFiltro, ConstraintType.MUST), ConstraintType pode ter três valores possíveis .MUST (indica que todos os registros do Dataset devem satisfazer a esta condição), .SHOULD (indica que os registros do Dataset podem ou não atender à condição. Esse tipo é mais comum quando se necessita que um mesmo campo tenha valores A ou B) ou .MUST_NOT (indica que nenhum dos registros pode satisfazer a condição).
 Normalmente criamos as constraints como c1, c2, c3... e juntamos todas em uma variável constraints usando new Array(c1, c2, c3...);

 • **sortingFields:** Esse parâmetro serve para ordenar os valores filtrados e essa ordenação é feita de forma ascendente, caso atribua o valor null no canto desse parâmetro na função em que ele deve ser chamado, o dataset não realizara a ordenação. Costumamos usar como null pois a ordenação afeta no desempenho do processo, mas quando for necessário a ordenação, vale a pena usar esse parâmetro.

 • **return:** ao final criamos a variável dataset, que será onde os valores que queremos serão armazenados, para isso usamos a função DatasetFactory.getDataset("NomeDoDataset", returnFields, constraints, sortingFields).

```
var c1 = DatasetFactory.createConstraint("cardDocumentId", documentId, documentId, ConstraintType.MUST);
    var constraints = new Array(c1);
    var returnFields = new Array("workflowProcessPK.processInstanceId")
    var sortingFields = new Array("cardDocumentId");
    var dataset = DatasetFactory.getDataset("workflowProcess", returnFields, constraints, null);
    return dataset.values;
```
Na variável DATASET está o comando completo que será usado 
```
var dataset = DatasetFactory.getDataset(tabela, returnFields(campos retornados), constraints(c1), null(ordenação))
```
Para utilizar o datasetFactory no front é necessário utilizar a seguinte importação
```
<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
```

## Funções em Datasets


### pegar filhos de um PaiXFilho

```javascript
function getFormChildren(datasetId, documentId, tablename) {     
  const c1 = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST);     
  const c2 = DatasetFactory.createConstraint("tablename", tablename, tablename, ConstraintType.MUST);     
  const c3 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);     
  const constraints = new Array(c1, c2, c3);     
  const result = DatasetFactory.getDataset(datasetId, null, constraints, null);     
  return result; 
}
```


### Alterar o valor de qualquer campo de qualquer solicitação:
```javascript
function setValue(numProcess, fieldName, fieldValue) {
	const documentId = getDocumentId(numProcess);
			let c4 = DatasetFactory.createConstraint('sqlLimit', '300', '300', ConstraintType.MUST)
	const c1 = DatasetFactory.createConstraint("documentid", documentId, documentId, ConstraintType.MUST);
			const c2 = DatasetFactory.createConstraint("fieldName", fieldName, fieldName, ConstraintType.MUST);
			const c3 = DatasetFactory.createConstraint("fieldValue", fieldValue, fieldValue, ConstraintType.MUST);
			const constraints = new Array(c1, c2, c3, c4);
			const result = DatasetFactory.getDataset("dsSetCardValue", null, constraints, null);
	return result;
}
	
function getDocumentId(numProcess) {  
	const c1 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", numProcess, numProcess, ConstraintType.MUST);  
	let c4 = DatasetFactory.createConstraint('sqlLimit', '300', '300', ConstraintType.MUST)  
	const constraints = new Array(c1, c4);  
	const returnFields = new Array("cardIndexDocumentId", "cardDocumentId");  
	const dataset = DatasetFactory.getDataset("workflowProcess", returnFields, constraints, null);  
	return dataset.values[0].cardDocumentId;  
	}  
// setValue("ID_AQUI", 'CAMPO', 'VALOR')
```

### Pegar número de processo:
```javascript
function getNumProcess(documentId) {
    var c1 = DatasetFactory.createConstraint("cardDocumentId", documentId, documentId, ConstraintType.MUST);
    var constraints = new Array(c1);
    var returnFields = new Array("workflowProcessPK.processInstanceId")
    var dataset = DatasetFactory.getDataset("workflowProcess", returnFields, constraints, null);
    var numProces = dataset.getValue(0, "workflowProcessPK.processInstanceId");
    return numProces;
}
```

## Sincronização de datasets

### Na criação de datasets o fluig nos da 4 funções

Com essas funções é possível realizar a sincronização dos datasets criados.

defineStructure - Irá definir a estrutura do nosso dataset e irá setar uma chave primária
```javascript
function defineStructure() {
    addColumn("CODCOLIGADA");
    addColumn("IDMOV");
    addColumn("HISTORICO");
    addColumn("PASSAGEIRO");
    addColumn("CADASTRANTE");
    addColumn("SOLICITANTE");
    addColumn("AUTORIZANTE");
    setKey(["CODCOLIGADA"]);
}();
```
onSync - É chamado quando se coloca o fluig para sincronizar o dataset
```javascript
function onSync(lastSyncDate) {


    var dataset = DatasetBuilder.newDataset();
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("dsProcessoViagemTMOV", null, null, null);

    var ifNull = function (value, ifNullValue) {
        return value == null || value == "" ? ifNullValue : value;
    }

    if (newerDataset != null) {
        var updated = [];

        for (var i = 0; i < newerDataset.rowsCount; i++) {
            dataset.addOrUpdateRow([
                ifNull(newerDataset.getValue(i, "CODCOLIGADA"), ""),
                ifNull(newerDataset.getValue(i, "IDMOV"), ""),
                ifNull(newerDataset.getValue(i, "HISTORICO"), ""),
                ifNull(newerDataset.getValue(i, "PASSAGEIRO"), ""),
                ifNull(newerDataset.getValue(i, "CADASTRANTE"), ""),
                ifNull(newerDataset.getValue(i, "SOLICITANTE"), ""),
                ifNull(newerDataset.getValue(i, "AUTORIZANTE"), "")
            ]);
            updated.push(newerDataset.getValue(i, "CODCOLIGADA"));
        }

        if (olderDataset != null) {
            for (var i = 0; i < olderDataset.rowsCount; i++) {
                if (updated.indexOf(olderDataset.getValue(i, "CODCOLIGADA") == -1)) {
                    dataset.deleteRow([
                        ifNull(olderDataset.getValue(i, "CODCOLIGADA"), ""),
                        ifNull(olderDataset.getValue(i, "IDMOV"), ""),
                        ifNull(olderDataset.getValue(i, "HISTORICO"), ""),
                        ifNull(olderDataset.getValue(i, "PASSAGEIRO"), ""),
                        ifNull(olderDataset.getValue(i, "CADASTRANTE"), ""),
                        ifNull(olderDataset.getValue(i, "SOLICITANTE"), ""),
                        ifNull(olderDataset.getValue(i, "AUTORIZANTE"), "")
                    ]);
                }
            }
        }
    }

    return dataset;

}
```
createDataset - Cria o Dataset para consulta, recebe como parâmetros os campos, as contraints e a ordenação.
```javascript
function createDataset(fields, constraints, sortFields) {
    try {
        var result;
        var dataset = DatasetBuilder.newDataset();
        dataset.addColumn("CODCOLIGADA");
        dataset.addColumn("IDMOV");
        dataset.addColumn("HISTORICO");
        dataset.addColumn("PASSAGEIRO");
        dataset.addColumn("CADASTRANTE");
        dataset.addColumn("SOLICITANTE");
        dataset.addColumn("AUTORIZANTE");

        var IDMOV = 987788;

        var endpoint = '/api/framework/v1/consultaSQLServer/RealizaConsulta/WSDiariaTMOV/21/T?parameters=IDMOV=' + IDMOV;
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId: 1 + '',
            serviceCode: 'RM_WSDATASERVER_REST',
            endpoint: endpoint + '',
            method: 'get',
            timeoutService: '100',
            options: {
                encoding: 'UTF-8',
                mediaType: 'application/json'
            },
            headers: {},
            params: {}
        }

        try {
            result = clientService.invoke(JSON.stringify(data));
        } catch (e) {
            throw "dsProcessoViagemTMOV => Não se conectou ao endpoint REST do RM: " + e + "";
        }

        result = JSON.parse(result.getResult())

        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                var item = result[i];
                dataset.addRow(new Array(
                    item.CODCOLIGADA.toString(),
                    item.IDMOV.toString(),
                    item.HISTORICO.toString(),
                    item.PASSAGEIRO.toString(),
                    item.CADASTRANTE.toString(),
                    item.SOLICITANTE.toString(),
                    item.AUTORIZANTE.toString()
                ));
            }
        } else {
            throw "dsProcessoViagemTMOV =======> Não existem dados"
        }

        return dataset
    } catch(e) {
        throw "dsProcessoViagemTMOV ======> Ocorreu um erro ao iniciar a criação do dataset: " + e + "";
    }
}
```
onMobileSync - Essa função é específica para o uso de datasets em aplicativos móveis. Ela permite que você sincronize dados entre o aplicativo móvel e o servidor do Fluig. 
```javascript
function onMobileSync(user) {

}
```

var dsName = "dsConsultaFuncionarioJornalizado";
var objColumn = [
	{ NAME: "EMAIL", TYPE: "", KEY: true },
	{ NAME: "NOME", TYPE: "", KEY: false },
	{ NAME: "CODUSUARIO", TYPE: "", KEY: false },
	{ NAME: "CODSITUACAO", TYPE: "", KEY: false },
	{ NAME: "CODVEN", TYPE: "", KEY: false },
];

function defineStructure() {
	let key = [];
	objColumn.forEach(function (row) {
		let type = undefined;
		if (row.TYPE == "NUMBER") {
			type = DatasetFieldType.NUMBER;
		}
		if (row.KEY) {
			key.push(row.NAME);
		}
		addColumn(row.NAME, type);

	});

	if (key.length > 0) {
		setKey(key);
		addIndex(key);
	}

}
# Datasets jornalizados

## Sincronização de dataset jornalizado
O código faz uma sincronização com um dataset existente, atualizando os registros que existirem no dataset e adicionando os novos registros.  
Caso não haja nenhum registro no dataset, o dataset jornalizado ficará como estava e não vai sincronizar.
(Evita problema em que na sincronização com o RM um dataset ficava vazio, com um jornalizado ele mantém os dados)
```javascript
function onSync(lastSyncDate) {
	const dataset = DatasetBuilder.newDataset();
	const newerDataset = createDataset();
	const olderDataset = DatasetFactory.getDataset('dsConsultaFuncionarioJornalizado', null, null, null);

	// Condições
	// 1. Insert (addRow): Existe no newerDataset e não existe no olderDataset
	// 2. Update (updateRow): Existe no newerDataset e existe no olderDataset
	// 3. Delete (deleteRow): Existe no olderDataset e não existe no newerDataset

	try {
		let startTime = java.lang.System.nanoTime();

        if (olderDataset != null || olderDataset != undefined) {
            if(olderDataset.rowsCount == 0 && newerDataset != undefined && newerDataset != null){
                for (let i = 0; i < newerDataset.rowsCount; i++) {
                    let valuesArray = [];
                    objColumn.forEach(function (column) {
                        valuesArray.push(newerDataset.getValue(i, column.NAME));
                    });
                    dataset.addRow(valuesArray);
                }
                return dataset;
            }
        }
        
        //VERICA SE 0 DATASET SINCRONIZADO ESTÁ VAZIO
        if (newerDataset != undefined && newerDataset != null) {
			let keys = 0
			let adicionados = 0
			let deletados = 0
			let atualizados = 0

			let oldDataMap = new java.util.HashMap();

			//MONTA UM HASHMAP COM OS DADOS DO DATASET ANTIGO
			for (let j = 0; j < olderDataset.rowsCount; j++) {
				let key = "";
				let rowObject = {};

				objColumn.forEach(function (column) {
					let columnName = column.NAME;
					rowObject[columnName] = olderDataset.getValue(j, columnName);
					if (column.KEY) {
						key += olderDataset.getValue(j, columnName);
					}
				});

				oldDataMap.put(key, rowObject);
			}

			log.dir("Sincronizando dataset jornalizado: " + dsName)
			log.dir("Quantidade de linhas do novo dataset: " + newerDataset.rowsCount)
			log.dir("Quantidade de linhas do antigo dataset: " + olderDataset.rowsCount)

			//PERCORRE O NOVO DATASET
			for (let i = 0; i < newerDataset.rowsCount; i++) {
				let newerKey = "";

				//MONTA A CHAVE DE COMPARAÇÃO USANDO A MESMA LOGICA QUE FOI UTILIZADA NO HASHMAP
				objColumn.forEach(function (column) {
					if (column.KEY) {
						newerKey += newerDataset.getValue(i, column.NAME);
					}
				});

				// VERIFICA SE A CHAVE EXISTE NO HASHMAP
				if (oldDataMap.containsKey(newerKey)) {
					keys++
					let oldRow = oldDataMap.get(newerKey);
					let shouldUpdate = false;
					let valuesArray = [];

					// VERIFICA SE O REGISTRO FOI ALTERADO
					objColumn.forEach(function (column) {
						let columnName = column.NAME;
						let newValue = newerDataset.getValue(i, columnName);
						valuesArray.push(newValue);
						if (newValue != oldRow[columnName]) {
							shouldUpdate = true;
						}
					});

					if (shouldUpdate) {
						atualizados++;
						dataset.updateRow(valuesArray);
					}

					// COMO O REGISTRO EXISTE NOS DOIS DATASETS, DEVE SER REMOVIDO DO HASHMAP PARA QUE NO FINAL SOBREM APENAS OS REGISTROS QUE DEVEM SER DELETADOS
					oldDataMap.remove(newerKey);

				} else {
					// SE ELE EXISTIR NO NOVO DATASET E NÃO EXISTIR NO ANTIGO, ADICIONA
					adicionados++;
					let valuesArray = [];
					objColumn.forEach(function (column) {
						valuesArray.push(newerDataset.getValue(i, column.NAME));
					});

					dataset.addRow(valuesArray);
				}
			}

			// REGISTROS QUE SOBRARAM NO HASHMAP, OU SEJA, REGISTROS QUE EXISTEM NO ANTIGO MAS NÃO EXISTEM NO NOVO, DEVEM SER DELETADOS
			let iterator = oldDataMap.keySet().iterator();
			while (iterator.hasNext()) {
				let key = iterator.next();
				deletados++;
				let oldRow = oldDataMap.get(key);
				let valuesArray = [];
				objColumn.forEach(function (column) {
					valuesArray.push(oldRow[column.NAME]);
				});

				dataset.deleteRow(valuesArray);
			}

			log.dir("Dados da sincronização do dataset jornalizado: " + dsName)
			log.dir("Quantidade de keys que deram match: " + keys)
			log.dir("Quantidade de adicionados: " + adicionados)
			log.dir("Quantidade de deletados: " + deletados)
			log.dir("Quantidade de atualizados: " + atualizados)

			let endTime = java.lang.System.nanoTime();
			let duration = (endTime - startTime) / 1000000;
			log.info("Tempo de execução: " + duration + " ms");

		} else {
			reportErro("retornoVazio");
		}
	} catch (e) {
		reportErro("erroAoSincronizar");
		throw new Error('Erro ao sincronizar ' + e);
	}
	return dataset;
}


function createDataset(fields, constraints, sortFields) {

	try {
		const dataset = DatasetBuilder.newDataset();

		const syncedDs = DatasetFactory.getDataset('dsConsultaFuncionario', null, null, null); // dataset sincronizado ou fonte de dados

		if (syncedDs == null) {
			throw new Error('Erro ao sincronizar');
		}

		if (syncedDs.rowsCount <= 1) {
			throw new Error('Erro ao sincronizar');
		}

		buildRows(dataset, syncedDs)
		return dataset

	} catch (e) {
		reportErro("retornoVazio");
	}

}

function buildRows(dataset, res) {
	// Adiciona as colunas
	for (var i = 0; i < res.columnsName.length; i++) {
		dataset.addColumn(res.columnsName[i]);
	}

	// adiciona as rows
	for (var i = 0; i < res.values.length; i++) {
		dataset.addRow(res.values[i]);
	}
}

function reportErro(template) {
	const c1 = DatasetFactory.createConstraint("TEMPLATE", template, template, ConstraintType.MUST);
	const c2 = DatasetFactory.createConstraint("DATASETNAME", dsName, dsName, ConstraintType.MUST);
	const constraints = [c1, c2];
	DatasetFactory.getDataset("dsJornalizadosEnviaEmail", null, constraints, null);
}
```