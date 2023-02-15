const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const tokenChecker = (req, res, next) => {

    let token;
    const authHeader = req.get("Authorization")

    if(authHeader) {
        token = authHeader.slice(7)
    }
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err) {
            console.log(err)
            res.status(401).json({message: "auth error"});
        } else {
            req.user_id = payload.user_id;
            next();
        }
    });
};
const catch404 = (req, res, next) => {
    // TODO: catch 404 may need to be tested
    next(createError(404));
}
const errorHandler = (err, req, res) => {
    // set locals, only providing error in development
    // TODO: errorHandler may need to be tested
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // respond with details of the error
    res.status(err.status || 500).json({message: 'server error'})
}

module.exports = {tokenChecker,errorHandler,catch404}