console.log('Client-side code running');

const createButton = document.getElementById('createButton');
const showButton = document.getElementById('showButton');
const depositButton = document.getElementById('depositButton');
const withdrawButton = document.getElementById('withdrawButton');

createButton.addEventListener('click', function() {
  var customer_name = document.getElementById("nameEntry").value;
  var starting_amount = document.getElementById("amount").value;

  console.log(`creating ${customer_name}: ${starting_amount}`);

  fetch(`/create?name=${customer_name}&amount=${starting_amount}`, {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('new account created');
        document.getElementById("displayBalance").innerHTML = `${customer_name}: $${starting_amount}`;
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });

});

showButton.addEventListener('click', function() {
  var customer_name = document.getElementById("nameEntry").value;

  console.log(`show balance for ${customer_name}`);

  fetch(`/balance?name=${customer_name}`, {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      const user = data;
      console.log(user);
      document.getElementById("displayBalance").innerHTML = `${user.name}: ${user.balance}`;
      return;
    })
    .catch(function(error) {
      console.log(error);
    });

});

depositButton.addEventListener('click', function() {
  var customer_name = document.getElementById("nameEntry").value;
  var deposit_amount = document.getElementById("amount").value;

  console.log(`depositing ${customer_name}: ${deposit_amount}`);

  fetch(`/deposit?name=${customer_name}&amount=${deposit_amount}`, {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      console.log(data);

      const user = data.value;
      console.log(user);
      document.getElementById("displayBalance").innerHTML = `${user.name}: ${user.balance}`;
      return;
    })
    .catch(function(error) {
      console.log(error);
    });
});

withdrawButton.addEventListener('click', function() {
  var customer_name = document.getElementById("nameEntry").value;
  var withdraw_amount = document.getElementById("amount").value;

  console.log(`withdrawing ${customer_name}: ${withdraw_amount}`);

  fetch(`/withdraw?name=${customer_name}&amount=${withdraw_amount}`, {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      const user = data.value;
      console.log(user);
      document.getElementById("displayBalance").innerHTML = `${user.name}: ${user.balance}`;
      return;
    })
    .catch(function(error) {
      console.log(error);
    });
});