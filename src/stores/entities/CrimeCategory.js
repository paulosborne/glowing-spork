import { types } from 'mobx-state-tree';

const CrimeCategory = types
  .model('CrimeCategory', {
    url: types.identifier,
    name: types.string,
    selected: types.optional(types.boolean, true),
  })
  .actions(self => ({
    toggle() {
      self.selected = !self.selected;
    },
  }));

export default CrimeCategory;
