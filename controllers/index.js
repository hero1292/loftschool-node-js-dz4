const db = require('../database/config');
const transporter = require('../utils/mail');

exports.Index = async (ctx) => {
  const indexViewModel = {
    title: 'Home page',
    skills: db.get('skills').value(),
    products: db.get('products').value(),
    mail_status: ctx.flash.message_status
  };
  await ctx.render('pages/index', indexViewModel);
};

exports.SendEmail = async (ctx) => {
  const mailOptions = {
    from: '<test@gmail.com>',
    to: 'test@gmail.com',
    subject: 'Новое сообщение',
    html: `
    <h2>Вам новое сообщение</h2>
    <h3>Детали сообщения:</h3>
    <ul>  
      <li>Имя: ${ctx.request.body.name}</li>
      <li>Email: ${ctx.request.body.email}</li>
    </ul>
    <h3>Сообщение:</h3>
    <p>${ctx.request.body.message}</p>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

  ctx.flash = { message_status: 'Message successfully sended!' };
  await ctx.redirect('/#feedback-form');
};
