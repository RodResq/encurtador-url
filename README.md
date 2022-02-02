# Visão geralal
O projeto tem por objetivo testar a funcionalidade e lógicas de redução de urls.

## Tecnologias
* Java 11
* Spring Boot
* Angula 10
* H2 DataBase, Mysql

## Instalação da aplicação

Faça o clone do repositório:
```shell
git clone https://github.com/RodResq/encurtador-url
```
## Steps - Executar o projeto com um fat jar

Step 1: Feito isso, acesse o projeto:
Entre na pasta do projeto:
```shell
cd encurtador-url
```

Step 2: Execute o seguinte comando para baixar as dependências e fazer o build do projeto:
```shell
mvn clean intall
```

Step 3: Execute o arquivo jar do projeto com o seguinte comando:
```shell
java -jar .\encurtador-url-backend\target\projeto.jar
```

### Acessando o projeto
```shell
http://localhost:8080/encurtador
```

## Steps - Excutar Backend e Frontend Separados
Step 1 - Entre na pasta do backend do projeto
```shell
cd encurtador-url-backend/
```

Step 2 - Execute o seguinte comando para executar
```shell
mvn spring-boot:run
```

Step 3 - Entre na pasta do frontend do projeto
```shell
cd encurtador-url-frontend/
```

Step 4 - Execute o seguinte comnado para rodar o frontend
```shell
ng serve --open
```

### Acessando o projeto
```shell
http://localhost:4200/encurtador
```

### Testando a API e os EndPoints no Postman ou Insomia:
Criando uma nova url reduzida
```shell
POST http://localhost:8080/encurtador-rest/api
```
Nessecário passar o json no corpo da requisição. Exemplo:
```json
{ 
	"urlOriginal": "www.google.com" 
}
```
Como retorno temos um json com a nova url reduzida criada:
```json
{
	"id": 1,
	"urlOriginal": "www.google.com",
	"dataHoraCriacao": "2022-02-01",
	"novaUrl": "zg.com.br/uCNIj"
}
```


Redirecionando para a url original, retorna o site da respectiva url:
```shell
GET http://localhost:8080/encurtador-rest/api/1
```

Verificando se uma url já existe:
```shell
GET http://localhost:8080/encurtador-rest/api/codigo/www.google.com
```
Dados Retornado
```json
{
	"id": 1,
	"urlOriginal": "www.google.com",
	"dataHoraCriacao": "2022-02-01",
	"novaUrl": "zg.com.br/FrxXK"
}
```


