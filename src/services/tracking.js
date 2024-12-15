import { openDB , addLocation } from './db.js'

let lastPosition = null;

let trackingInterval = null;

export function checkIfTracking(){
    return trackingInterval !== null;
}

export function startTracking() {
    if (trackingInterval) {
        return;
    }

    console.log('Tracking location...');
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
        alert(`Error getting position: ${error.message}`);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 60000,
    });
}

function errorFn(error){
    console.error('Error getting location:', error);
    alert('Error getting location, (Error: ' + error.message + ".) Location tracking will be stopped.");
    stopTracking();
}

export function stopTracking() {
    if(trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }
}

export function getCount(){
    return new Promise((resolve, reject) => {
        openDB().then((db) => {
            const transaction = db.transaction(['coords'], 'readonly');
            const store = transaction.objectStore('coords');
            const request = store.count();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        }).catch((error) => {
            reject(error);
        });
    });
}