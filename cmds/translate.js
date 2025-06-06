(function(){
    function getLastWord(str) {
    let words = str.trim().split(/\s+/); // Split by spaces and remove extra whitespace
    return words[words.length - 1]; // Get the last word
}
    translate(he.decode(data.msg).slice(2), null, he.decode(data.msg).split(' ')[1]).then(res => {
  socket.send(res.translation);
}).catch(err => {
  socket.send(err);
})
});