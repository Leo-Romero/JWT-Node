const ERROR_HANDLERS = {
  CastError: response =>
    response.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (response, { message }) =>
    response.status(409).send({ error: message }),

  JsonWebTokenError: response =>
    response.status(401).json({ error: 'token missing or invalid' }),

  TokenExpirerError: response =>
    response.status(401).json({ error: 'token expired' }),

  defaultError: (response, error) => {
    console.error(error.name)
    response.status(500).end()
  }
}

module.exports = (error, req, res) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(res, error)
}
