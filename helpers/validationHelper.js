module.exports = {
    validateUser: (user) => {
        const errors = {};
        if (!user.fullName) {
            errors.fullName = "Full name is required.";
        }
        if (!user.email) {
            errors.email = "Email is required.";
        }
        if (!user.dob) {
            errors.dob = "Date of birth is required.";
        }
        if (!user.phoneNumber) {
            errors.phoneNumber = "Phone number is required.";
        }
        return errors;
    },
};
