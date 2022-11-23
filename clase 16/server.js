const app = require('./app');

const PORT = process.env.SERVER_PORT  || 3000;

app.listen(PORT, () => console.info(`Server up and runnning on PORT ${PORT}`))