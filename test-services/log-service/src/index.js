const Mali = require("mali");
const { InfoLog } = require("./actions/infoLog"),
  path = require("path"),
  {LoadProtos} = require('./helpers/loadProto')

require("dotenv").config();

async function Initialize() {
  console.clear();
  await LoadProtos();

  const service = new Mali(
    path.join(path.resolve(), "src", "protos", "logService.proto"),
    "LogService",
    { defaults: true }
  );
  service.use({ InfoLog });

  const address = `${process.env.HOST}:${process.env.PORT}`;

  service.start(address).then(() => {
    console.group(`GRPC - ${process.env.NAME} started`);
    console.log("address:", address);
    console.groupEnd();
  });
}

Initialize();
