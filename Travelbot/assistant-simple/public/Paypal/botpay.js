//dependencies
const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

//Paypal Configurations
paypal.configure({
    'mode': 'sandbox', 
    'client_id': 'AYvjWgHFDjeTyqP-F7i-TGfJ8hJaLUXw_Qp5j9FBqGjGypJZoK9EtvJ3XDIxHDOlhXWWNoyO5kSOsYG8',
    'client_secret': 'EOAd5RuWnFDz8CmkqkQGrEeu7um-HlFiFQz_VKUgoxTR6q7uIavUzJxngKlynPljGi1oJKjAaT4bypmr' 
})

//set web application framework
const app = express();

//set template engine for Javascript
app.set('view engine', 'ejs');

//creat index.ejs route
app.get('/', (req, res) => res.render('index'));

//create pay route for form submission with below JSON object; assign available purchase item details 
app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        //"return_url" is the redirect for the user to be presented with payment page; payment still not executed at this point  
        "return_url": "http://localhost:8080/success",
        "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "American Airlines Ticket",
                "sku": "New York, NY to Los Angeles, CA; Date: July 7, 2019, 10:00 a.m.",
                "price": "500.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "500.00"
        },
        "description": "TRAVELBOT FLIGHT BOOKING"
    }]
};

//pay route above passed here as create_payment_json object; callback provides link to redirect user to payment page and supplies PayerID
paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});


app.get('/success', (req, res) => {
  //obtain PayerID from redirect link in paypal.payment.create() above 
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  //this object actually executes user payment on the server
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "500.00"
        }
    }]
  };

  //redirect in event that order is cancelled by user
  app.get('/cancel', (req, res) => res.send('Booking Cancelled'));

  //booking payment executed
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        //below object supplies purchase information and user data such as shipping address
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});

app.use( express.static( "public" ) );

//start server on port 8080
app.listen(8080, () => console.log('Server Started'));