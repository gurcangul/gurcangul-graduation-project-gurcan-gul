module.exports = (app) => {
    app.use('/records', require('./routes/rocord'))
};