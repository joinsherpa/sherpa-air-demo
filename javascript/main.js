function setHeaderImageHeight() {
	document.querySelector(".header").style.height = (window.innerHeight * 0.50) + "px";
}

function openModal() {
	document.getElementById("MMBmodal").style.display = "block";
}

function openBookingConfirmationEmail() {
	document.getElementById("bookingConfModal").style.display = "block";
}

function openMarketingEmail() {
	document.getElementById("visaMarketingModal").style.display = "block";
}

window.onclick = function(event) {
	if (event.target == document.getElementById("MMBmodal")) {
		document.getElementById("MMBmodal").style.display = "none";
	} else if (event.target == document.getElementById("bookingConfModal")) {
		document.getElementById("bookingConfModal").style.display = "none";
	} else if (event.target == document.getElementById("visaMarketingModal")) {
		document.getElementById("visaMarketingModal").style.display = "none";
	}
}

function getTodaysDate() {
	var today = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
	var nextWeek = new Date();
	nextWeek.setDate(new Date().getDate() + 7);
	var returnDate = nextWeek.getFullYear() + '-' + ("0" + (nextWeek.getMonth() + 1)).slice(-2) + '-' + ("0" + nextWeek.getDate()).slice(-2)
	document.getElementById("departDate").value = today;
	document.getElementById("returnDate").value = returnDate;
}
// Opens flight_search.html. 
// Takes Origin, Destination, Outbound & Return Dates from Flight Search Form. Sets Return Date to 'null' if it's a one way trip
function goToFlightSearchPage() {
	let fromLocation = document.getElementById('fromLocation');
	let origin = fromLocation.value;
	let toLocation = document.getElementById('toLocation');
	let destination = toLocation.value;
	let outboundDate = document.getElementById('departDate').value;
	let returnDate = document.getElementById('returnDate').value;
	var randNum = Math.floor(Math.random() * 10) + 1;

	//Assigns OriginName based on Origin & Passport Based on Origin Country
	switch (origin) {
		case "YYZ":
			passport = "CAN";
			originName = "Toronto";
			break;
		case "YVR":
			passport = "CAN";
			originName = "Vancouver";
			break;
		case "JFK":
			passport = "USA";
			originName = "New York";
			break;
		case "LHR":
			passport = "GBR";
			originName = "London";
			break;
		case "CDG":
			passport = "FRA";
			originName = "Paris";
			break;
	}
	// Assigns Destination Name Based on destination
	switch (destination) {
		case "CAI":
			destinationName = "Cairo";
			break;
		case "IST":
			destinationName = "Istanbul";
			break;
		case "ICN":
			destinationName = "Seoul";
			break;
		case "BOM":
			destinationName = "Mumbai";
			break;
		case "DXB":
			destinationName = "Dubai";
			break;
		case "SGN":
			destinationName = "Ho Chi Minh";
			break;

	}

	var bookingRef = destination + randNum

	// Checks if return date is disabled and flight search and sets it to null if it is. Otherwise returnDate is set to the date selected
	if (document.getElementById('returnDate').disabled == true) {
		returnDate = 'null';
	} else {
		let returnDate = document.getElementById('returnDate').value;
	}
	window.location.href = `flightsearch.html?bookingRef=${bookingRef}&origin=${origin}&destination=${destination}&outboundDate=${outboundDate}&returnDate=${returnDate}&originName=${originName}&destinationName=${destinationName}&passport=${passport}`;
}

//retrieves an itinerary from a list and redirects to mmb.html based on the retrieved itinerary
function getItinerary(itinerary) {
	console.log(itinerary)
	switch (itinerary) {
		case "CAI1":
			window.location.href = `mmb.html?bookingRef=CAI1&origin=LHR&destination=CAI&outboundDate=2023-03-10&returnDate=2023-03-17&originName=London&destinationName=Cairo&passport=GBR`;
			break;
		case "ICN2":
			window.location.href = `mmb.html?bookingRef=ICN2&origin=CDG&destination=ICN&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Paris&destinationName=Seoul&passport=FRA`;
			break;
		case "IST3":
			window.location.href = `mmb.html?bookingRef=IST3&origin=JFK&destination=IST&outboundDate=2023-03-10&returnDate=2023-03-17&originName=New%20York&destinationName=Istanbul&passport=USA`;
			break;
		case "DXB4":
			window.location.href = `mmb.html?bookingRef=DXB4&origin=YVR&destination=DXB&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Vancouver&destinationName=Dubai&passport=CAN`;
			break;
		case "BOM5":
			window.location.href = `mmb.html?bookingRef=BOM5&origin=YYZ&destination=BOM&outboundDate=2023-03-10&returnDate=2023-03-17&originName=Toronto&destinationName=Mumbai&passport=CAN`;
			break;
	}
}

//goes to mmb.html and passes existing query parameters
function goToMMB() {
	window.location.href = `mmb.html${window.location.search}`;
}

//goes to destination_egypt.html
function destinationEgypt() {
	window.location.href = `destination_egypt.html`;
}

//goes to travellerInfo.html and passses existing query parameters
function goToBookingConfirmation() {
	window.location.href = `booking_confirmation.html${window.location.search}`;
}

//goes to booking_confirmation.html and passes existing query parameters
function goToTravellerInfo() {
	if (getReturnDate() == 'null' || window.location.pathname.indexOf('/returnsearch.html') !== -1) {
		window.location.href = `travellerInfo.html${window.location.search}`;
	} else {
		window.location.href = `returnsearch.html${window.location.search}`;
	}
}

// returns the query string
function getQueryString() {

	const queryString = window.location.search;
	//create urlParams object, passing the queryString values
	const urlParams = new URLSearchParams(queryString);
	return urlParams;

}

//Return the BOOKING REFERENCE from the URL Query Parameters
function getBookingReference() {
	const bookingRef = getQueryString().get('bookingRef')
	return bookingRef
}

//Return the ORIGIN from the URL Query Parameters
function getOriginCode() {

	const originCode = getQueryString().get('origin');
	return originCode;

}

//Return the DESTINATION from the URL Query Parameters
function getDestinationCode() {

	const destinationCode = getQueryString().get('destination');
	return destinationCode;

}

//Return the OUTBOUND date from the URL Query Parameters
function getOutboundDate() {
	const outboundDate = getQueryString().get('outboundDate');
	return outboundDate;
}

//Return the OUTBOUND date from the URL Query Parameters
function getReturnDate() {
	const returnDate = getQueryString().get('returnDate');
	return returnDate;
}

//Return the ORIGIN name from the URL Query Parameters
function getOriginName() {
	const originName = getQueryString().get('originName');
	return originName;
}

//Return the DESTINATION name
function getDestinationName() {
	const destinationName = getQueryString().get('destinationName');
	return destinationName;
}

//Return the PASSPORT from the URL Query Parameters
function getPassport() {
	const passport = getQueryString().get('passport');
	return passport;
}

// Creates and retrieves a segment array with: originCode, destinationCode, OriginName, DestinationName, Departure date, Arrival date

// function getSegments()
// {


//     let segments = [

//         //OUTBOUND segment
//         {
//           "originCode": getOriginCode(),
//           "originName": getOriginName(),
//           "destinationCode": getDestinationCode(),
//           "destinationName": getDestinationName(),
//           "departureDate": getOutboundDate(),
//           "arrivalDate":   getOutboundDate()
//         },
//         //RETURN segment (origin & departure are reversed)

//         {
//             "originCode": getDestinationCode(),
//             "originName": getDestinationName(),
//             "destinationCode": getOriginCode(),
//             "destinationName": getOriginName(),
//             "departureDate": getOutboundDate(),
//             "arrivalDate": getOutboundDate()
//         },]
//     return segments;
// }

//Populates the Booking Confirmation Page based on the URL Query Parameters
function populateBookingConfirmationPage() {
	// populate Booking Reference with bookingRef
	document.getElementById('bookingRef').insertAdjacentHTML("beforeend", getBookingReference());
	// populate DEPARTURE Origin with Origin Name & Origin Code
	document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
	// populate Departure Destination with Destination Name & Destination Code
	document.getElementById('departureDestination').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
	// populate RETURN Origin with Destination Name & Destination Code
	document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
	// populate RETURN Destintation with Origin Name & Origin Code
	document.getElementById('returnDestination').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;

	document.getElementById('outboundDepartureDate').insertAdjacentHTML("afterbegin", getOutboundDate());
	document.getElementById('outboundArrivalDate').insertAdjacentHTML("afterbegin", getOutboundDate());
	document.getElementById('returnDepartureDate').insertAdjacentHTML("afterbegin", getReturnDate());
	document.getElementById('returnArrivalDate').insertAdjacentHTML("afterbegin", getReturnDate());


	//if return date is null, hide the return segment, otherwise display it
	if (getReturnDate() == 'null') {
		document.getElementById("returnSegment").style.display = "none";
	} else {
		document.getElementById("returnSegment").style.display = "inline";
	}
}


//Populates the Return Search Page when the VI destination Ho Chi Minh (SGN) is selected
function populateFlightSearchPageVI() {

	document.getElementById('button1').style.display = "none";
	document.getElementById('button2').style.display = "none";
	document.getElementById('button3').style.display = "none";
	// populate page title with origin and destination
	document.getElementById('flightSearchTitle').innerHTML = `Flights from ${getOriginName()} (${getOriginCode()}) to ${getDestinationName()} (${getDestinationCode()})`;
	// populate Departure Origin with const origin
	document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
	// populate Departure Destination with const destination
	document.getElementById('departureDestination').innerHTML = `Tokyo <br> (NRT)`;
	document.getElementById('outboundDepartureDate').insertAdjacentHTML("afterbegin", getOutboundDate());
	document.getElementById('outboundArrivalDate').insertAdjacentHTML("afterbegin", getOutboundDate());

	// populate Departure Origin with const origin
	document.getElementById('departureOrigin2').innerHTML = `Tokyo <br> (NRT)`;
	// populate Departure Destination with const destination
	document.getElementById('departureDestination2').innerHTML = `Hong Kong <br> (HKG)`;
	document.getElementById('outboundDepartureDate2').insertAdjacentHTML("afterbegin", getOutboundDate());
	document.getElementById('outboundArrivalDate2').insertAdjacentHTML("afterbegin", getOutboundDate());

	// populate Departure Origin with const origin
	document.getElementById('departureOrigin3').innerHTML = `Hong Kong <br> (HKG)`;
	// populate Departure Destination with const destination
	document.getElementById('departureDestination3').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
	document.getElementById('outboundDepartureDate3').insertAdjacentHTML("afterbegin", getOutboundDate());
	document.getElementById('outboundArrivalDate3').insertAdjacentHTML("afterbegin", getOutboundDate());


}

//Populates the Return Search Page when the VI destination Ho Chi Minh (SGN) is selected
function populateReturnSearchPageVI() {



	document.getElementById('button1').style.display = "none";
	document.getElementById('button2').style.display = "none";
	document.getElementById('button3').style.display = "none";
	// populate page title with origin and destination
	document.getElementById('flightSearchTitle').innerHTML = `Flights from ${getDestinationName()} (${getDestinationCode()}) to ${getOriginName()} (${getOriginCode()})`;
	// populate Return Origin with const destination
	document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
	// populate Return Destintation with const origin
	document.getElementById('returnDestination').innerHTML = `Hong Kong <br> (HKG)`;
	document.getElementById('returnDepartureDate').insertAdjacentHTML("afterbegin", getReturnDate());
	document.getElementById('returnArrivalDate').insertAdjacentHTML("afterbegin", getReturnDate());

	// populate Return Origin with const destination
	document.getElementById('returnOrigin2').innerHTML = `Hong Kong <br> (HKG)`;
	// populate Return Destintation with const origin
	document.getElementById('returnDestination2').innerHTML = `Tokyo <br> (NRT)`;
	document.getElementById('returnDepartureDate2').insertAdjacentHTML("afterbegin", getReturnDate());
	document.getElementById('returnArrivalDate2').insertAdjacentHTML("afterbegin", getReturnDate());

	// populate Return Origin with const destination
	document.getElementById('returnOrigin3').innerHTML = `Tokyo <br> (NRT)`;
	// populate Return Destintation with const origin
	document.getElementById('returnDestination3').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
	document.getElementById('returnDepartureDate3').insertAdjacentHTML("afterbegin", getReturnDate());
	document.getElementById('returnArrivalDate3').insertAdjacentHTML("afterbegin", getReturnDate());


}

//Populates the Flight Search Page based on the URL Query Parameters
function populateFlightSearchPage() {

  //Check if VI destination Ho Chi Minh, if so use populateFlightSearchPageVI, otherise populate normally
	if (getDestinationCode() == "SGN") {

		populateFlightSearchPageVI();
		document.getElementById("bookFlightVI").style.display = "inline";
	} else {

		document.getElementById("bookFlightVI").style.display = "none";

		//populate page title with origin and destination
		document.getElementById('flightSearchTitle').innerHTML = `Flights from ${getOriginName()} (${getOriginCode()}) to ${getDestinationName()} (${getDestinationCode()})`;
		// populate Departure Origin with const origin
		document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
		// populate Departure Destination with const destination
		document.getElementById('departureDestination').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
		document.getElementById('outboundDepartureDate').insertAdjacentHTML("afterbegin", getOutboundDate());
		document.getElementById('outboundArrivalDate').insertAdjacentHTML("afterbegin", getOutboundDate());

		// populate Departure Origin with const origin
		document.getElementById('departureOrigin2').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
		// populate Departure Destination with const destination
		document.getElementById('departureDestination2').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
		document.getElementById('outboundDepartureDate2').insertAdjacentHTML("afterbegin", getOutboundDate());
		document.getElementById('outboundArrivalDate2').insertAdjacentHTML("afterbegin", getOutboundDate());

		// populate Departure Origin with const origin
		document.getElementById('departureOrigin3').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
		// populate Departure Destination with const destination
		document.getElementById('departureDestination3').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
		document.getElementById('outboundDepartureDate3').insertAdjacentHTML("afterbegin", getOutboundDate());
		document.getElementById('outboundArrivalDate3').insertAdjacentHTML("afterbegin", getOutboundDate());
	}
}
//Populates the Flight Search Page based on the URL Query Parameters
function populateReturnSearchPage() {

    //Check if VI destination Ho Chi Minh, if so use populateReturnSearchPageVI, otherise populate normally
	if (getDestinationCode() == "SGN") {

		populateReturnSearchPageVI();
		document.getElementById("bookFlightVI").style.display = "inline";
	} else {

		document.getElementById("bookFlightVI").style.display = "none";
		// populate page title with origin and destination
		document.getElementById('flightSearchTitle').innerHTML = `Flights from ${getDestinationName()} (${getDestinationCode()}) to ${getOriginName()} (${getOriginCode()})`;
		// populate Return Origin with const destination
		document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
		// populate Return Destintation with const origin
		document.getElementById('returnDestination').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
		document.getElementById('returnDepartureDate').insertAdjacentHTML("afterbegin", getReturnDate());
		document.getElementById('returnArrivalDate').insertAdjacentHTML("afterbegin", getReturnDate());

		// populate Return Origin with const destination
		document.getElementById('returnOrigin2').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
		// populate Return Destintation with const origin
		document.getElementById('returnDestination2').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
		document.getElementById('returnDepartureDate2').insertAdjacentHTML("afterbegin", getReturnDate());
		document.getElementById('returnArrivalDate2').insertAdjacentHTML("afterbegin", getReturnDate());

		// populate Return Origin with const destination
		document.getElementById('returnOrigin3').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
		// populate Return Destintation with const origin
		document.getElementById('returnDestination3').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
		document.getElementById('returnDepartureDate3').insertAdjacentHTML("afterbegin", getReturnDate());
		document.getElementById('returnArrivalDate3').insertAdjacentHTML("afterbegin", getReturnDate());
	}
}
//Populates the MMB Page based on the URL Query Parameters
function populateMMB() {
	// populate Booking Reference with bookingRef
	document.getElementById('bookingRef').insertAdjacentHTML("beforeend", getBookingReference());
	// populate Departure Origin with const origin
	document.getElementById('departureOrigin').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
	// populate Departure Destination with const destination
	document.getElementById('departureDestination').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
	// populate Return Origin with const destination
	document.getElementById('returnOrigin').innerHTML = `${getDestinationName()} <br> (${getDestinationCode()})`;
	// populate Return Destintation with const origin
	document.getElementById('returnDestination').innerHTML = `${getOriginName()} <br> (${getOriginCode()})`;
	document.getElementById('outboundDepartureDate').insertAdjacentHTML("beforeend", getOutboundDate());
	document.getElementById('returnDepartureDate').insertAdjacentHTML("beforeend", getReturnDate());

	//If return date is null, hide the return segment otherwise display it
	if (getReturnDate() == 'null') {
		document.getElementById("returnSegment").style.display = "none";
	} else {
		document.getElementById("returnSegment").style.display = "inline";
	}
}

function deepLink() {
	console.log(getDestinationCode())
	switch (getDestinationCode()) {
		case "DXB":
			countryCode = "ARE";
			break;
		case "IST":
			countryCode = "TUR";
			break;
		case "BOM":
			countryCode = "IND";
			break;
		case "ICN":
			countryCode = "KOR";
			break;
		case "CAI":
			countryCode = "EGY";
			break;
		case "SGN":
			countryCode = "VNM";
			break;
	}
	if (getReturnDate() == "null") {
		window.open(`https://apply.joinsherpa.com/travel-restrictions/${countryCode}?affiliateId=sherpaair&originAirport=${getOriginCode()}&nationality=${getPassport()}&fullyVaccinated=true&departureDate=${getOutboundDate()}&tripType=oneWay`, '_blank');
	} else {
		window.open(`https://apply.joinsherpa.com/travel-restrictions/${countryCode}?affiliateId=sherpaair&originAirport=${getOriginCode()}&nationality=${getPassport()}&fullyVaccinated=true&departureDate=${getOutboundDate()}&returnDate=${getReturnDate()}`, '_blank');
	}
}

function buildElement() {

	const elementConfig = {
		// 1. Element Placement: Where the Element is being placed on your site e.g. mmb, discovery            
		placement: "discovery",
		travellers: [{
			nationality: getPassport(), //traveller's passport
			vaccinations: [{
				type: 'COVID_19',
				status: 'FULLY_VACCINATED',
			}, ],
		}, ],
		segments: [{
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
		}, ],
	};

	return elementConfig;

}




var passport = 'CAN'
var destination = 'USA'
var transit = 'none'
var headline = ''
var html = ''

/* Base URLs needed */
const URL_TRIPS_V3 =
	'https://requirements-api.sandbox.joinsherpa.com/v3/trips?include=restriction,procedure';

/* Sandbox Key, DO NOT USE IN PRODUCTION */
const API_KEY_TRIPS_V3 = 'AIzaSyAqD2UB9rjUl0A2jvh_xiiKsJowbc7-eM8';

function itinerary(passport) {
	if (transit == "none") {
		return {
			data: {
				type: 'TRIP',
				attributes: {
					traveller: {
						passports: [passport],
						vaccinations: [{
							type: 'COVID_19',
							status: 'FULLY_VACCINATED',
						}, ],
					},
					locale: 'en-US',
					travelNodes: [{
							type: 'ORIGIN',
							departure: {
								date: '2023-05-12',
								time: '05:00',
								travelMode: 'AIR',
							},
							locationCode: 'CAN',
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
	} else {
		return {
			data: {
				type: 'TRIP',
				attributes: {
					traveller: {
						passports: [passport],
						vaccinations: [{
							type: 'COVID_19',
							status: 'FULLY_VACCINATED',
						}, ],
					},
					locale: 'en-US',
					travelNodes: [{
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



// A global map to read a specific restriction from
var requirementsHashMap = {};

/*
  A function that retrieves all travel requirements based on REQUEST_TRIPS_V3
  and renders only the visa requirements
*/
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
	headline = requirementsAll[0].headline


	// Find the information group related to visa requirements
	const requirementsVisa = requirementsAll.find(
		(requirementsGroup) => requirementsGroup.type == 'VISA_REQUIREMENTS'
	);

	// Convert the included restrictions and procedures to a hash map
	// This enables faster look up afterwards
	requirementsHashMap = response.included.reduce(function(map, obj) {
		map[obj.id] = obj;
		return map;
	}, {});

	const renderElement = document.getElementById('trips-v3');
	html += `<div>
  <p>${headline}</p>
 </div>`
	renderElement.innerHTML = html

	// Parse and display requirements recursively
	processGroupings(requirementsVisa.groupings, renderElement);
}

/*
  Displays Groupings and their associated data.
  This functions has to be recursive, because a grouping may have an object with the same type
  embedded inside
*/
function processGroupings(groupings, parentElement) {
	groupings.forEach((grouping) => {
		// Render all data in the grouping
		grouping.data.forEach((requirement) =>
			displayRequirement(requirementsHashMap[requirement.id])
		);

		// Call the same function on the child groupings if they exist
		if (grouping.groupings) {
			processGroupings(groupings.groupings, parentElement);
		}
	});
}

/*
  Displays a specific requirement 
*/
function displayRequirement(requirement) {
	requirement.attributes.actions.forEach((action) => {
		if (action.provider == 'sherpa') {
			// If sherpa offers this particular visa
			console.log(action);
			document.getElementById("radio").style.display = "block"
		}
	});
}

function submitNationality(country) {
	html = ''
	document.getElementById("radio").style.display = "none"
	document.getElementById("radioForm").reset();
	passport = country
	displayVisaRequirements();
}
