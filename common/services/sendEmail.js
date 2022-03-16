const nodemailer = require("nodemailer");

const sendEmail = async (...rest) => {   
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: rest[0], // generated ethereal user
            pass: rest[1], // generated ethereal password
        },
    });
    try {
        // console.log(to.join(","));
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Admin Panel"<${rest[0]}>`, // sender address
            to: `${rest[2].join(',')}`, // list of receivers
            subject: rest[3], // Subject line
            html: rest[4], // html body
            attachments:rest[5],
        });
        // console.log(info);
        return info;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;