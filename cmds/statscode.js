(async function(){ 
    rusky = data.msg
    words = rusky.split(' ')
    decodedWords = words.map(word => he.decode(word)); // Decodes each word separately
    
    try {
    const response = await fetch(decodedWords[1]);
    const body = await response.text();

    tbsend(body);
    }
    catch(ex){
        tbsend(ex)
    }
    
});