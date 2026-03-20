export default function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  const status = err.status || 500;
  const message = err.message || '服务器内部错误';
  
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
