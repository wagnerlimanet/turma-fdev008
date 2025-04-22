const net = require('net');

const clients = [];

const server = net.createServer(client => {
    clients.push(client);

    client.on('data', data => {
        const message = data.toString().trim();
        console.log('Received:', message);

        // Envia a mensagem recebida para todos os clientes, exceto o remetente
        clients.forEach(c => {
            if (c !== client) {
                c.write(message);
            }
        });
    });

    client.on('end', () => {
        const index = clients.indexOf(client);
        clients.splice(index, 1);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
