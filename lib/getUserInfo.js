const getUserInfo = function(user) {
    return {
        email: user.email,
        name: user.name,
        surname: user.surname
    }

}
module.exports = getUserInfo;