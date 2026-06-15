const mongoose = require('mongoose');

const uri = 'mongodb+srv://sujithd676_db_user:3gERkwvEhp5VSm9E@cluster0.3uj5vmz.mongodb.net/flowstateai?appName=Cluster0';

console.log('Connecting to MongoDB...');
mongoose.connect(uri)
  .then(() => {
    console.log('SUCCESS! MongoDB connection is working.');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILED!', err.message);
    process.exit(1);
  });
