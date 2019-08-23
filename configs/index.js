switch(process.env.NODE_ENV) {
    case 'production':
        module.exports = require('./production');
    break;
    default:
        module.exports = require('./development');
    break;
}