const message = require('../message');

jest.mock('shelljs', () => ({
  exit: () => {}
}));

describe('message return', () => {
  test('success', () => {
    console.log = jest.fn();
    message('success', 'mock message');
    expect(console.log).toMatchSnapshot();
  });

  test('exit', () => {
    console.log = jest.fn();
    message('exit', 'mock message');
    expect(console.log).toMatchSnapshot();
  });

  test('failure', () => {
    console.log = jest.fn();
    message('failure', 'mock message');
    expect(console.log).toMatchSnapshot();
  });

  test('warning', () => {
    console.log = jest.fn();
    message('warning', 'mock message');
    expect(console.log).toMatchSnapshot();
  });

  test('complete', () => {
    console.log = jest.fn();
    message('complete', 'mock message');
    expect(console.log).toMatchSnapshot();
  });
});

export {};
