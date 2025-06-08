(function(){ 
    rusky = he.decode(data.msg.split(' '))
    https.get(rusky[2], (res) => {
    console.log(`Status Code: ${res.statusCode}`);
}).on('error', (err) => {
    console.error(`Error: ${err.message}`);
})});