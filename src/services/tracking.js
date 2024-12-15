import { addLocation } from './db';

let trackingInterval = null;
let lastPosition = null;

export function checkIfTracking() {
    return trackingInterval !== null;
}

export function startTracking() {
    if (trackingInterval) {
        return;
    }

    console.log('Tracking location...');
    getPosition(true, 60000); 

    trackingInterval = setInterval(() => {
        getPosition(true, 60000);
    }, 10000); 

    localStorage.setItem('trackingInterval', trackingInterval);
}

function getPosition(enableHighAccuracy, timeout) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const isMoving = lastPosition
            ? position.coords.latitude !== lastPosition.coords.latitude ||
              position.coords.longitude !== lastPosition.coords.longitude
            : false;

        const timestamp = new Date().toISOString();

        try {
            await addLocation({ ...position, timestamp }, isMoving);
            console.log('Location saved:', position, 'Moving:', isMoving, 'Timestamp:', timestamp);
        } catch (error) {
            console.error('Error saving location:', error);
        }

        lastPosition = position;

        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        console.log('Timestamp:', timestamp);
    }, (error) => {
        console.error('Error getting position:', error);
        if (enableHighAccuracy) {
            console.log('Retrying with high accuracy disabled...');
            getPosition(false, 240000); 
        } else {
            alert(`Error getting position: ${error.message}`);
            stopTracking(); 
        }
    }, {
        enableHighAccuracy: enableHighAccuracy,
        maximumAge: 60000,
        timeout: timeout
    });
}

export function stopTracking() {
    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }
}

function errorFn(error) {
    console.error('Error getting location:', error);
    alert('Error getting location, (Error: ' + error.message + ".) Location tracking will be stopped.");
    stopTracking();
}