const Mali = require("mali"),
path = require("path"),
{ LoadProtos } = require("./actions/loadProtos");
require("dotenv").config();


const service = new Mali(
  path.join(path.resolve(), 'src', 'protos', 'main', 'protoService.proto'),
  'ProtoService'
)

service.use({LoadProtos})

const address = `${process.env.HOST}:${process.env.PORT}`

service.start(address).then(() => {
  console.clear()
  console.group(`GRPC - ${process.env.NAME} started`);
  console.log("address:", address);
  console.groupEnd()
})
