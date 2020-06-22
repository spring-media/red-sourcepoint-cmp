import { Selector } from 'testcafe';

export const toIterator = async (selector: Selector): Promise<Iterable<Selector>> => {
  const sel = Selector(selector);
  const count = await sel.count;

  return {
    [Symbol.iterator]() {
      let index = 0;

      return {
        next() {
          return {
            value: sel.nth(++index),
            done: index === count,
          };
        },
      };
    },
  };
};
