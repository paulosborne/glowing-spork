import { types } from 'mobx-state-tree';
import Clubs from './Clubs';
import Crimes from './Crimes';
import sub from 'date-fns/sub';

const RootStore = types
  .model('RootStore', {
    clubs: types.optional(Clubs, {}),
    crimes: types.optional(Crimes, {}),
    date: types.optional(types.Date, new Date()),
  })
  .actions(self => ({
    setDate(date) {
      self.date = date;
    },
  }))
  .create({
    date: sub(new Date(), {
      months: 1,
    }),
  });

export default RootStore;
