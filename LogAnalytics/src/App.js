import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';

///const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [user_name, app_id, action_id] = useState([currentUser ? currentUser.accountId : 'SuperHero', 'Example App', 'Example Action']);

  const getAnalytics = function() { 
      contract.get_analytics().then(analitics => {
        Form.useState(analitics);
    });
  }

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    getAnalytics();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, user_name, app_id, action_id } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract.set_analytics(
      { user_name, app_id, action_id }
    ).then(() => {
      getAnalytics();
    });
  };

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR Analitic Logs'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>NEAR Analitic Logs</h1>
        { currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </header>
      { currentUser
        ? <Form onSubmit={onSubmit} currentUser={currentUser} analitics={ user_name.value, app_id.value, action_id.value } />
        : <SignIn/>
      }
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    set_analitics: PropTypes.func.isRequired,
    get_analytics: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  analitics: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
    app_id: PropTypes.string.isRequired,
    action_id: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
