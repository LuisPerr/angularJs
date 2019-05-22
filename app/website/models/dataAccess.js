var sql = require('mssql'),
    config = {};

//configuración genérica para modelo de acceso a datos
var DataAccess = function(config) {
    //Inicializamos el objeto config
    this.config = config || {};
    //Inicializamos la conexión
    connectionString = {
        user: this.config.parameters.SQL_user,
        password: this.config.parameters.SQL_password,
        server: this.config.parameters.SQL_server, // You can use 'localhost\\instance' to connect to named instance
        database: this.config.parameters.SQL_database,
        connectionTimeout: this.config.parameters.SQL_connectionTimeout,
        requestTimeout: 1800000
    };
    this.types = {
        INT: sql.Int,
        DECIMAL: sql.Decimal(18, 2),
        STRING: sql.VarChar(8000),
        DATE: sql.DateTime,
        BIT: sql.bit
    }
    this.connection = new sql.Connection(connectionString);
};

//método genérico para acciones get
DataAccess.prototype.query = function(stored, params, callback) {
    var self = this.connection;
    this.connection.connect(function(err) {
        // Stored Procedure
        var request = new sql.Request(self);
        // Add inputs
        if(params.length > 0){
            params.forEach(function(param) {
                request.input(param.name, param.type, param.value);
            });
        }

        request.execute(stored)
            .then(function(recordsets) {
                callback(null, recordsets[0]);
            }).catch(function(err) {
                callback(err);
            });
    });
};


//método genérico para acciones get
DataAccess.prototype.queryAllRecordSet = function (stored, params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure
        var request = new sql.Request(self);
        // Add inputs
        if (params.length > 0) {
            params.forEach(function (param) {
                request.input(param.name, param.type, param.value);
            });
        }
        request.execute(stored)
            .then(function (recordsets) {
                callback(null, recordsets);
            }).catch(function (err) {
                callback(err);
            });
    });
};





//método genérico para acciones post
DataAccess.prototype.post = function (stored,params, callback) {
    var self = this.connection;
    this.connection.connect(function (err) {
        // Stored Procedure 
        var request = new sql.Request(self);
        
        if(params.length > 0){
            params.forEach(function(param) {
                request.input(param.name, param.type, param.value);
            });
        }
        request.execute(stored, function (err, recordsets, returnValue) {
            if (recordsets != null) {
                callback(err, recordsets[0]);
            } else {
                console.log('Error al realizacion la insercción: ' + params + ' mensaje: ' + err);
            }
        });
    });
};

//exportación del modelo
module.exports = DataAccess; 