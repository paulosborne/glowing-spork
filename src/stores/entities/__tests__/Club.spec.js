import { isStateTreeNode, getSnapshot } from 'mobx-state-tree';
import Club from '../Club';
import MockClub from 'MockClubResponse';

describe('Club', () => {
  let instance;

  beforeEach(() => {
    instance = Club.create(MockClub);
  });

  it('should create an instance of a team correctly', () => {
    expect(isStateTreeNode(instance)).toEqual(true);
    expect(getSnapshot(instance)).toMatchSnapshot();
  });

  describe('get postcode', () => {
    it('should return the address correctly', () => {
      expect(instance.postcode).toEqual('SE25 6PU');
    });
  });
});
