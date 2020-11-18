import { isStateTreeNode, getSnapshot } from 'mobx-state-tree';
import Crimes from '../Crimes';
import axios from 'axios';
import MockCrimeCategoryResponse from 'MockCrimeCategoryResponse';
import MockCrimeResponse from 'MockCrimeResponse';
import MockPostCodeResponse from 'MockPostCodeResponse';

describe('Store: Crimes', () => {
  let instance;

  beforeEach(() => {
    instance = Crimes.create();
    jest.resetAllMocks();
  });

  it('should create the store correctly', () => {
    expect(isStateTreeNode(instance)).toEqual(true);
    expect(getSnapshot(instance)).toMatchSnapshot();
  });

  /**
   * getCrimeCategories()
   */
  describe('getCrimeCategories()', () => {
    it('should be defined', () => {
      expect(instance.getCrimeCategories).toBeDefined();
    });

    it('should fetch crime categories correctly', async () => {
      const month = 10;
      const year = 2020;
      axios.get.mockResolvedValue({ data: MockCrimeCategoryResponse });
      await instance.getCrimeCategories(year, month);
      expect(axios.get).toHaveBeenCalledWith(
        `/crime-categories?date=${year}-${month}`,
      );
      expect(instance.categories.size).toEqual(
        MockCrimeCategoryResponse.length,
      );
    });
  });

  /**
   * getCoordinates()
   */
  describe('getCoordinates()', () => {
    it('should be defined', () => {
      expect(instance.getCoordinates).toBeDefined();
    });

    it('should lookup the coordinates from the postcode correctly', async () => {
      const { postcode } = MockPostCodeResponse.result;
      axios.get.mockResolvedValue({ data: MockPostCodeResponse });
      instance.setCrimeLocation(postcode);
      await instance.getCoordinates();
      expect(axios.get).toHaveBeenCalledWith(`/postcodes/${postcode}`);
    });
  });

  /**
   * getCrimesAtLocation()
   */
  describe('getCrimesAtLocation()', () => {
    it('should be defined', () => {
      expect(instance.getCrimesAtLocation).toBeDefined();
    });

    it('should call the crimes-by-location API correctly', async () => {
      const year = 2020;
      const month = 10;
      const longitude = -1;
      const latitude = 53;

      axios.get.mockResolvedValue({ data: MockCrimeResponse });
      instance.setCoordinates({ longitude, latitude });
      await instance.getCrimesAtLocation(year, month);
      expect(axios.get).toHaveBeenCalledWith('/crimes-at-location', {
        params: {
          date: `${year}-${month}`,
          lng: longitude,
          lat: latitude,
        },
      });
      expect(getSnapshot(instance.data)).toMatchSnapshot();
    });
  });
});
