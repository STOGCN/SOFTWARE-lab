


function register(registerData){
    const { fname, lname, occupation, email, password } = registerData;
    return { status: fname + ' Register Successful' };
}

function login(loginData){
    const { username, password } = loginData;
    return { status: username + ' Login Successful' };
}

module.exports = {
    login,
    register
};



