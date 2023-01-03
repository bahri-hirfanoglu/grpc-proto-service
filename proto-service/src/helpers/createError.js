const {status: grpcStatus} = require('@grpc/grpc-js')

exports.CreateError = function(context, message, status) {
  const error = new Error(message.details || message.message || message)
  error.code = grpcStatus[status]

  if (typeof status === 'number') {
    error.code = status
  }

  context.res = error
}