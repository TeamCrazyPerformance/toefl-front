export const fetchPlaceNearBy = (mapInstance, searchRadius) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);
    service.nearbySearch(
      {
        location: {
          lat: mapInstance.center.lat(),
          lng: mapInstance.center.lng()
        },
        radius: searchRadius,
        type: ["restaurant"]
      },
      (results, status) => {
        if (status !== "OK") reject();
        resolve(results);
      }
    );
  }).then(newPlaces => {
    const newFormatPlaces = newPlaces.map(place => {
      return {
        name: place.name,
        placeId: place.place_id,
        address: place.vicinity,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      };
    });
    return newFormatPlaces;
  });
};

export const fetchPlace = (mapInstance, placeId) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);
    service.getDetails(
      {
        placeId,
        fields: ["name", "formatted_phone_number", "geometry", "vicinity"]
      },
      (results, status) => {
        if (status !== "OK") reject();
        resolve(results);
      }
    );
  }).then(placeDetail => {
    const newFormatPlaceDetail = {
      name: placeDetail.name,
      placeId,
      phoneNumber: placeDetail.formatted_phone_number,
      address: placeDetail.vicinity,
      location: {
        lat: placeDetail.geometry.location.lat(),
        lng: placeDetail.geometry.location.lng()
      }
    };
    return newFormatPlaceDetail;
  });
};
