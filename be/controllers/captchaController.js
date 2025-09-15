const svgCaptcha = require("svg-captcha");

const getCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,             
    noise: 2,            
    ignoreChars: "0o1i", 
    color: true,
    background: "#f6f6f6",
  });

  res.cookie("captcha_text", captcha.text, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", 
    maxAge: 5 * 60 * 1000, 
  });

  res.type("svg");
  res.status(200).send(captcha.data);
};

module.exports = { getCaptcha };
