var excelExportView = require('../views/reference'),
    excelExportModel = require('../models/dataAccess');


var excelExport = function (conf) {
    this.conf = conf || {};

    this.view = new excelExportView();
    this.model = new excelExportModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

excelExport.prototype.get_insExcelLayout = function (req, res, next) {
    var self = this;
    
    var params = [
        { name: "noCuenta", value: req.query.noCuenta, type: self.model.types.STRING },
        { name: "fecha", value: req.query.fecha, type: self.model.types.STRING },
        { name: "descripcion", value: req.query.descripcion, type: self.model.types.STRING },
        { name: "referencia", value: req.query.referencia, type: self.model.types.STRING },
        { name: "desAmpliada", value: req.query.desAmpliada, type: self.model.types.STRING },
        { name: "tipoMovimiento", value: req.query.tipoMovimiento, type: self.model.types.STRING },
        { name: "cargo", value: req.query.cargo, type: self.model.types.DECIMAL },
        { name: "abono", value: req.query.abono, type: self.model.types.DECIMAL },
        { name: "grupoIns", value: req.query.grupoIns, type: self.model.types.INT }
    ];
    
    this.model.query('[DBO].[INS_LAYOUT_SP]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = excelExport;