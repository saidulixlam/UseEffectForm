import React, { useReducer, useState, useContext } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../auth-context';
import Input from '../Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  };
};
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false
  };
};
const collegeReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 3
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 3
    }
  }
  return {
    value: '',
    isValid: false
  };
};


//const {isValid :emailIsValid}=emailState;

const Login = (props) => {

  const actx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  },);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  },);

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: '',
    isValid: false
  },);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && collegeState.isValid
    );
  };

  const collegeNameChangeHandler = (event) => {
    dispatchCollege({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value.trim().length > 3
    );
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const validatecollegeNameHandler = () => {
    dispatchCollege({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    actx.onlogIn(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id='email'
          label='E-mail'
          type='E-mail'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input

          type="password"
          id="password"
          label="Passwrod"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div
          className={`${classes.control} ${collegeState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegename">College Name</label>
          <input
            type="collegename"
            id="collegename"
            value={collegeState.value}
            onChange={collegeNameChangeHandler}
            onBlur={validatecollegeNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
