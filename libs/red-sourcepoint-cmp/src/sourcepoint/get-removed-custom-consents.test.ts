import { getRemovedCustomConsents } from './get-removed-custom-consents';

describe('getRemovedCustomConsents', () => {
  it('should return a list of removed vendors', () => {
    const vendors = [{ _id: '1' }, { _id: '2' }, { _id: '3' }];
    const compareTo = [{ _id: '1' }, { _id: '2' }, { _id: '4' }, { _id: '5' }];

    expect(getRemovedCustomConsents(vendors, compareTo)).toEqual([{ _id: '3' }]);
  });
});
