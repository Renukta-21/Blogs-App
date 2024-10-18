const app = require('./app');
const config = require('./utils/config');

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT} in ${process.env.NODE_ENV} mode`);
});