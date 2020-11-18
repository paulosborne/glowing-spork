import { isStateTreeNode, getSnapshot } from 'mobx-state-tree';
import Coordinates from '../Coordinates';

describe('Coordinates', () => {
  let instance;

  beforeEach(() => {
    instance = Coordinates.create({});
  });

  it('should create an instance of Coordinates correctly', () => {
    expect(isStateTreeNode(instance)).toEqual(true);
    expect(getSnapshot(instance)).toMatchSnapshot();
  });

  describe('get isValid', () => {
    it('should return false by default', () => {
      expect(instance.isValid).toEqual(false);
    });

    it('should return true if the coordinates have been set', () => {
      instance.setLongitude(1);
      instance.setLatitude(52);
      expect(instance.isValid).toEqual(true);
    });
  });
});
