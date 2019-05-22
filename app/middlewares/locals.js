module.exports = function(req, res, next){
    res.locals.nick = 'NickName';
    res.locals.empresa = 817;
    next();
}; 
