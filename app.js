// Módulos - Instalação comandos no terminal: > npm install express body-parser mysql
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Instância do express
const app = express();

// Conexão com MySQL
const sql = mysql.createConnection({
    host: 'database-1.c3viph2okjsl.us-east-1.rds.amazonaws.com',
    user: 'projetoweb',
    password: 'projetoweb',
    port: 3306

});

// Acessa o BD sae - meu banco de dados
sql.query("use sae");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// Middlewares - para carregar os arquivos CSS, JS, Imagens...
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));

// Rota da página cadastro - http://localhost:8081/
app.get('/', (req,res)=>{       
    res.sendFile(__dirname + '/cadastro.html');
});

// Rota (POST) que recebe os dados enviados pelo formulário (Funcionario e insere no BD)
app.post('/add-cadastro', (req,res)=>{
    res.sendFile(__dirname + '/locacao.html');
sql.query("insert into cadastro values (?,?,?,?,?,?,?,?)", [ ,req.body.nome, req.body.nascimento,
    req.body.email,
    req.body.matricula,
    req.body.setor,
    req.body.cargo,
    req.body.telefone

]);
});

app.post('/add-locacao', (req,res)=>{       
    res.sendFile(__dirname + '/cadastro.html');
sql.query("insert into locacao values (?,?,?,?,?,?,?)", [ ,req.body.tipoEquip, req.body.nomeEquip,
    req.body.codPat,
    req.body.nomeFun,
    req.body.data_hora,
    req.body.matriculaFun
]);
});


// Rota que recebe a requisição sem ou com parâmetro e responde com os dados do BD (Todos os dados ou Id)
app.get('/select/:id?', (req,res)=>{
    if(!req.params.parametro){
        sql.query("select * from cadastro order by id",(err, results, filds)=>{
            res.json(results);
    });
    }else {
        sql.query("select * from cadastro where id = ?",[req.params.parametro],(err, results, filds)=>{
            res.json(results);
        });
    }
}); 

// Rota que recebe a requisição com parâmetro e responde com os dados do BD (Nome) 
app.get('/select/nome/:parametro?', (req,res)=>{
    sql.query("select * from cadastro where nome = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

// Rota que recebe a requisição com parâmetro e responde com os dados do BD (Idade) 
app.get('/select/idade/:parametro?', (req,res)=>{
    sql.query("select * from cadastro where idade = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

// Rota que recebe a requisição com parâmetros e atualiza os dados do BD (Nome e/ou Idade) 
app.get('/update/:nome/:idade/:id', (req,res)=>{
    sql.query("update cadastro set nome = ?, idade = ? where id = ?",[req.params.nome, req.params.idade, req.params.id],(err, results, filds)=>{
        res.redirect('/cadastro');
    });
});

// Rota que recebe a requisição com parâmetro e apaga os dados do BD
app.get('/delete/:id',(req,res)=>{
    sql.query("delete from cadastro where id = ?",[req.params.id],(err,results,filds)=>{
        res.redirect('/cadastro');
    })
});

app.listen(8081, function(){ //http://localhost:8081/
    console.log('Servidor rodando!')
});