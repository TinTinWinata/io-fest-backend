import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export const sendEmail = async (email: string, activationLinkId: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
  });

  const mailOptions: MailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "CariTahu",
    html: `<div id=":15g" class="a3s aiL msg-2564905172801731076">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td
            bgcolor="#f3f4f6"
            align="center"
            style="padding: 30px 10px 10px 10px;"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="500">
              <tbody>
                <tr>
                  <td bgcolor="#FAF9F7">
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      style="width: 100% !important;"
                    >
                      <tbody>
                        <tr>
                          <td align="center">
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              style="width: 100% !important;"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="padding: 10px 10px 25px 10px;"
                                    align="center"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <table
                              width="90%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0px 10px 10px 10px;
                                      font-size: 15px;
                                      line-height: 22px;
                                      font-family: Open Sans, Lucida,
                                        Lucida Sans, Lucida Grande, Arial,
                                        sans-serif !important;
                                      color: #4b5563;
                                    "
                                  >
                                    <p>
                                      Welcome to CariTahu! There's just one
                                      more step before you get to the fun
                                      part.
                                    </p>
                                    <p>
                                      Verify your CariTahu account by clicking
                                      on the button below:
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding: 0 10px 0 10px;">
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 15px 0 35px 0;"
                                  >
                                    <table
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td align="center">
                                            <a
                                              href="${
                                                process.env
                                                  .ACTIVATION_LINK_PATH +
                                                activationLinkId
                                              }"
                                              style="
                                                font-size: 22px;
                                                font-family: Open Sans, Lucida,
                                                  Lucida Sans, Lucida Grande,
                                                  Arial, sans-serif !important;
                                                font-weight: normal;
                                                color: #ffffff;
                                                text-decoration: none;
                                                background-color: #2563eb;
                                                border-top: 15px solid #2563eb;
                                                border-bottom: 15px solid
                                                  #2563eb;
                                                border-left: 25px solid
                                                  #2563eb;
                                                border-right: 25px solid
                                                  #2563eb;
                                                border-radius: 3px;
                                                display: inline-block;
                                              "
                                              target="_blank"
                                              data-saferedirecturl="https://www.google.com/url?q=https://www.CariTahu.com/core/verifyEmail?key%3D934a9d5d-0eb2-4333-a82e-80f57972f9cf&amp;source=gmail&amp;ust=1681680737787000&amp;usg=AOvVaw0LNmmPJd2-OxZUlD3whZJf"
                                            >
                                              <span class="il">
                                                Verify
                                              </span>
                                              my account
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <div
                              class="a6S"
                              dir="ltr"
                              style="opacity: 0.01; left: 305px; top: 566px;"
                            ></div>
                          </td>
                        </tr>
                        <tr>
                          <td
                            bgcolor="#FAF9F7"
                            align="center"
                            style="padding: 10px 15px 20px 15px;"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              align="center"
                              style="width: 100% !important;"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 15px;
                                      line-height: 22px;
                                      font-family: Open Sans, Lucida,
                                        Lucida Sans, Lucida Grande, Arial,
                                        sans-serif !important;
                                      color: #4b5563;
                                    "
                                  >
                                    Thanks for using CariTahu!
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="padding: 5px 0 0 0;"
                                  >
                                    <br />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td
            bgcolor="#f3f4f6"
            align="center"
            style="padding: 10px 15px 20px 15px;"
          >
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td bgcolor="#f3f4f6" align="center">
                    <table
                      width="500"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            style="
                              font-size: 14px;
                              line-height: 16px;
                              font-family: Open Sans, Lucida, Lucida Sans,
                                Lucida Grande, Arial, sans-serif !important;
                              color: #9ca3af;
                            "
                          >
                            <span
                              style="color: #d1d5db; font-size: 12px;"
                              class="m_-2564905172801731076appleFooter"
                            >
                              © 2023 RE JS JT, Anggrek Campus R 600
                            </span>
                            <br />
                            <br />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
