const fs = require("fs"),
  path = require("path"),
  hostList = require("../protos/main/host.json");

exports.LoadProtos = async function (context) {
  try {
    const { token, protos } = context.req;
    if (!Array.isArray(protos)) {
      return CreateError(context, "protos is not array", 400);
    }
    if (token != process.env.TOKEN) {
      return CreateError(context, "token invalid", 400);
    }

    let files = [];
    let hosts = {};
    protos.forEach((element) => {
      const name = element.name;
      const filePath = path.join(path.resolve(), "src", "protos", name);
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath, "base64");
        if (hostList[name]) hosts[name] = hostList[name];
        files.push({ buffer, name });
      }
    });

    context.res = {
      files,
      hosts: JSON.stringify(hosts),
    };
    return null;
  } catch (error) {
    return CreateError(context, error, error.code);
  }
};
