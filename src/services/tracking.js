import { addLocation } from './db';

let trackingInterval = null;
let lastPosition = null;
let time_out_var = 120000;
let acc_var = true;
let movement_mode_var = false;


export function checkIfTracking() {
    return trackingInterval !== null;
}

export function startTracking(time_out, acc, movement_mode) {
    if (trackingInterval) {
        return;
    }

    time_out_var = time_out;
    acc_var = acc;
    movement_mode_var = movement_mode;

    console.log('Tracking location...');
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
            : false;

        if (movement_mode && !isMoving) {
            console.log('No significant movement detected, not saving location.');
            return;
        }

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
            getPosition(false, timeout * 3, movement_mode); 
        } else {
            alert(`Error getting position: ${error.message}`);
            stopTracking(); 
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
    }
}

function errorFn(error) {
    console.error('Error getting location:', error);
    alert('Error getting location, (Error: ' + error.message + ".) Location tracking will be stopped.");
    stopTracking();
}