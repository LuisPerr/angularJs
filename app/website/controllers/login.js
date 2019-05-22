var LoginView = require('../views/reference'),
    LoginModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Login = function(conf) {
    this.conf = conf || {};

    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Login.prototype.get_login = function(req, res, next) {
    var self = this;
    var usuario = req.query.usuario;
    var contrasena = req.query.contrasena

    var params = [
        { name: 'usuario', value: usuario, type: self.model.types.STRING },
        { name: 'contrasena', value: contrasena, type: self.model.types.STRING }
    ];
    console.log( 'Ya llegue', params );
    // this.model.queryAllRecordSet('SEL_VALIDAUSUARIO_PRUEBA_SP', params, function(error, result) {
        self.view.expositor(res, {
            //error: error,
            result: 'Llegue'
        });
    // });
};

module.exports = Login;
