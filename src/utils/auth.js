const jwt = require('jsonwebtoken');
const config = require('./config');

const jwtModule = {};

jwtModule._getSecret = function() {

    const secret = config.getConfig().secret;

    return secret;

}

jwtModule.generateToken = async (id, secret = null, expiresIn = '15 minutes') => {

    if(!secret){
        secret = jwtModule._getSecret();
    }

    console.log('the default secret: ', secret);

    const token = jwt.sign({_id: id}, secret, {
        expiresIn
    });

    return token;


}

jwtModule.verify = async (token, secret = null) => {

    if(!secret){
        secret = jwtModule._getSecret();
    }

    return jwt.verify(token, secret);

}

module.exports = jwtModule;