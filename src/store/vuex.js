import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      currentUser: {
        id: ''||"3",
        name: "user name",
        profileImage: ''
      }
    }
  },
  mutations: {
    // Mutation to set the current user data
    setUser(state, user) {
      state.currentUser.id = user.id;
      state.currentUser.name = user.name;
      state.currentUser.profileImage = user.profileImage;
    },
    // Mutation to update only profile image
    updateProfileImage(state, imagePath) {
      state.currentUser.profileImage = imagePath;
    }
  },
  actions: {
    // Action to update user information
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    // Action to update the user's profile image
    updateProfileImage({ commit }, imagePath) {
      commit('updateProfileImage', imagePath);
    }
  },
  getters: {
    // Getter to return current user information
    currentUser: (state) => state.currentUser
  }
});

export default store;
