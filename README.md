# Nyna Airlines
https://nyna-airlines.vercel.app/alldestinations

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
  - Auto redirect to summary component if url params of bookingRef and lastName is available.
  - Otherwise, shows form that submits booking reference and last name to Express (/getBooking) for validation.
  - Shows summary page in manage mode upon receiving the booking object with the booking details.

### Express (BackEnd)

- ## Endpoints

- getDestinations (GET)

  - calls on SIA getDestinations API and parse relevant information before responding.

- getFlights (POST)

  - calls SIA flight search API with required params and parses relevant information.
  - calls on fareCalculator to generate fare from backend before responding.

- getSeats (POST)

  - query flights collection for existing flight and retrieve the seatMap.
  - If there are no flights, call on seatMapGenerator for seatMap and create the flight in collection.
  - Then respond with seatMap.

- getBooking(GET)

  - retrieves booking info based on booking reference from Mongo. Compares the last names of passengers before returning the booking object.

- makePayment (POST)

  - Generates a 8 alphanumeric booking ref if req doesnt come with it.
  - Generates a payment success ID and a payment fail ID.
  - Calls on stripe API with flight details and total fare. stripe to redirect to sever endpoint (/paymentCheck) with booking ref and payment success of fail ID.
  - Calls on createBooking function with booking object, booking ref, payment success ID and payment fail ID.

- paymentCheck/:bookingRef/:id (GET)

  - Takes in bookingRef and id as params. Compares if the req id matches the payment success id in mongo.
  - If there is a match, update the paymentSuccess boolean in mongo and runs addToFlight function with booking object.
  - Then, redirect to frontEnd manage (for successful payment) or paymentFail route with bookingRef and last name of first passenger in url params.

- ## Functions

- fareCalculator (tripDuration, cabinClass, legs)

  - Generates fare based on tripDuration, cabinClass and number of legs. higher legs yields a slight discount capped at 25%.

- seatMapGenerator ()

  - Randomly generates seatmap based on occupancyRate variable for each class

- CreateBooking (booking, bookingRef, pSuccessID, pFailID)

  - Creates a new document in mongo for new bookings, storing the booking object, booking ref, payment success ID and payment failure ID.
  - Updates payment success ID and payment failure ID for existing booking.

- addToFlight (booking)
  - updates the seatmap from available to booked in flights collection
  - adds passenger information to passenger list in respective flight in flight collection.

### MongoDB Atlas (Database)

// PLEASE UPDATE THIS SECTION

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

![Standard Booking Flow](/Media/StandardBooking.png)
The logic flow for a standard flight booking

For payment, this project integrates stripe to allow for the payment of flight tickets selected by the user with a checkout page. In essence, stripe accepts a request made to its server and then returns a url that is a checkout page displaying payment options with flight tickets booked by the user earlier.
![Screenshot 2022-04-14 at 4 32 16 PM](/Media/stripe1.png)

Information such as the product's name, price, quantity and are sent to stripe and a url with the product info is generated.

On successful payment, the user is then redirected to a summary page which displays the booking details.
On failed payment, the user is redirected to a failed payment page with a button to route the user back to the main page.


## Known Issues

- Results page continues to show the loader and without an error when there are no flights available from the API.

## Future Works

- Selection of oneway / return / multiple destinations
- user account management for tracking of booked flights
- Admin account for changing of seats and retrival of flight manifest
- Separation of context for booking and mangement respectively
