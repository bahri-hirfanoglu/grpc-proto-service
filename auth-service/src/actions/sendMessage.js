const LogService = require("../services/logService");
try {
  const hosts = require("../protos/main/host.json");
} catch (ex) {}

exports.SendMessage = async function (context) {
  try {
    const { data } = context.req;
    const logServiceHost = hosts["logService"];
    const logServiceInstance = new LogService(
      `${logServiceHost.host}:${logServiceHost.port}`
    );
    if (logServiceInstance) {
      logServiceInstance.InfoLog(`Auth Service SendMessage: ${data}`, 1);
    }
    context.res = {
      status: 200,
      message: data,
    };
    return null;
  } catch (ex) {
    logger.error(ex);
    return CreateError(context, ex.message, "ApiToService - Exception");
  }
};
