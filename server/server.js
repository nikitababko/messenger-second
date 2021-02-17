const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Server has started on port ${PORT}`);
});
