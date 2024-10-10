// utils/formateDate.js

/**
 * Format a date string into a more readable format.
 * @param {string} date - The date string to format.
 * @param {object} [config] - Optional configuration for date formatting.
 * @returns {string} - The formatted date string.
 */
export const formateDate = (date, config) => {
    const defaultOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const options = config || defaultOptions;
    return new Date(date).toLocaleDateString("en-US", options);
};
