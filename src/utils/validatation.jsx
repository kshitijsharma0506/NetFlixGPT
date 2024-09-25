export const checkData = (email, password, ...args) => {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    const isValidUserName= /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

    if(!isValidEmail) {
        return "Please enter a valid Email address";
    }
    if(!isValidPassword) {
        return "Please enter a valid password (at least 8 characters, including uppercase, lowercase letters, numbers and special characters)";
    }
    if(args.length>0){
        if(!isValidUserName.test(args)) {
            return "Please Enter a valid user name (Starting with a letter, can only contain alphanumeric characters and underscores & should be between 3 to 16 characters long)"
        }
    }    
    return null;
}