const {Client, LocalAuth,
	MessageMedia, ClientInfo, Buttons
      }       = require('whatsapp-web.js');
const express = require('express');
//const qrcode    = require('qr-image');
const http = require('http');
const qrcode = require('qrcode-terminal');
const fs      = require('fs');

const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


var id = "918618857406";
global.sessions = [];

app.get('/', function (req, res){
    res.send('Merhaba Express');
});


const client = new Client({
    puppeteer: {
      headless: true,
		args: [
			  '--no-sandbox',
			  '--disable-setuid-sandbox',
			  '--disable-dev-shm-usage',
			  '--disable-accelerated-2d-canvas',
			  '--no-first-run',
			  '--no-zygote',
			  '--single-process', // <- this one doesn't works in Windows
			  '--disable-gpu'
		],
    },
    authStrategy: new LocalAuth({
      clientId: id
    })
  });

client.on('authenticated', () => {
  console.log('WHATSAPP WEB => Authenticated');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on("ready", async () => {
  console.log("WHATSAPP WEB => Ready");
  //resolve(client);
  
    let button = new Buttons("Join *DCIG IT Storage analysts* _Ken Clipperton_ and _Todd Dorsey, Tanya Loughlin - Product Marketing_, and _Jason Hardy - Global CTO at Hitachi Vantara_, on *Tuesday, January 31, 2023, at 10:30 AM* to discuss the benefits of *Software-Defined Infrastructure: Transform & Secure IoT & Big Data Environments.*\r\n\r\nThis live webinar will explore and discuss:\r\n\r\n-  Modern approaches to consuming storage across IoT and big data environments.\r\n-  Insights into data under management that tackle the issues of increased poor data quality, performance, and management overhead.\r\n-  S3 cloud platform use cases: Data science, test/dev, streaming, video analytics, genomic sequencing, and CAD/CAM.\r\n\r\nClick on the following link and *register* online.\r\n\r\nhttp://bit.ly/3IlDU7U",[{id:'btn_yes',body:'Allow'},{id:'btn_no',body:'Block'}],"Hitachi Vantara webinar on 'Software-Defined Infrastructure' | January 31, 2023 | 10:30 AM","STOP Receiving message on behalf of Hitachi");
	
	//Lubna  = +919741300554
	//Shabaz = +919738522501
	var number = "+919738522501";
	number = number.replace(/\D/g, "");
	
	const text = "Hey TIJO";
	const chatId = number.substring(0) + "@c.us";
	
	console.log(chatId);
	
	// Sending message.
	client.isRegisteredUser(chatId).then(function(isRegistered) {
		console.log(isRegistered);
		if(isRegistered) {
		console.log("Sending BTN");
			//client.sendMessage(chatId, text);
			// sending buttons
			client.sendMessage(chatId,button);
			
		}
	});
  
  
});

client.on('message', message => {
console.log(message.body);
if(message.body === 'Allow') {
	message.reply('Thanks you for showing interest!');
}
});
 
client.initialize();

//Closing correcily using CTRL+C 
process.on('SIGINT', async () => {
    console.log('(SIGINT) Shutting down...');
    await client.destroy();
    console.log('client destroyed');
    process.exit(0);
});

server.listen(port, function() {
  console.log('App running on *: ' + port);
});