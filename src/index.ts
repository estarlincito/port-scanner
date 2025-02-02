import net from 'net';
import Readline from 'readline';

// Function that returns a Promise to handle the input asynchronously
function askQuestion(query: string): Promise<string> {
  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close(); // Close the interface after the answer
      resolve(answer); // Resolve the Promise with the user's input
    });
  });
}

const checkPort = async (port: number, ip: string) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(2000); // Timeout duration (2 seconds)
    socket.on('connect', () => {
      resolve(port); // If connection is successful, the port is open
      socket.destroy();
    });
    socket.on('timeout', () => {
      reject(port); // If there's a timeout, the port is closed
      socket.destroy();
    });
    socket.on('error', (err) => {
      reject(port); // If there's an error, the port is closed
    });

    socket.connect(port, ip); // Try to connect to the specified port
  });
};

// Scan ports in the defined range
const scanPorts = async () => {
  //186.7.48.36 (public), local 127.0.0.1 (localhost) or  192.168.1.10 (inet)
  const ip = await askQuestion(
    'Please enter your local IP: example: 127.0.0.1 \n'
  );

  //If

  // Range of ports to scan
  const portsRange = await askQuestion(
    'Please enter the range of ports to scan: example:1-3000 '
  );

  const startPort = parseInt(portsRange.split('-')[0]);
  const endPort = parseInt(portsRange.split('-')[1]);

  if (isNaN(startPort) || isNaN(startPort)) {
    console.log('⚠️ The range of ports need to be like: 1-3000, no text');
    scanPorts();
  }

  if (startPort > endPort) {
    console.log('⚠️ The range of ports need to be like: 1-3000');
    scanPorts();
  }

  for (let port = startPort; port <= endPort; port++) {
    try {
      await checkPort(port, ip);
      console.log(`☠️ Port ${port} is open.`);
    } catch (error) {
      console.log(`Port ${port} is closed.`);
    }
  }
};

// Start scanning
scanPorts();
