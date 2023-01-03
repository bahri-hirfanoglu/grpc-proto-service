const caller = require('grpc-caller'),
path = require('path')

function LogService(url) {
  return caller(
    url,
    path.join(path.resolve(), 'src', 'protos', 'logService.proto'),
    'LogService'
  )
}

module.exports = LogService