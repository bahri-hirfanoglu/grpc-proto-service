exports.SendMessage = async function (context) {
  try {
    const { data } = context.req;
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
