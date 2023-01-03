const ProtoService = require("../services/protoService");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(path.resolve(), ".env") });

//required proto files list
const protos = [
  { name: "logService" },
];

exports.LoadProtos = async function () {
  try {
    /* PROTO SERVICE START */
    if (process.env.PROTO_UPDATE ?? "false" == "true") {
      //connected proto services
      const protoService = ProtoService(
        `${process.env.PROTO_HOST}:${process.env.PROTO_PORT}`
      );
      //proto files request
      const protoResponse = await protoService.LoadProtos({
        token: process.env.TOKEN,
        protos,
      });
      console.group("proto service load");
      //response files created
      if (protoResponse.files) {
        protoResponse.files.forEach((element) => {
          const filePath = path.join(
            path.resolve(),
            "src",
            "protos",
            element.name
          );
          let bufferCompare = null;
          //check file exists
          if (fs.existsSync(filePath)) {
            const currentFileBuffer = fs.readFileSync(filePath, "base64");
            //the current file compare with the incoming file
            bufferCompare =
              Buffer.compare(
                Buffer.from(currentFileBuffer),
                Buffer.from(element.buffer)
              ) == 0;
          }
          //update or create proto file
          if (bufferCompare != true) {
            //write proto file
            fs.writeFileSync(filePath, element.buffer, { encoding: "base64" });
            console.log(
              `${bufferCompare != null ? "update:" : "create:"} ${element.name}`
            );
          } else {
            console.log(`up to date: ${element.name}`);
          }
        });
      } else {
        console.log("proto files could not be found or loaded.");
      }

      if (protoResponse.hosts) {
        const hostFilePath = path.join(
          path.resolve(),
          "src",
          "protos",
          "main",
          "host.json"
        );
        fs.writeFileSync(hostFilePath, protoResponse.hosts);
      }

      if (process.env.PROTO_UNUSED_DELETE == "true") {
        //protos folder file list
        const deleteFiles = fs.readdirSync(
          path.join(path.resolve(), "src", "protos")
        );
        //delete unused proto files
        if (Array.isArray(deleteFiles)) {
          deleteFiles.forEach((element) => {
            if (path.extname(element) == ".proto") {
              if (!protos.find((A) => `${A.name}.proto` == element)) {
                fs.unlinkSync(
                  path.join(path.resolve(), "src", "protos", element)
                );
                console.log(`delete: ${element}`);
              }
            }
          });
        }
      }
      console.log("---------------------------------------");
      console.groupEnd();
    }
    /* PROTO SERVICE FINISH */
  } catch (ex) {
    console.log(`LoadProtos Error: ${ex}`);
  }
};
