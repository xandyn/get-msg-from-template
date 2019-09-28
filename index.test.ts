import { getMessageFromTemplate, IIfThenElse } from './index';

describe('Function `getMessageFromTemplate`', () => {
  const template: IIfThenElse = {
    if: '(mark >= 4)',
    then: 'Good work!',
    else: {
      if: '(lesson === "english")',
      then: 'Learn grammar',
      else: 'You needed more training',
    },
  };

  it('Returns `You needed more training`', () => {
    expect(getMessageFromTemplate({ mark: 3, lesson: 'any' }, template)).toBe('You needed more training');
  });

  it('Returns `Learn grammar`', () => {
    expect(getMessageFromTemplate({ mark: 3, lesson: 'english' }, template)).toBe('Learn grammar');
  });

  it('Returns `Good work!`', () => {
    expect(getMessageFromTemplate({ mark: 4, lesson: 'english' }, template)).toBe('Good work!');
  });
});
