try {
    var mongoose = require('mongoose'); 
 
    mongoose.connect('mongodb://192.168.2.240:1434/db_teste');
}
catch (err) {
    console.error('MONGO error:', err);
}
