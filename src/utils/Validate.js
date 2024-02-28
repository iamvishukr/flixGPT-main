export const checkValidEmail = (email) => {
    const isEmailValid= /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    if(!isEmailValid) return 'Please enter a valid email address or phone number.';
    return null;
}

export const checkValidPassword = (password) => {
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isPasswordValid) return 'Your password must contain between 4 and 60 characters.';
    return null;
}

export const checkValidName = (name) => {
    const isNameValid = /^[a-zA-Z\\s]*$/.test(name);
    if(!isNameValid) return "Enter a valid name.";
    return null;
}