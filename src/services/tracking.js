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
    getPosition(true, 2000); // First attempt with high accuracy and short timeout
}

function getPosition(enableHighAccuracy, timeout) {
    navigator.geolocation.watchPosition(async (position) => {
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
            getPosition(false, 60000); // Retry with high accuracy disabled and longer timeout
        } else {
            alert(`Error getting position: ${error.message}`);
            stopTracking(); // Stop tracking on error
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

export function getCount() {se
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('locations', 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('locations', 'readonly');
            const store = transaction.objectStore('locations');
            const countRequest = store.count();

            countRequest.onsuccess = () => {
                resolve(countRequest.result);
            };

            countRequest.onerror = () => {
                reject(countRequest.error);
            };
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}