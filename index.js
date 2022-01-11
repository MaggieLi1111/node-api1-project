const server = require('./api/server');

const port = 9000;

// console.log("hey you!");

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})