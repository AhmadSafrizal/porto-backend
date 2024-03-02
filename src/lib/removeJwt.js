const { verifyToken } = require("./jwt");

const removeTokenFromSession = (session) => {
    try {
        if (session && session.token) {
            const decodedToken = verifyToken(session.token);

            // Log decodedToken to check if it's valid
            console.log("Decoded Token before removal:", decodedToken);

            // Destroy the session to remove the token
            session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    throw new Error("Failed to remove token from session");
                }
            });

            // Log session after token removal (should be undefined)
            console.log("Session after token removal:", session);
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to remove token from session");
    }
};

module.exports = {
    removeTokenFromSession,
};
