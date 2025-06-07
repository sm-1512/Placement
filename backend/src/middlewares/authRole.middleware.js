export const authoriseRoles = (...allowedRoles) => {
    return (req, res, next) => {

        console.log("Allowed roles:", allowedRoles);           // Debug line
        console.log("User role:", req.user?.role);              // Debug line

        if(!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "Access Denied"})
        }
        next();
    }
}