export const isEmpty = (input) => {
    if (input.length == 0) {
        return true;
    }
    return false;
}
export const checkEmail = (input) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.length == 0) {
        return true;
    }
    else if (!input.match(validRegex)) {
        return true
    }
    return false
}
export const checkContactNo = (input) => {
    var phoneno = /^\d{10}$/;
    if (input.length == 0) {
        return true;
    }
    else if (!input.match(phoneno)) {
        return true
    }
    return false
}