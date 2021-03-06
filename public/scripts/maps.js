var map;

function initMap() {
    //const location = {lat: userSearchData.lat, lng: userSearchData.long};
    const location = {
        lat: 29.760427,
        lng: -95.369804
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,

    });

    /* ADD SINGLE MARKER
    const marker = new google.maps.Marker({
        position: {lat:29.760427,lng:-95.369804},
        map: map //map we want to add marker to
        icon: ''
    });
    const infoWindow = new google.maps.InfoWindow({
        content: '<h1>Houston Places</h1>'
    });
    marker.addListener('click', function(){
        infoWindow.open(map, marker);
    }) */

    //array of markers
    // const markers = [
    //     // {
    //     //     coords:{lat: 29.7528742, lng: -95.3412637},
    //     //     // iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    //     //     iconImage: 'https://www.clipartsfree.net/vector/small/55520-head-symbol-yellow-person-icon.png',
    //     //     content: '<h1>You are here</h1>'
    //     // },
    //     {
    //         coords: {
    //             lat: 29.7528742,
    //             lng: -95.3412637
    //         } //DigitalCrafts
    //     },
    //     {
    //         coords: {
    //             lat: 29.6955926,
    //             lng: -95.4172277
    //         } //Kroger
    //     }
    // ];
    
    // //Loop through markers
    // for (var i = 0; i < markers.length; i++) {
    //     addMarker(markers[i]); //calling the function
    // }
    // // Add Marker Function
    // function addMarker(props) {
    //     const marker = new google.maps.Marker({
    //         position: props.coords,
    //         map: map, //map we want to add marker to
    //         // icon: props.iconImage
    //     });
    //     //check for custom icon
    //     if (props.iconImage) {
    //         // Set icon image so that we don't have undefined value if no specific icon
    //         marker.setIcon(props.iconImage);
    //     }
    //     //check for content
    //     if (props.content) {
    //         const infoWindow = new google.maps.InfoWindow({
    //             content: props.content
    //         });
    //         marker.addListener('click', function () {
    //             infoWindow.open(map, marker);
    //         })
    //     }
    // }
}


function createMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        addMarker(markers[i]); //calling the function
    }
    // Add Marker Function
    function addMarker(props) {
        const marker = new google.maps.Marker({
            position: props,
            map: map, //map we want to add marker to
            // icon: props.iconImage
        });
        //check for custom icon
        if (props.iconImage) {
            // Set icon image so that we don't have undefined value if no specific icon
            marker.setIcon(props.iconImage);
        }
        //check for content
        if (props.content) {
            const infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            })
        }
    }
}