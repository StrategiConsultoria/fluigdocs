<h1 align="center">Documentação Fluig Dev</h1>
<p align="center"><i>Repositório para versionamento e documentação do projeto utilizado durante a série de artigos no GitHub.</i></p>

## Sobre este Projeto

Este README tem o objetivo de apresentar o objetivo deste repositório. O repositório foi criado para documentar as principais práticas em páginas e formulário do Fluig,
determinando também características que os devs precisam saber em processos da plataforma e exigências da ferramenta. Assim, facilitando a resolução de erros que venham a acontecer no cotidiano. Também será possível ver funções que são utilizadas com frequência na ferramenta.

O projeto inserido neste repositório é um modelo pré-existente e é utilizado como base para exibição de dados sobre o mesmo..

<p display="inline-block">
  <img width="48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png" alt="vscode-logo"/>
  <img width="48" src="https://www.eclipse.org/downloads/assets/public/images/logo-eclipse.png" alt="eclipse-logo"/>
  <img width="60" height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7SlZDvsvoXpJI7IEw-697fQ7go5FxBMLX3wPha-k_Eg&s" alt="rider-logo"/>
</p>

## Acessando a Documentação

A documentação do projeto está disponível no seguinte endereço:

[https://isacfg.github.io/fluigdocs/](https://isacfg.github.io/fluigdocs/)

## Instruções para Configuração do Ambiente

### Configurando o Ambiente Virtual (venv)

1. Crie um ambiente virtual para o projeto. No terminal, navegue até o diretório do projeto e execute o seguinte comando:

```bash
python3 -m venv venv
```

2. Ative o ambiente virtual. No terminal, execute o seguinte comando:

#### Linux

```bash
source venv/bin/activate
```

#### Windows

```bash
venv\Scripts\activate
```

3. Instale as dependências do projeto. No terminal, execute o seguinte comando:

```bash
pip install -r requirements.txt
```

## Servindo o Projeto localmente com o MkDocs

1. No terminal, navegue até o diretório do projeto e execute o seguinte comando:

```bash
mkdocs serve
```

## Publicando a Documentação no GitHub Pages

1. No terminal, faça commit das alterações na branch main do projeto.:

```bash
git add .
git commit -m "Atualizando a documentação"
git push
```
