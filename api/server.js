/*
LoopBack - Node.js framework
http://loopback.io/

express-node-mongo-skeleton/blobs.js at master · kacole2/express-node-mongo-skeleton · GitHub
https://github.com/kacole2/express-node-mongo-skeleton/blob/master/routes/blobs.js

tutorial-crud-node-express-mongodb/server.js at master · glaucia86/tutorial-crud-node-express-mongodb · GitHub
https://github.com/glaucia86/tutorial-crud-node-express-mongodb/blob/master/server.js
*/

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    moment = require('moment');

const mung = require('express-mung');

var db = require('./models/db'),
    Lancamento = require('./models/lancamento');

moment.locale('pt-BR');
var format_datetime = 'DD/MM/YYYY HH:mm:ss';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var router = express.Router();

class Resultado {
    constructor(name) {
        this.valido = true;
        this.mensagens = [];
    }
    AddError(err) {
        this.mensagens.push({
            Codigo: "000",
            Conteudo: err
        });
        this.valido = false;
    }
};

register_launch = (req, res) => {
    resultado = new Resultado();

    var timestamp_isvalid = moment(req.body.timestamp, format_datetime).isValid();

    if (req.body.username == "") {
        resultado.AddError("username is required.");
        res.json(resultado);
        return;
    }

    var lancamento = new Lancamento();
    lancamento.username = req.body.username;
    lancamento.description = req.body.description;
    if (timestamp_isvalid) {
        lancamento.automatic = false;
        lancamento.timestamp = moment(req.body.timestamp, format_datetime);
    }
    else {
        lancamento.automatic = true;
        lancamento.timestamp = moment();
    }

    try {
        lancamento.save(function (err) {
            if (err) {
                resultado.AddError(err);
            }
            res.json(resultado);
        });
    }
    catch (err) {
        console.error('Register_login => error:', err);
        resultado.AddError(err);
        res.json(resultado);
    }
};

history_launch = (req, res) => {
    var month = req.params.month;
    var year = req.params.year || moment().format('YYYY');
    //"timestamp": { "$gte": startDate, "$lte": endDate }
    var resultado = new Resultado();
    // Filtrar pelo mes/ano
    // resultado.mes = month;
    // resultado.ano = year;
    Lancamento.find({ calculate: true })
        .sort({
            timestamp: -1
        })
        .exec(function (err, launchs) {
            if (err) {
                resultado.AddError(err);
            }
            else
                resultado.lancamentos = launchs.map(function(item) {
                    var r = {};
                    r.id = item._id;
                    r.timestamp = moment(item.timestamp).format(format_datetime);
                    r.calculate = item.calculate;
                    r.username = item.username;
                    r.description = item.description;
                    return r;
                });

                

                //resultado.lancamentos = launchs
                // resultado.horas = launchs.reduce(function(valorAnterior, valorAtual, indice, array) {

                //     return valorAnterior + valorAtual;
                //   });
            res.json(resultado);
        });
};

response_invalido = (body, req, res) => {
    if (body.valido == false)
        res.status(400);

    return body;
};

app.use(mung.json(response_invalido));

router.post('/launch', register_launch);
router.get('/launch/:month/:year?', history_launch);

router.get('/rafael/:month/:year?', (req,res) =>{
    var resultado = new Resultado();
    now = moment('2018-01-24 09:00:00');
    end = moment('2018-01-24 12:35:00');
    var duration = Duration(now, end);
    resultado.calculo = 'Days: '+ duration.asDays() + ' Hours: '+ duration.asHours()+ ' min: ' +duration.asMinutes()
    res.json(resultado);
 
    //var resultado = new Resultado();
    // var month = req.params.month;
    // var year = req.params.year || moment().format('YYYY');
    // //"timestamp": { "$gte": startDate, "$lte": endDate }
    // var resultado = new Resultado();
    // // Filtrar pelo mes/ano
    // // resultado.mes = month;
    // // resultado.ano = year;
    // Lancamento.find({ calculate: true })
    //     .sort({
    //         timestamp: -1
    //     })
    //     .exec(function (err, launchs) {
    //         if (err) {
    //             resultado.AddError(err);
    //         }
    //         else
    //             var lancamentos = launchs.map(function(item) {
    //                 var r = {};
    //                 r.id = item._id;
    //                 r.timestamp = moment(item.timestamp).format(format_datetime);
    //                 r.calculate = item.calculate;
    //                 r.username = item.username;
    //                 r.description = item.description;
    //                 return r;
    //             });

    //             resultado.hor = launchs.reduce(function(valorAnterior, valorAtual, indice, array) {

    //             return valorAnterior + valorAtual;
    //             });

    //             //resultado.lancamentos = launchs
    //             // resultado.horas = launchs.reduce(function(valorAnterior, valorAtual, indice, array) {

    //             //     return valorAnterior + valorAtual;
    //             //   });
    //         res.json(resultado);
    //     });
});

Duration = (dtIni,dtFim) => {
    var now = moment(dtIni);
    var end = moment(dtFim);
    return moment.duration(end.diff(now));
}

app.use('/', router);
app.listen(port);
console.log('http://localhost:' + port);