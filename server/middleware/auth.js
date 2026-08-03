//gatekeeper function that runs before certain routes, to check "is this request coming from a logged-in user

const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next)
// (Request), res (Response), and next (Next function) are the three fundamental parameters 
// passed to middleware functions and route handlers to manage the server's lifecycle.
{
    constauthHeader = req.headers.authorization;

    // Check for missing or malformed Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: 'No token provided'});
    }

    const token=authHeader.split(' ')[1]; //extracts a JSON Web Token (JWT) from an HTTP Authorization header that uses the standard Bearer schema

    try{
        // Verify token using the secret environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // user payload into the request object

    next();
    } catch (err) {
     // Handle expired, tampered, or invalid tokens
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;
