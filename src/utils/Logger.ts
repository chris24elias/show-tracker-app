import moment from 'moment';

export const LogState = (msg: string, ...args) => {
  if (!__DEV__) {
    return;
  }

  console.log(
    `%c [${moment().format('HH:MM:ss')}]%c[STATE]: ${msg.toUpperCase()}`,
    'color: grey;',
    'color: #1ABC9C;',
    ...args
  );
};

export const LogError = (msg: string, ...args) => {
  if (!__DEV__) {
    return;
  }

  console.log(
    `%c [${moment().format('HH:MM:ss')}]%c[ERROR]: ${msg.toUpperCase()}`,
    'color: grey;',
    'color: #FF0033;',
    ...args
  );
};
