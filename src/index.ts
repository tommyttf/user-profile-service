import server from './app';

// Start server
server.listen(
  {
    host: '0.0.0.0', // listen on all interfaces for dockers
    port: 3000,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
