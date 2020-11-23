import { getSnapshot, isStateTreeNode } from 'mobx-state-tree';
import Clubs from '../Clubs';
import axios from 'axios';
import MockCompetitionResponse from 'MockCompetitionResponse';

const { teams } = MockCompetitionResponse;
const SEASON = 2020;
const COMPETITION_ID = 2021;

describe('Store: Clubs', () => {
  let instance;

  beforeEach(() => {
    instance = Clubs.create();
  });

  it('should create the store correctly', () => {
    expect(isStateTreeNode(instance)).toEqual(true);
    expect(getSnapshot(instance)).toMatchSnapshot();
  });

  /**
   * fetchByCompetitionId()
   */
  describe('fetchByCompetitionId()', () => {
    it('should be defined', () => {
      expect(instance.fetchByCompetitionId).toBeDefined();
    });

    it('should call the football data API correctly', async () => {
      axios.get.mockResolvedValue({ data: { teams } });
      await instance.fetchByCompetitionId(COMPETITION_ID, SEASON);
      expect(axios.get).toHaveBeenCalledWith(
        `/competitions/${COMPETITION_ID}/teams`,
        {
          params: { season: SEASON },
        },
      );
      expect(instance.data.length).toEqual(teams.length);
    });

    it('should select another club if the previously selected club is no longer in the league', async () => {
      axios.get.mockResolvedValue({ data: { teams } });
      await instance.fetchByCompetitionId(COMPETITION_ID, SEASON);
      const selectedId = instance.selected.id;
      const omitSelected = teams.filter(
        ({ id }) => id !== instance.selected.id,
      );
      axios.get.mockResolvedValue({
        data: { teams: omitSelected },
      });
      await instance.fetchByCompetitionId(COMPETITION_ID, SEASON);
      expect(instance.selected.id).not.toEqual(selectedId);
    });
  });
});
