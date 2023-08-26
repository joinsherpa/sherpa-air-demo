function sendPostRequest() {
            
    const data = {
        "data": {
            "type": "TRIP",
            "attributes": {
                "category": "ONE_WAY_TRIP",
                "travellers": [
                    {
                        "vaccinations": [
                            {
                                "type": "COVID_19",
                                "status": "FULLY_VACCINATED"
                            }
                        ],
                        "nationality": "CAN"
                    }
                ],
                "segments": [
                    {
                        "segmentType": "OUTBOUND",
                        "origin": {
                            "countryCode": "CAN"
                        },
                        "destination": {
                            "countryCode": "EGY"
                        },
                    
                        "departureDate": "2023-12-27",
                        "departureTime": "12:59",
                        "arrivalDate": "2023-12-27",
                        "arrivalTime": "12:59"
                    }
                ]
            }
        }
    };
            axios.get('https://requirements-api.sandbox.joinsherpa.com/v2/trips?affiliateId=sherpa&key=AIzaSyBMytiDGtwdHYAf2juFwPeXZr0x2KLTI3I&language=en-US&include=restriction,procedure', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'crossDomain': true,
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Methods': '*'
                }
            
            })
            .then(response => {
                console.log('Response from server:', response.data);
                // Handle the response from the server as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors that occurred during the request
            });
        }