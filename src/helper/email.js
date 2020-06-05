
function sendMsg (to, subject, text, HTML, arrayAttach =[]) {

	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: to,
		from: process.env.USERMSG,
		subject: subject,
		text: text,
		html: HTML,
	};
  sgMail.send(msg);
}

sendEmail('tbalmeida@gmail.com', 'Sending with Twilio SendGrid is Fun', 'and easy to do anywhere, even with Node.js', '<strong>and easy to do anywhere, even with Node.js</strong>')
sendMsg("tbalmeida@gmail.com", "Teste", "teste", "<h1>Teste</h1>")

