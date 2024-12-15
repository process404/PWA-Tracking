import { addLocation, openDB } from './db.js';

let trackingInterval = null;
let lastPosition = null;
let time_out_var = 120000;
let acc_var = true;
let movement_mode_var = false;


export function checkIfTracking() {
    return trackingInterval !== null;
}

export async function startTracking(time_out, acc, movement_mode) {
    if (trackingInterval) {
        return;
    }

    time_out_var = time_out * 1000;
    acc_var = acc;
    movement_mode_var = movement_mode;

    await openDB();
    await requestNotificationPermission();
    
    // console.log('Tracking location...');
    showNotification('Tracking Started', { body: 'Location tracking is now active.' });
    getPosition(true, time_out_var, movement_mode_var); 

    trackingInterval = setInterval(() => {
        getPosition(acc_var, time_out_var, movement_mode_var);
    }, time_out_var); 


}

function getPosition(enableHighAccuracy, timeout, movement_mode) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const isMoving = lastPosition
            ? position.coords.latitude !== lastPosition.coords.latitude ||
              position.coords.longitude !== lastPosition.coords.longitude
            : true;

        if (movement_mode && !isMoving) {
            console.log('No significant movement detected, not saving location.');
            return;
        }

        const timestamp = new Date().toISOString();

        try {
            await addLocation({
                timestamp: timestamp,
                isMoving: isMoving,
                coords: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            });
            // console.log('Location saved:', position, 'Moving:', isMoving, 'Timestamp:', timestamp);
        } catch (error) {
            console.error('Error saving location:', error);
        }

        lastPosition = position;

        // console.log('Latitude:', position.coords.latitude);
        // console.log('Longitude:', position.coords.longitude);
        // console.log('Timestamp:', timestamp);
    }, (error) => {
        console.error('Error getting position:', error);
        if (enableHighAccuracy) {
            console.log('Retrying with high accuracy disabled...');
            getPosition(false, timeout * 3, movement_mode); 
        } else {
            errorFn(error);
        }
    }, {
        enableHighAccuracy: enableHighAccuracy,
        maximumAge: time_out_var,
        timeout: timeout
    });
}

export function stopTracking() {
    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
        showNotification('Tracking Stopped', { body: 'Location tracking has been stopped.' });
    }
}

function errorFn(error) {
    console.error('Error getting location:', error);
    alert('Error getting location, (Error: ' + error.message + ".) Location tracking will be stopped.");
    stopTracking();
}

export async function requestNotificationPermission() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    } else {
        console.log('Notifications are not supported by this browser.');
    }
}

export function showNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(title, options);
            });
        }
    }
}

