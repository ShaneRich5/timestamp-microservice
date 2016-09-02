var express = require('express');
var moment = require("moment");
var app = express();

app.get('/:dateQuery', function(req, res) {
    var dateQuery = req.params.dateQuery;
    var date = null;
    
    if (dateRegex().test(dateQuery)) {
        date = moment(dateQuery, "MMMM D, YYYY");
    } else {
        date = moment(dateQuery, "X");
    }
    
    if (date && date.isValid()) {
        res.json({unix: date.format("X"), natural: date.format("MMMM D, YYYY")});
    } else {
        res.json({unix: null, natural: null});
    }
});

function unixRegex() {
    return /^\d{8,}$/;
}


function dateRegex() {
    return /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2}\s*,\s+\d{4}/;
}

app.listen(8080, function() {
    console.log('Timestamp microservice running on port 8080');
})