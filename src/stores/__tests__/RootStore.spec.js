import { isStateTreeNode } from 'mobx-state-tree';
import RootStore from '../RootStore';

describe('RootStore', () => {
  it('should create an instance of rootstore correctly', () => {
    expect(isStateTreeNode(RootStore)).toEqual(true);
  });
});
