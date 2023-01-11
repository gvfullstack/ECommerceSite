const zipValidator = (value) => value.match(/^\d{5}?$/) ? "" : "Please enter a five digit zip code."

export default zipValidator;
