onRecordBeforeCreateRequest((e) => {
    console.log("recieved record");
    const message = new MailerMessage({
      from: {
          address: "team@robozonenj.org",
      },
      //to:      [{address: e.record.email()}],
      to:      [{address: "acedaksh07@gmail.com"}],
      subject: "RoboZone Enrollment",
      html : "<html>yes</html>",
      // bcc, cc and custom headers are also supported...
    });

    console.log(message);
    console.log("sending email...");

    $app.newMailClient().send(message);
    console.log("sent!");
}, "signups")
