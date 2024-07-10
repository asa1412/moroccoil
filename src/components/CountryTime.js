import React, { useEffect, useState } from 'react';
import siteSettings from '../assets/data/siteUtils';

const CountryTime = () => {
    const [time, setTime] = useState(''); // Initialize with empty string or loading placeholder

    useEffect(() => {
        const timezoneMap = {
            'USA': 'America/New_York',
            'Morocco': 'Africa/Casablanca',
            // Add more countries and their timezones as needed
        };

        const countryENG = siteSettings.countryENG;
        const country = siteSettings.country;
        const timezone = timezoneMap[countryENG] || 'UTC';  // Default to UTC if no timezone is found
        
        const updateTime = () => {
            const newTime = new Date().toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setTime(`זמן עדכני ב${country}: ${newTime}`);
        };

        updateTime();  // Call immediately to set time as soon as component mounts
    }, []);  // Empty dependency array ensures this runs only once

    return <div>{time}</div>;
};

export default CountryTime;
