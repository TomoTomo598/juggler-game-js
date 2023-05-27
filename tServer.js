const app = require('http');
app.createServer((request, response) => response.send('Yhoo!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT} port!`);
});