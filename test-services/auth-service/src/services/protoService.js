const caller = require('grpc-caller'),
path = require('path')

function ProtoService(url) {
  return caller(
    url,
    path.join(path.resolve(), 'src', 'protos', 'main', 'protoService.proto'),
    'ProtoService'
  )
}

module.exports = ProtoService