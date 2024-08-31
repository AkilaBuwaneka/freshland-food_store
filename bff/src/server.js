const app = require("./app");
const port = 4000;

app.listen(port, () => {
  console.log(`BFF server listening at http://localhost:${port}`);
});
