import React from 'react';
import PropTypes from 'prop-types';

class Form {
  constructor({ onSubmit, currentUser, analitics }) {
    this.state = analitics;
  }

  useState(analitics) {
    this.state = analitics;

    user_name.value = analitics.user_name;
    app_id.value = analitics.app_id;
    action_id.value = analitics.action_id;

    fieldset.disabled = false;
    user_name.focus();
  }

  render() {
    return (
      <form onSubmit={onSubmit}>
        <fieldset id="fieldset">
          <p>Sign into log analitics, {currentUser.accountId}!</p>
          <p className="highlight">
            <label htmlFor="user_name">User name</label>
            <input
              autoComplete="off"
              autoFocus
              id="user_name"
              value="{ this.state.user_name }"
              required />
          </p>
          <p>
            <label htmlFor="app_id">App #</label>
            <input
              autoComplete="off"
              autoFocus
              id="app_id"
              value="{ this.state.app_id }"
              required />
          </p>
          <p>
            <label htmlFor="action_id">Action #</label>
            <input
              autoComplete="off"
              autoFocus
              id="action_id"
              value="{ this.state.action_id }"
              required />
          </p>
          <button type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};

export default Form;
