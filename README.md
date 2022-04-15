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
- Results
- Renders flight information based on response from Express. Calls on FlightSection, FlightCard, FlightLeg and LegCard components.
- FlightSections renders the section based on the number of origin and destination airport selecte. E.g. One Way flights would result in one section returned and rendered while a return / multiple destinations flight would have more than one sections renedered.
- FlightCard renders each flight card, which are possible flight options for the respective section.
- lightLeg handles stops for every leg and calls on the LegCard rendering.
- PassengerDetails
  - General form which calls on Particular Details component based on the number of passengers on the flight.
- SeatSelector
  - Retrieves seatMap from Express and calls on SeatDisplay to render the seats for each leg of the flight.
- Summary
- Renders passenger details and flight details based on information in booking context.
- Conditionally renders booking reference, payment, and edit details based on standard mode or manage mode.
- Manage Bookings
  - Form that submits booking reference and last name to Express (/getBooking) for validation.
  - Shows summary page in manage mode upon receiving the booking object with the booking details.

### Express (BackEnd)

- ## Endpoints
- getBooking(GET)

  - retrieves booking info based on booking reference from Mongo. Compares the last names of passengers before returning the booking object.

- makePayment (POST)

  - Generates a 8 alphanumeric booking ref if req doesnt come with it.
  - Generates a payment success ID and a payment fail ID.
  - Calls on stripe API with flight details and total fare. stripe to redirect to sever endpoint (/paymentCheck) with booking ref and payment success of fail ID.
  - Calls on createBooking function with booking object, booking ref, payment success ID and payment fail ID.

- paymentCheck/:bookingRef/:id (GET)

- ## Functions

- CreateBooking
  - Creates a new document in mongo for new bookings, storing the booking object, booking ref, payment success ID and payment failure ID.
  - Updates payment success ID and payment failure ID for existing booking.

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

## Known Issues

- Results page continues to show the loader and without an error when there are no flights available from the API.

## Future Works

- Selection of oneway / return / multiple destinations
- user account management for tracking of booked flights
- Admin account for changing of seats and retrival of flight manifest
- Separation of context for booking and mangement respectively
