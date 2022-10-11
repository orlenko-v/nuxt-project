export const state = () => ({
  items: [],
});

export const getters = {
  getItems (state) {
    return state.items;
  },
};

export const mutations = {
  addItems (state, items) {
    state.items = items;
  },

  addItem (state, item) {
    state.items = [...state.items, item];
  },

  removeItem (state, itemId) {
    state.items = state.items.filter(({ id }) => (id !== itemId));
  },
};

export const actions = {
  addItems (context, items) {
    context.commit('addItems', items)
  },

  addItem (context, item) {
    context.commit('addItem', item);
  },

  removeItem (context, itemId) {
    context.commit('removeItem', itemId);
  },
};
