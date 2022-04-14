# Nyna Airlines

This app was developed for my General Assembly Software Engineering Immersive Project 2. Built using the MERN stack with **Material UI**, Nyna airlines is a web-based Flight Booking System based on the Model View Controller (MVC) Architecture. All images found solely belongs to [Singapore Airlines](https://www.singaporeair.com).

## Features

- Ticket booking
- Flight Search
- Seat Selection
- Manage Booking

## APIs

- [Singapore Airlines Developer](https://developer.singaporeair.com/)
- [Stripe API](https://stripe.com/docs/api)

## Tech

### React (FrontEnd)

- Search
  - Search form with auto complete based on Destinations from SIA's API.
  - Mandatory form to query for flights
- ## Results
- PassengerDetails
- SeatSelector
- Summary
- Manage Bookings

### Express (BackEnd)

### MongoDB Atlas (Database)

| Purpose                  | HTTPS VERB |
| ------------------------ | ---------- |
| Display All Destinations | GET        |
| Check for Payment        | GET        |
| Create User              | POST       |
| Get Seats                | POST       |
| Get Booking              | POST       |
| Make Payment             | POST       |
| Get Flights              | POST       |

## Booking Flow Process

For payment, this project integrates stripe to allow for the payment of flight tickets selected by the user with a checkout page. In essence, stripe accepts a request made to its server and then returns a url that is a checkout page displaying payment options with flight tickets booked by the user earlier.
![Screenshot 2022-04-14 at 4 32 16 PM](https://user-images.githubusercontent.com/97426227/163346478-6f9f08b5-4939-49bd-aab2-9e3313084dbf.png)

Information such as the product's name, price, quantity and are sent to stripe and a url with all the product info is generated.

![Screenshot 2022-04-14 at 4 26 40 PM](https://user-images.githubusercontent.com/97426227/163345404-08cf18dc-b5c8-4bc7-b8c5-6149d5582270.png)

The "success_url:" is the url which the user will be redirected to should the payment be successful.
The "cancel_url:" is for when the payment fails.

The user is routed to a summary page which displays the details of the current booking if successful and to an error page that tells the user payment has failed if payment is unsuccessful.

## Future Features

## Known Issues

## Future Works
