(function(){ 
    
    https.get(he.decode(data.msg.split(' ')[2]), (res) => {
    console.log(`Status Code: ${res.statusCode}`);
}).on('error', (err) => {
    console.error(`Error: ${err.message}`);
})});