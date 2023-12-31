const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your Recent Order for ${total}</h2>
  <p>Please start walking over. We will have your order ready in the next 20 mins!</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}" />
      ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
  </ul>
  <p>Your total is <strong>${total}</strong>, due at pickup</p>
  <style>
        ul {
          list-style: none;
        }
  </style>
  </div>
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  // authentication variables
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Check if they have filled out the honeypot
  if (body.laBrea) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zzzzstt goodbye ERR 34234',
      }),
    };
  }
  // validate data coming in
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why didn't you order any pizzas?`,
      }),
    };
  }

  // send the email

  // send the success or error message

  // TEST send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
