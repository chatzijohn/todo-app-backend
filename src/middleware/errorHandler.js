class CustomError extends Error {
    constructor(name, statusCode, message) {
        super(message)
        this.name = name
        this.statusCode = statusCode
    }
}

const errors = {
    SequelizeUniqueConstraintError: new CustomError("SequelizeUniqueConstraintError", 409, "Unique constraint violation"),
    SequelizeValidationError: new CustomError("SequelizeValidationError", 422, "Invalid data. Please check your request payload."),
    RequiredPropertiesError: new CustomError("RequiredPropertiesError", 400, "All required properties must be provided"),
    NotFoundError: new CustomError("NotFoundError", 404, "Not found"),
    AuthenticationError: new CustomError("AuthenticationError", 401, "Authentication failed"),
    AuthorizationError: new CustomError("AuthorizationError", 403, "Authorization failed"),
    BadRequestError: new CustomError("BadRequestError", 400, "Bad request. Please check your request payload"),
    MissingTitleError: new CustomError("MissingTitleError", 400, "A title must be provided"),
    NotCompletedError: new CustomError("NotCompletedError", 400, "Task is not completed"),
    EmptyBodyError: new CustomError("EmptyBodyError", 400, "Body can't be empty"),
    TaskNotFoundError: new CustomError("TaskNotFoundError", 404, "Task Not found"),
    // Add other error types here
}

const errorHandler = (err, req, res, next) => {
    const errorType = errors[err.name]
    if (errorType) {
        res.status(errorType.statusCode).json({ message: errorType.message })
    } else {
        // Handle unexpected errors
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export default errorHandler

