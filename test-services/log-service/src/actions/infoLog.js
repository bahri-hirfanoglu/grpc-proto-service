exports.InfoLog = async function (context) {
  try {
    const { log, level } = context.req;
    context.res = {
      status: 200,
      message: { level, log },
    };
    return null;
  } catch (ex) {
    logger.error(ex);
    return CreateError(context, ex.message, "ApiToService - Exception");
  }
};
