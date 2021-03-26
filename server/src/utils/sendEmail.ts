import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string) {
  // const testAccount = await nodemailer.createTestAccount();
  // console.log('testaccount', testAccount);
  const testAccount = {
    user: 'vgmr2pmdujjl7jup@ethereal.email',
    pass: 'ZfeaygnyGTAdacS3t2'
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    subject: 'Change password',
    to,
    html
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
