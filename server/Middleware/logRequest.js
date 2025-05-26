// middlewares/logRequest.js
import logger from '../Utils/logger.js';

const logRequest = (req, res, next) => {
  const userId = req.user ? req.user.id : 'Anonymous';
 const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.connection.remoteAddress;

  logger.info(`${req.method} ${req.originalUrl} by ${userId} from ${ip}`);
  next();
};

export default logRequest;
