export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status ? err.statusCode : 500;

    res.status(statusCode).json({
        errors: {
            body: [err.message]
        }
    })

}