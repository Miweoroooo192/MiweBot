const io = require("socket.io-client")
const fs = require("fs")
const { translate } = require('bing-translate-api');
const he = require("he");
const socket = io("https://www.windows93.net:8088", {
    reconnectionAttempts: Infinity, // Retry forever 
    reconnectionDelay: 1000, // Initial delay of 1 second 
    reconnectionDelayMax: 5000, // Maximum delay of 5 seconds 
    timeout: 10000, // Timeout of 10 seconds for a connection attempt
    forceNew: true,
    transportOptions: {
        polling: {
            extraHeaders: {
                "Accept": "*/*",
                "Accept-Encoding": "identity",
                "Accept-Language": "*",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Cookie": "",
                "Host": "www.windows93.net",
                "Origin": "http://www.windows93.net",
                "Pragma": "no-cache",
                "Referer": 'http://www.windows93.net/trollbox/index.php',
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
            }
        }
    }
});
configo=JSON.parse(fs.readFileSync('config.json').toString());
socket.emit("user joined", `${configo.prefix}${configo.name}`, "red", "", "");
if (configo.dev) {
    socket.send("/r bottest") 
}
function getCommands() {
	return fs.readdirSync('cmds').filter(j=>j.endsWith('.js')).map(e=>configo.prefix+e.slice(0,-3))
}
socket.on("message", async function(data) {
    if (data.msg.startsWith(configo.prefix)) {
        var cmd = he.decode(data.msg).split(' ')[0].slice(configo.prefix.length)
        if (fs.existsSync(`cmds/${cmd}.js`)) {
                try {
                    eval(fs.readFileSync(`cmds/${cmd}.js`).toString())(he.decode(data.msg).split(' ').slice(1),{nick:he.decode(data.nick),color:he.decode(data.color),home:data.home})
                }
                catch(e) {
                    socket.send("Error: " + e.toString())
                }
            }
            else {
                socket.send(`Command Not Found: ${cmd}`)
            }
    }
    
});