// Variables -----------------------------------------------------------
const URL_TRIPS_V3 =
  'https://requirements-api.sandbox.joinsherpa.com/v3/trips?include=restriction,procedure';

const API_KEY_TRIPS_V3 = 'AIzaSyAqD2UB9rjUl0A2jvh_xiiKsJowbc7-eM8';

const URL_ORDERS =
  'https://us-central1-sherpa-lab.cloudfunctions.net/demositeCreatePayOrder';

var requirementsHashMap = {};

var passport = 'CAN';
var destination = 'USA';
var transit = 'none';
var headline = '';
var html = '';
var VIdestination = '';
var VItransit = '';
var VIorigin = '';
var VIvisaInfo1 = '';
var VIvisaInfo2 = '';
var leg = 1;

// General use functions -----------------------------------------------------------
function isInBooking() {
  if (getDestinationName() == 'Nairobi') {
    return true;
  } else {
    return false;
  }
}

// Styling functions -----------------------------------------------------------
function setHeaderImageHeight() {
  document.querySelector('.header').style.height =
    window.innerHeight * 0.5 + 'px';
}

function getTodaysDate() {
  var today =
    new Date().getFullYear() +
    '-' +
    ('0' + (new Date().getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + new Date().getDate()).slice(-2);
  var nextWeek = new Date();
  nextWeek.setDate(new Date().getDate() + 7);
  var returnDate =
    nextWeek.getFullYear() +
    '-' +
    ('0' + (nextWeek.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + nextWeek.getDate()).slice(-2);
  document.getElementById('departDate').value = today;
  document.getElementById('returnDate').value = returnDate;
}

function toggleRequirements(element) {;
  var requirements
  if (element.id == "requirementsToggle") {
    requirements = document.getElementById("requirementsAll")
  }
  else if (element.id == "requirementsToggle2") {
    requirements = document.getElementById("requirementsAll2")
  }
  if (requirements.style.display == "none") {
    requirements.style.display = "block"
  }
  else {
    requirements.style.display = "none"
  }
}

// Modal functions -----------------------------------------------------------
function openModal() {
  document.getElementById('MMBmodal').style.display = 'block';
}

function openBookingConfirmationEmail() {
  document.getElementById('bookingConfModal').style.display = 'block';
}

function openMarketingEmail() {
  document.getElementById('visaMarketingModal').style.display = 'block';
}

window.onclick = function (event) {
  if (event.target == document.getElementById('MMBmodal')) {
    document.getElementById('MMBmodal').style.display = 'none';
  } else if (event.target == document.getElementById('bookingConfModal')) {
    document.getElementById('bookingConfModal').style.display = 'none';
  } else if (event.target == document.getElementById('visaMarketingModal')) {
    document.getElementById('visaMarketingModal').style.display = 'none';
  }
};

// Go-To functions -----------------------------------------------------------
function goToFlightSearchPage() {
  // Opens flight_search.html.
  // Takes Origin, Destination, Outbound & Return Dates from Flight Search Form. Sets Return Date to 'null' if it's a one way trip
  let fromLocation = document.getElementById('fromLocation');
  let origin = fromLocation.value;
  let toLocation = document.getElementById('toLocation');
  let destination = toLocation.value;
  let outboundDate = document.getElementById('departDate').value;
  let returnDate = document.getElementById('returnDate').value;
  var randNum = Math.floor(Math.random() * 10) + 1;

  //Assigns OriginName based on Origin & Passport Based on Origin Country
  switch (origin) {
    case 'YYZ':
      passport = 'CAN';
      originName = 'Toronto';
      break;
    case 'YVR':
      passport = 'CAN';
      originName = 'Vancouver';
      break;
    case 'JFK':
      passport = 'USA';
      originName = 'New York';
      break;
    case 'LHR':
      passport = 'GBR';
      originName = 'London';
      break;
    case 'CDG':
      passport = 'FRA';
      originName = 'Paris';
      break;
  }
  // Assigns Destination Name Based on destination
  switch (destination) {
    case 'CAI':
      destinationName = 'Cairo';
      break;
    case 'IST':
      destinationName = 'Istanbul';
      break;
    case 'ICN':
      destinationName = 'Seoul';
      break;
    case 'BOM':
      destinationName = 'Mumbai';
      break;
    case 'DXB':
      destinationName = 'Dubai';
      break;
    case 'SGN':
      destinationName = 'Ho Chi Minh';
      break;
    case 'NBO':
      destinationName = 'Nairobi';
      break;
    case 'MPM':
      destinationName = 'Maputo';
      break;
  }

  var bookingRef = destination + randNum;

  // Checks if return date is disabled and flight search and sets it to null if it is. Otherwise returnDate is set to the date selected
  if (document.getElementById('returnDate').disabled == true) {
    returnDate = 'null';
  } else {
    let returnDate = document.getElementById('returnDate').value;
  }
  window.location.href = `flightsearch.html?bookingRef=${bookingRef}&origin=${origin}&destination=${destination}&outboundDate=${outboundDate}&returnDate=${returnDate}&originName=${originName}&destinationName=${destinationName}&passport=${passport}`;
}

function goToMMB() {
  window.location.href = `mmb.html${window.location.search}`;
}

function destinationEgypt() {
  window.location.href = `destination_egypt.html`;
}

function goToCheckout() {
  if (isInBooking()) {
    let visaName = document.getElementById('cartVisa').textContent;
    let visaPrice = document.getElementById('cartVisaPrice').textContent;
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let country = document.getElementById('country').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let product = document.getElementById('product').textContent;
    let program = document.getElementById('program').textContent;
    window.location.href = `checkout.html${window.location.search}&visaName=${visaName}&visaPrice=${visaPrice}&fName=${fname}&lName=${lname}&nationality=${country}&email=${email}&phone=${phone}&productId=${product}&programId=${program}`;
  } else {
    goToBookingConfirmation();
  }
}

function goToBookingConfirmation() {
  window.location.href = `booking_confirmation.html${window.location.search}`;
}

function goToReturnSearch(outboundPrice) {
  if (getReturnDate() == 'null') {
    window.location.href = `travellerInfo.html${window.location.search}&outboundPrice=${outboundPrice}`;
  } else {
    window.location.href = `returnsearch.html${window.location.search}&outboundPrice=${outboundPrice}`;
  }
}

function goToTravellerInfo(returnPrice) {
  //goes to booking_confirmation.html and passes existing query parameters
  window.location.href = `travellerInfo.html${window.location.search}&returnPrice=${returnPrice}`;
}

// Get functions -----------------------------------------------------------
function getItinerary(itinerary) {
  //retrieves an itinerary from a list and redirects to mmb.html based on the retrieved itinerary
  console.log(itinerary);
  switch (itinerary) {
    case 'CAI1':
      window.location.href = `mmb.html?bookingRef=CAI1&origin=LHR&destination=CAI&outboundDate=2023-03-10&returnDate=2023-03-17&originName=London&destinationName=Cairo&passport=GBR`;
      break;
    case 'ICN2':
      window.location.href = `mmb.html?bookingRef=ICN2&origin=CDG&destination=ICN&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Paris&destinationName=Seoul&passport=FRA`;
      break;
    case 'IST3':
      window.location.href = `mmb.html?bookingRef=IST3&origin=JFK&destination=IST&outboundDate=2023-03-10&returnDate=2023-03-17&originName=New%20York&destinationName=Istanbul&passport=USA`;
      break;
    case 'DXB4':
      window.location.href = `mmb.html?bookingRef=DXB4&origin=YVR&destination=DXB&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Vancouver&destinationName=Dubai&passport=CAN`;
      break;
    case 'BOM5':
      window.location.href = `mmb.html?bookingRef=BOM5&origin=YYZ&destination=BOM&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Toronto&destinationName=Mumbai&passport=CAN`;
      break;
  }
}

function getQueryString() {
  const queryString = window.location.search;
  //create urlParams object, passing the queryString values
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
}

function getBookingReference() {
  //Return the BOOKING REFERENCE from the URL Query Parameters
  const bookingRef = getQueryString().get('bookingRef');
  return bookingRef;
}

function getOriginCode() {
  //Return the ORIGIN from the URL Query Parameters
  const originCode = getQueryString().get('origin');
  return originCode;
}

function getDestinationCode() {
  //Return the DESTINATION from the URL Query Parameters
  const destinationCode = getQueryString().get('destination');
  return destinationCode;
}

function getOutboundDate() {
  //Return the OUTBOUND date from the URL Query Parameters
  const outboundDate = getQueryString().get('outboundDate');
  return outboundDate;
}

function getReturnDate() {
  //Return the OUTBOUND date from the URL Query Parameters
  const returnDate = getQueryString().get('returnDate');
  return returnDate;
}

function getOriginName() {
  //Return the ORIGIN name from the URL Query Parameters
  const originName = getQueryString().get('originName');
  return originName;
}

function getDestinationName() {
  //Return the DESTINATION name
  const destinationName = getQueryString().get('destinationName');
  return destinationName;
}

function getPassport() {
  //Return the PASSPORT from the URL Query Parameters
  const passport = getQueryString().get('passport');
  return passport;
}

function getOutboundPrice() {
  const outboundPrice = getQueryString().get('outboundPrice');
  return outboundPrice;
}

function getReturnPrice() {
  const returnPrice = getQueryString().get('returnPrice');
  return returnPrice;
}

function getVisaName() {
  const visaName = getQueryString().get('visaName');
  return visaName;
}

function getVisaPrice() {
  const visaPrice = getQueryString().get('visaPrice');
  return visaPrice;
}

function getFName() {
  const fName = getQueryString().get('fName');
  return fName;
}

function getLName() {
  const lName = getQueryString().get('lName');
  return lName;
}

function getProgram() {
  const program = getQueryString().get('programId');
  return program;
}

function getProduct() {
  const product = getQueryString().get('productId');
  return product;
}

function getEmail() {
  const email = getQueryString().get('email');
  return email;
}

function getPhone() {
  const phone = getQueryString().get('phone');
  return phone;
}

function getNationality() {
  const nationality = getQueryString().get('nationality');
  return nationality;
}

// Populate functions -----------------------------------------------------------
function populateBookingConfirmationPage() {
  //Populates the Booking Confirmation Page based on the URL Query Parameters
  document
    .getElementById('bookingRef')
    .insertAdjacentHTML('beforeend', getBookingReference());
  // populate DEPARTURE Origin with Origin Name & Origin Code
  document.getElementById(
    'departureOrigin'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  // populate Departure Destination with Destination Name & Destination Code
  document.getElementById(
    'departureDestination'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate RETURN Origin with Destination Name & Destination Code
  document.getElementById(
    'returnOrigin'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate RETURN Destintation with Origin Name & Origin Code
  document.getElementById(
    'returnDestination'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;

  document
    .getElementById('outboundDepartureDate')
    .insertAdjacentHTML('afterbegin', getOutboundDate());
  document
    .getElementById('outboundArrivalDate')
    .insertAdjacentHTML('afterbegin', getOutboundDate());
  document
    .getElementById('returnDepartureDate')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate')
    .insertAdjacentHTML('afterbegin', getReturnDate());

  //if return date is null, hide the return segment, otherwise display it
  if (getReturnDate() == 'null') {
    document.getElementById('returnSegment').style.display = 'none';
  } else {
    document.getElementById('returnSegment').style.display = 'inline';
  }
}

function populateReturnSearchPageVI() {
  //Populates the Return Search Page when the VI destination Ho Chi Minh (SGN) is selected
  document.getElementById('button1').style.display = 'none';
  document.getElementById('button2').style.display = 'none';
  document.getElementById('button3').style.display = 'none';
  // populate page title with origin and destination
  document.getElementById(
    'flightSearchTitle'
  ).innerHTML = `Flights from ${getDestinationName()} (${getDestinationCode()}) to ${getOriginName()} (${getOriginCode()})`;
  // populate Return Origin with const destination
  document.getElementById(
    'returnOrigin'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate Return Destintation with const origin
  document.getElementById(
    'returnDestination'
  ).innerHTML = `Hong Kong <br> (HKG)`;
  document
    .getElementById('returnDepartureDate')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate')
    .insertAdjacentHTML('afterbegin', getReturnDate());

  // populate Return Origin with const destination
  document.getElementById('returnOrigin2').innerHTML = `Hong Kong <br> (HKG)`;
  // populate Return Destintation with const origin
  document.getElementById('returnDestination2').innerHTML = `Tokyo <br> (NRT)`;
  document
    .getElementById('returnDepartureDate2')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate2')
    .insertAdjacentHTML('afterbegin', getReturnDate());

  // populate Return Origin with const destination
  document.getElementById('returnOrigin3').innerHTML = `Tokyo <br> (NRT)`;
  // populate Return Destintation with const origin
  document.getElementById(
    'returnDestination3'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  document
    .getElementById('returnDepartureDate3')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate3')
    .insertAdjacentHTML('afterbegin', getReturnDate());
}

function populateFlightSearchPage() {
  //Populates the Flight Search Page based on the URL Query Parameters
  if (getDestinationCode() == 'MPM' && getOriginCode() == 'YYZ') {
    document.getElementById('VInotice').style.display = 'block';
    VIdisplayVisaRequirements();
  }

  //populate page title with origin and destination
  document.getElementById(
    'flightSearchTitle'
  ).innerHTML = `Flights from ${getOriginName()} (${getOriginCode()}) to ${getDestinationName()} (${getDestinationCode()})`;
  // populate Departure Origin with const origin
  document.getElementById(
    'departureOrigin'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  // populate Departure Destination with const destination
  document.getElementById(
    'departureDestination'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  document
    .getElementById('outboundDepartureDate')
    .insertAdjacentHTML('afterbegin', getOutboundDate());
  document
    .getElementById('outboundArrivalDate')
    .insertAdjacentHTML('afterbegin', getOutboundDate());

  // populate Departure Origin with const origin
  document.getElementById(
    'departureOrigin2'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  // populate Departure Destination with const destination
  document.getElementById(
    'departureDestination2'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  document
    .getElementById('outboundDepartureDate2')
    .insertAdjacentHTML('afterbegin', getOutboundDate());
  document
    .getElementById('outboundArrivalDate2')
    .insertAdjacentHTML('afterbegin', getOutboundDate());

  // populate Departure Origin with const origin
  document.getElementById(
    'departureOrigin3'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  // populate Departure Destination with const destination
  document.getElementById(
    'departureDestination3'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  document
    .getElementById('outboundDepartureDate3')
    .insertAdjacentHTML('afterbegin', getOutboundDate());
  document
    .getElementById('outboundArrivalDate3')
    .insertAdjacentHTML('afterbegin', getOutboundDate());
}

function populateReturnSearchPage() {
  //Populates the Flight return Page based on the URL Query Parameters
  document.getElementById('bookFlightVI').style.display = 'none';
  // populate page title with origin and destination
  document.getElementById(
    'flightSearchTitle'
  ).innerHTML = `Flights from ${getDestinationName()} (${getDestinationCode()}) to ${getOriginName()} (${getOriginCode()})`;
  // populate Return Origin with const destination
  document.getElementById(
    'returnOrigin'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate Return Destintation with const origin
  document.getElementById(
    'returnDestination'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  document
    .getElementById('returnDepartureDate')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate')
    .insertAdjacentHTML('afterbegin', getReturnDate());

  // populate Return Origin with const destination
  document.getElementById(
    'returnOrigin2'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate Return Destintation with const origin
  document.getElementById(
    'returnDestination2'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  document
    .getElementById('returnDepartureDate2')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate2')
    .insertAdjacentHTML('afterbegin', getReturnDate());

  // populate Return Origin with const destination
  document.getElementById(
    'returnOrigin3'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate Return Destintation with const origin
  document.getElementById(
    'returnDestination3'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  document
    .getElementById('returnDepartureDate3')
    .insertAdjacentHTML('afterbegin', getReturnDate());
  document
    .getElementById('returnArrivalDate3')
    .insertAdjacentHTML('afterbegin', getReturnDate());
}

function populateTravellerInfo() {
  //Populates the traveller info Page based on the URL Query Parameters
  var price1 = parseInt(getOutboundPrice());
  var price2 = 0;
  if (getReturnDate() != 'null') {
    price2 = parseInt(getReturnPrice());
  }
  var total = price1 + price2;
  document.getElementById(
    'cartDeparture'
  ).innerHTML = `${getOriginName()} to ${getDestinationName()}<br>${getOutboundDate()}`;
  document.getElementById('cartDeparturePrice').innerHTML = `${price1.toFixed(
    2
  )}`;
  if (getReturnDate() != 'null') {
    document.getElementById(
      'cartReturn'
    ).innerHTML = `${getDestinationName()} to ${getOriginName()}<br>${getReturnDate()}`;
    document.getElementById('cartReturnPrice').innerHTML = `${price2.toFixed(
      2
    )}`;
  }
  document.getElementById('totalPrice').innerHTML = `${total.toFixed(2)}`;
}

function populateCheckout() {
  document.getElementById('name').innerHTML = `${getFName()} ${getLName()}`;
  document.getElementById('passport').innerHTML = `${getNationality()}`;
  document.getElementById('email').innerHTML = `${getEmail()}`;
  document.getElementById('phone').innerHTML = `${getPhone()}`;
  var price1 = parseInt(getOutboundPrice());
  var price2 = parseInt(getReturnPrice());
  var price3 = parseFloat(getVisaPrice());
  var total = price1 + price2;
  console.log(total);
  document.getElementById(
    'cartDeparture'
  ).innerHTML = `${getOriginName()} to ${getDestinationName()}<br>${getOutboundDate()}`;
  document.getElementById('cartDeparturePrice').innerHTML = `${price1.toFixed(
    2
  )}`;
  if (getReturnDate() != 'null') {
    document.getElementById(
      'cartReturn'
    ).innerHTML = `${getDestinationName()} to ${getOriginName()}<br>${getReturnDate()}`;
    document.getElementById('cartReturnPrice').innerHTML = `${price2.toFixed(
      2
    )}`;
  }
  if (getVisaName() != '') {
    document.getElementById('cartVisa').innerHTML = `${getVisaName()}`;
    document.getElementById('cartVisaPrice').innerHTML = `${getVisaPrice()}`;
    total += price3;
  }
  console.log(price1 + ' + ' + price2 + ' + ' + price3 + ' = ' + total);
  document.getElementById('totalPrice').innerHTML = `${total.toFixed(2)}`;
}

function populateMMB() {
  //Populates the MMB Page based on the URL Query Parameters
  document
    .getElementById('bookingRef')
    .insertAdjacentHTML('beforeend', getBookingReference());
  // populate Departure Origin with const origin
  document.getElementById(
    'departureOrigin'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  // populate Departure Destination with const destination
  document.getElementById(
    'departureDestination'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate Return Origin with const destination
  document.getElementById(
    'returnOrigin'
  ).innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
  // populate Return Destintation with const origin
  document.getElementById(
    'returnDestination'
  ).innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
  document
    .getElementById('outboundDepartureDate')
    .insertAdjacentHTML('beforeend', getOutboundDate());
  document
    .getElementById('returnDepartureDate')
    .insertAdjacentHTML('beforeend', getReturnDate());

  if (getDestinationCode() == 'MPM') {
    VIdisplayAllRequirements();
    document.getElementById("requirementsToggle").style.display = "block"
    document.getElementById("requirementsToggle2").style.display = "block"
    document.getElementById('VIflights').style.display = 'block';
    document.getElementById('middleColDep').innerHTML =
      '<p>08:35</p><p>Ponta Delgada<br>(PDL)</p>';
    document.getElementById(
      'departureDestination'
    ).innerHTML = `Lisbon <br> (LIS)`;
    document.getElementById('departTime').innerHTML = '17:05';
    document.getElementById('arriveTime').innerHTML = '11:50';
    document.getElementById('departTitle').innerHTML = 'Departing flights';
  }

  //If return date is null, hide the return segment otherwise display it
  if (getReturnDate() == 'null') {
    document.getElementById('returnSegment').style.display = 'none';
  } else {
    document.getElementById('returnSegment').style.display = 'inline';
  }
}

// Solution functions -----------------------------------------------------------
function deepLink() {
  console.log(getDestinationCode());
  switch (getDestinationCode()) {
    case 'DXB':
      countryCode = 'ARE';
      break;
    case 'IST':
      countryCode = 'TUR';
      break;
    case 'BOM':
      countryCode = 'IND';
      break;
    case 'ICN':
      countryCode = 'KOR';
      break;
    case 'CAI':
      countryCode = 'EGY';
      break;
    case 'SGN':
      countryCode = 'VNM';
      break;
  }
  if (getReturnDate() == 'null') {
    window.open(
      `https://apply.joinsherpa.com/travel-restrictions/${countryCode}?affiliateId=sherpaair&originAirport=${getOriginCode()}&nationality=${getPassport()}&fullyVaccinated=true&departureDate=${getOutboundDate()}&tripType=oneWay`,
      '_blank'
    );
  } else {
    window.open(
      `https://apply.joinsherpa.com/travel-restrictions/${countryCode}?affiliateId=sherpaair&originAirport=${getOriginCode()}&nationality=${getPassport()}&fullyVaccinated=true&departureDate=${getOutboundDate()}&returnDate=${getReturnDate()}`,
      '_blank'
    );
  }
}

function buildElement() {
  const elementConfig = {
    // 1. Element Placement: Where the Element is being placed on your site e.g. mmb, discovery
    placement: 'discovery',
    travellers: [
      {
        nationality: getPassport(), //traveller's passport
        vaccinations: [
          {
            type: 'COVID_19',
            status: 'FULLY_VACCINATED',
          },
        ],
      },
    ],
    segments: [
      {
        segmentType: 'OUTBOUND',
        origin: {
          airportCode: getOriginCode(),
        },
        destination: {
          airportCode: getDestinationCode(),
        },
        travelMode: 'AIR',
        departureDate: getOutboundDate(),
        arrivalDate: getOutboundDate(),
      },
    ],
  };

  return elementConfig;
}

// API functions -----------------------------------------------------------
function itinerary(passport) {
  // builds the JSON for calling the API
  if (transit == 'none') {
    return {
      data: {
        type: 'TRIP',
        attributes: {
          traveller: {
            passports: [passport],
            vaccinations: [
              {
                type: 'COVID_19',
                status: 'FULLY_VACCINATED',
              },
            ],
          },
          locale: 'en-US',
          travelNodes: [
            {
              type: 'ORIGIN',
              departure: {
                date: [getOutboundDate()],
                time: '05:00',
                travelMode: 'AIR',
              },
              locationCode: 'CAN',
            },
            {
              type: 'DESTINATION',
              arrival: {
                date: [getOutboundDate()],
                time: '08:00',
                travelMode: 'AIR',
              },
              airportCode: [getDestinationCode()],
            },
          ],
        },
      },
    };
  } else {
    return {
      data: {
        type: 'TRIP',
        attributes: {
          traveller: {
            passports: [passport],
            vaccinations: [
              {
                type: 'COVID_19',
                status: 'FULLY_VACCINATED',
              },
            ],
          },
          locale: 'en-US',
          travelNodes: [
            {
              type: 'ORIGIN',
              departure: {
                date: '2023-05-12',
                time: '05:00',
                travelMode: 'AIR',
              },
              locationCode: 'CAN',
            },
            {
              type: 'TRANSIT',
              arrival: {
                date: '2023-05-12',
                time: '05:00',
                travelMode: 'AIR',
              },
              departure: {
                date: '2023-05-12',
                time: '05:00',
                travelMode: 'AIR',
              },
              locationCode: [transit],
            },
            {
              type: 'DESTINATION',
              arrival: {
                date: '2023-05-12',
                time: '08:00',
                travelMode: 'AIR',
              },
              airportCode: [getDestinationCode()],
            },
          ],
        },
      },
    };
  }
}

async function displayVisaRequirements() {
  // Make API call to v3/trips
  const responseRaw = await fetch(URL_TRIPS_V3, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/vnd.api+json',
      'x-api-key': API_KEY_TRIPS_V3,
    },
    body: JSON.stringify(itinerary(passport)),
  });
  const response = await responseRaw.json();
  console.log(responseRaw.status, await response);

  // Get information groups
  const requirementsAll = response.data.attributes.informationGroups;

  // Find the information group related to visa requirements
  const requirementsVisa = requirementsAll.find(
    (requirementsGroup) => requirementsGroup.type == 'VISA_REQUIREMENTS'
  );

  headline = requirementsVisa.headline;
  html += `<div>
 		<p>${headline}</p>`;
  // Convert the included restrictions and procedures to a hash map
  // This enables faster look up afterwards
  requirementsHashMap = response.included.reduce(function (map, obj) {
    map[obj.id] = obj;
    return map;
  }, {});

  const renderElement = document.getElementById('trips-v3');

  // Parse and display requirements recursively
  processGroupings(requirementsVisa.groupings, renderElement);
}

function processGroupings(groupings, parentElement) {
  groupings.forEach((grouping) => {
    // Render all data in the grouping
    grouping.data.forEach((requirement) =>
      displayRequirement(requirementsHashMap[requirement.id], parentElement)
    );

    // Call the same function on the child groupings if they exist
    if (grouping.groupings) {
      processGroupings(groupings.groupings, parentElement);
    }
  });
}

function displayRequirement(requirement, parentElement) {
  requirement.attributes.actions.forEach((action) => {
    if (action.provider == 'sherpa' && !isInBooking()) {
      // If sherpa offers this particular visa
      html += `</div>`;
      document.getElementById('radio').style.display = 'block';
    } else if (action.provider == 'sherpa' && isInBooking()) {
      html += `<p>${action.product.name} </p>
    				<p>${parseFloat(action.product.price.value).toFixed(2)}${
        action.product.price.currency
      }</p>
    				<button onclick="addCartVisa('${action.product.name}', '${
        action.product.price.value
      }', '${action.product.productId}', '${
        action.product.programId
      }')" class="btn">Add to cart</button>
				</div><br>`;
      document.getElementById('radio').style.display = 'block';
      document.getElementById('radioForm').style.display = 'none';
    }
    parentElement.innerHTML = html;
  });
}

function submitNationality(country) {
  resetTotal();
  document.getElementById('cartVisa').innerHTML = '';
  document.getElementById('cartVisaPrice').innerHTML = '';
  html = '';
  document.getElementById('radio').style.display = 'none';
  document.getElementById('radioForm').reset();
  passport = country;
  displayVisaRequirements();
}

// In-Booking functions -----------------------------------------------------------
function resetTotal() {
  var price1 = parseInt(getOutboundPrice());
  var price2 = parseInt(getReturnPrice());
  var total = price1 + price2;
  document.getElementById('totalPrice').innerHTML = `${total.toFixed(2)}`;
}

function checkFormComplete() {
  let fname = document.getElementById('fname').value;
  let lname = document.getElementById('lname').value;
  let country = document.getElementById('country').value;
  let gender = document.getElementById('gender').value;
  let birthday = document.getElementById('birthday').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let completeBooking = document.getElementById('completeBooking');
  if (
    fname != '' &&
    lname != '' &&
    country != '' &&
    gender != '' &&
    birthday != '' &&
    email != '' &&
    phone != ''
  ) {
    completeBooking.disabled = false;
  }
}

function addCartVisa(name, price, product, program) {
  document.getElementById('product').innerHTML = product;
  document.getElementById('program').innerHTML = program;
  var price1 = parseInt(getOutboundPrice());
  var price2 = parseInt(getReturnPrice());
  var price3 = parseFloat(price);
  var total = price1 + price2 + price3;
  document.getElementById('cartVisa').innerHTML = name;
  document.getElementById('cartVisaPrice').innerHTML = `${price3.toFixed(2)}`;
  document.getElementById('radio').style.display = 'none';
  document.getElementById('totalPrice').innerHTML = `${total.toFixed(2)}`;
}

// Orders functions -----------------------------------------------------------
function order() {
  return {
    currency: 'USD',
    affiliateContext: {
      customString: '',
    },
    items: [
      {
        applicationData: {
          displayName: getFName() + ' ' + getLName(),
          arrivalDate: getOutboundDate(),
          nationality: getNationality(),
          passport: getNationality(),
        },
        programId: getProgram(),
        productId: getProduct(),
      },
    ],
    contactName: getFName(),
    contactEmail: getEmail(),
    contactPhoneNumber: getPhone(),
  };
}

async function createPayOrder() {
  console.log('Submitted to Orders API. Awaiting response...');
  console.log(order());
  // Make API call
  const responseRaw = await fetch(URL_ORDERS, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      affiliateId: 'sherpaair',
      'content-type': 'application/vnd.api+json',
    },
    body: JSON.stringify(order()),
  });
  const response = await responseRaw.json();
  console.log(responseRaw.status, await response);
}

// Virtual Interlining functions -----------------------------------------------------------
function expandVI() {
  var moreInfo = document.getElementById('moreinfo');
  var VInotice = document.getElementById('VInotice');
  if (moreInfo.style.display == 'none') {
    moreInfo.style.display = 'block';
    VInotice.innerHTML =
      'This is a self-transfer itinerary. Additional restrictions may apply. Click to collapse.';
  } else {
    moreInfo.style.display = 'none';
    VInotice.innerHTML =
      'This is a self-transfer itinerary. Additional restrictions may apply. Click for more information.';
  }
}

function VIitinerary(passport) {
  return {
    data: {
      type: 'TRIP',
      attributes: {
        traveller: {
          passports: [passport],
          vaccinations: [
            {
              type: 'COVID_19',
              status: 'FULLY_VACCINATED',
            },
          ],
        },
        locale: 'en-US',
        travelNodes: [
          {
            type: 'ORIGIN',
            departure: {
              date: getOutboundDate(),
              time: '05:00',
              travelMode: 'AIR',
            },
            airportCode: VIorigin,
          },
          {
            type: 'TRANSIT',
            departure: {
              date: getOutboundDate(),
              time: '05:00',
              travelMode: 'AIR',
            },
            arrival: {
              date: getOutboundDate(),
              time: '06:00',
              travelMode: 'AIR',
            },
            airportCode: VItransit,
          },
          {
            type: 'DESTINATION',
            arrival: {
              date: getOutboundDate(),
              time: '08:00',
              travelMode: 'AIR',
            },
            airportCode: VIdestination,
          },
        ],
      },
    },
  };
}

async function VIdisplayVisaRequirements() {
  if (leg == 1) {
    VIorigin = 'YYZ';
    VItransit = 'PDL';
    VIdestination = 'LIS';
  } else if (leg == 2) {
    VIorigin = 'LIS';
    VItransit = 'IST';
    VIdestination = 'MPM';
  }
  const responseRaw = await fetch(URL_TRIPS_V3, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/vnd.api+json',
      'x-api-key': API_KEY_TRIPS_V3,
    },
    body: JSON.stringify(VIitinerary(passport)),
  });
  const response = await responseRaw.json();
  const requirementsAll = response.data.attributes.informationGroups;
  const requirementsVisa = requirementsAll.find(
    (requirementsGroup) => requirementsGroup.type == 'VISA_REQUIREMENTS'
  );
  headline = requirementsVisa.headline;
  if (leg == 1) {
    VIvisaInfo1 += `<div>
 		<p>${headline}</p>`;
  } else {
    VIvisaInfo2 += `<div>
 		<p>${headline}</p>`;
  }
  requirementsHashMap = response.included.reduce(function (map, obj) {
    map[obj.id] = obj;
    return map;
  }, {});
  const renderElement = document.getElementById('moreinfo');
  VIprocessGroupings(requirementsVisa.groupings, renderElement);
}

function VIprocessGroupings(groupings, parentElement) {
  if (groupings != null && groupings.length > 0) {
    groupings.forEach((grouping) => {
      grouping.data.forEach((requirement) => (html += `</div>`));
      if (grouping.groupings) {
        VIprocessGroupings(groupings.groupings, parentElement);
      }
    });
  }
  if (leg < 2) {
    leg = leg + 1;
    VIdisplayVisaRequirements();
  } else {
    document.getElementById('moreinfo').innerHTML =
      '<div style="border-style: solid;padding: 10px;"> <p><b><u>Toronto (YYZ) --> Ponta Delgada (PDL) --> Lisbon (LIS)</u></b></p>' +
      VIvisaInfo1 +
      '</div>' +
      '<p>Self-transfer required at Lisboa Airport (LIS)</p></div><br>' +
      '<div style="border-style: solid;padding: 10px;"><p><b><u>Lisbon LIS --> Istanbul (IST) --> Maputo (MPM)</u></b></p>' +
      VIvisaInfo2 +
      '</div></div><br>';
  }
}

async function VIdisplayAllRequirements() {
  var renderElement = document.getElementById('requirementsAll');
  if (leg == 1) {
    VIorigin = 'YYZ';
    VItransit = 'PDL';
    VIdestination = 'LIS';
  } else if (leg == 2) {
    VIorigin = 'LIS';
    VItransit = 'IST';
    VIdestination = 'MPM';
    renderElement = document.getElementById('requirementsAll2');
  }
  const responseRaw = await fetch(URL_TRIPS_V3, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/vnd.api+json',
      'x-api-key': API_KEY_TRIPS_V3,
    },
    body: JSON.stringify(VIitinerary(passport)),
  });
  const response = await responseRaw.json();
  const requirementsAll = response.data.attributes.informationGroups;

  requirementsHashMap = response.included.reduce(function (map, obj) {
    map[obj.id] = obj;
    return map;
  }, {});

  for (let i = 0; i < requirementsAll.length; i++) {
    console.log(i, requirementsAll[i].name);
    VIprocessAllGroupings(requirementsAll[i].groupings, renderElement);
  }
}

function VIprocessAllGroupings(groupings, parentElement) {
  if (groupings != null && groupings.length > 0) {
    groupings.forEach((grouping) => {
      grouping.data.forEach(function (requirement) {
        if (
          requirementsHashMap[requirement.id].attributes.category !=
          'NO_RESTRICTION'
        )
          parentElement.innerHTML +=
            '<p>' +
            requirementsHashMap[requirement.id].attributes.description +
            '</p>';
      });
      if (grouping.groupings) {
        VIprocessGroupings(groupings.groupings, parentElement);
      }
    });
  }
  if (leg < 2) {
    leg = leg + 1;
    VIdisplayAllRequirements();
  }
}
