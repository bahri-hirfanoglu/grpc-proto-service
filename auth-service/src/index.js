const Mali = require("mali");
const { SendMessage } = require("./actions/sendMessage"),
  path = require("path"),
  {LoadProtos} = require('./helpers/loadProto')

require("dotenv").config();

async function Initialize() {
  console.clear();
  await LoadProtos();

  const service = new Mali(
    path.join(path.resolve(), "src", "protos", "authService.proto"),
    "AuthService",
    { defaults: true }
  );
  service.use({ SendMessage });

  const address = `${process.env.HOST}:${process.env.PORT}`;

  service.start(address).then(() => {
    console.group(`GRPC - ${process.env.NAME} started`);
    console.log("address:", address);
    console.groupEnd();
  });
}

Initialize();
