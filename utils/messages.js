const moment = require('moment');

function formaMessage(username ,text){ 
    return{ 
        username ,
        text,
        date:moment().format('h:m a')

    };

}

module.exports = formaMessage;