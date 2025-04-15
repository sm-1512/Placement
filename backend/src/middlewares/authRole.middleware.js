export const authoriseRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "Access Denied"})
        }
        next();
    }
}