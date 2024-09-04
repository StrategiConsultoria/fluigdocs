# Funções em Datasets


## pegar filhos de um PaiXFilho

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


## Alterar o valor de qualquer campo de qualquer solicitação:
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