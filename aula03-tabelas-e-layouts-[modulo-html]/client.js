const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

const HOST = '192.168.10.245';
const PORT = 3000;

client.connect(PORT, HOST, () => {
    console.log(`Connected to server on ${HOST}:${PORT}`);

    client.on('data', data => {
        console.log('Received:', data.toString());
    });

    rl.on('line', input => {
        client.write(input);
    });
});

client.on('close', () => {
    console.log('Connection closed');
});
