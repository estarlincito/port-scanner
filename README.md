# Port Scanner with Node.js ^v23

This is a simple Node.js port scanner that allows you to scan a range of ports on a given IP address to check if they are open or closed.

## Project Setup

1. **Clone or download this repository** to your local machine.

```bash
git clone https://github.com/estarlincito/port-scanner.git
```

2. Navigate to the project directory.

```bash
cd port-scanner
```

3. Install the required dependencies:

```bash
pnpm i
```

## Usage

1. Run the script using the following command:

```bash
pnpm start
```

    2.	The program will prompt you to enter your local IP address (e.g., 127.0.0.1 for localhost or your local network IP like 192.168.1.10).
    3.	Next, you will be asked to provide a range of ports you want to scan (e.g., 1-3000).
    4.	The script will then attempt to connect to each port in the given range and display whether the port is open or closed.

Example:

Please enter your local IP: example: 127.0.0.1
Please enter the range of ports to scan: example: 1-3000
☠️ Port 80 is open.
Port 81 is closed.
☠️ Port 443 is open.
...

## Code Breakdown

```typescript
askQuestion(query: string): Promise<string>
```

This function prompts the user for input in the console, waits for a response, and returns a promise that resolves with the entered value.

```typescript
checkPort(port: number, ip: string): Promise<number>
```

This function attempts to establish a TCP connection to a specified port on a given IP address. If the connection is successful, it resolves the promise; otherwise, it rejects the promise (indicating the port is closed).

```typescript
scanPorts();
```

This function orchestrates the entire port scanning process. It prompts the user for an IP and a port range, validates the range, and scans each port within the specified range.

## Package Configuration

The package.json for this project is configured as follows:

```json
{
  "name": "port-scanner",
  "type": "module",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.ts",
  "scripts": {
    "start": "node --watch src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.0.0"
  }
}
```

This configuration ensures that:
• The project uses TypeScript (src/index.ts).
• The start script runs the application with the --watch flag to automatically reload changes in development.

## Troubleshooting

• Make sure that the IP address and port range are entered correctly.
• Ensure that your firewall settings allow for port scanning.
• If a port is closed or blocked, it might be due to network restrictions or firewall configurations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
