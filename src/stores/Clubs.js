import { flow, types } from 'mobx-state-tree';
import isEmpty from 'lodash.isempty';
import Club from './entities/Club';
import FootballData from '../services/FootballData';

const Clubs = types
  .model('Clubs', {
    data: types.optional(types.array(Club), []),
    selected: types.maybeNull(types.reference(Club)),
  })
  .views(self => ({
    get sortedByName() {
      return self.data
        .slice()
        .sort((a, b) => (a.name.charCodeAt(0) > b.name.charCodeAt(0) ? 1 : -1));
    },
  }))
  .actions(self => ({
    isValidClub(id) {
      return !isEmpty(self.data.filter(club => club.id === id));
    },
    /**
     * Fetches all teams for the given competition and season
     * @param {number} id
     * @param {season} number
     */
    fetchByCompetitionId: flow(function* (id, season) {
      const { data } = yield FootballData.get(`/competitions/${id}/teams`, {
        params: {
          season,
        },
      });

      // clear selected club if it doesn't exist in the new data
      if (
        self.selected !== null &&
        !data.teams.find(({ id }) => id === self.selected.id)
      ) {
        self.selected = null;
      }

      self.data.replace(data.teams);

      if (self.selected === null) {
        self.selectRandom();
      }
    }),

    /**
     * Sets the currently selected club
     * @param {number} id
     */
    selectClub(id) {
      if (self.isValidClub(id)) {
        self.selected = id;
      } else {
        self.selected = null;
      }
    },

    /**
     * Selects a random club
     */
    selectRandom() {
      const index = Math.floor(Math.random() * 6) + 1;
      const { id } = self.data[index];
      self.selectClub(id);
    },
  }));

export default Clubs;
