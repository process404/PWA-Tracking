import { openDB , addLocation } from './db.js'

let trackingInterval = null;

export function startTracking() {
    trackingInterval = setInterval(() => {
        console.log('Tracking location...');
        navigator.geolocation.getCurrentPosition((position) => {
            const isMoving = lastPosition
            ? position.coords.latitude !== lastPosition.coords.latitude ||
              position.coords.longitude !== lastPosition.coords.longitude
            : false;

            addLocation(position, isMoving).then(() => {
                console.log('Location saved:', position, 'Moving:', isMoving);
            }).catch((error) => {
                console.error('Error saving location:', error);
            });

            lastPosition = position;
            
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
        }, (error) => {
            console.error('Error getting location:', error);
        });
    }, 5000);
}

export function stopTracking() {
    if(trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }
}
