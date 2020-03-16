import { executeMethod } from './tcf';
import { getTCData } from './get-tc-data';

jest.mock('./tcf');

describe('getTCData', () => {
  it('should call the expected method that comes from the CMP API', () => {
    getTCData();

    expect(executeMethod).toHaveBeenCalledWith('getTCData');
  });
});
