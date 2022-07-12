import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    posts: [],
    selectedPost: {}
  },
  getters: {
  },
  mutations: {
    ADD_POST(state, value) {
      let check = state.posts.some((c) => c.id == value.id)
      let index = state.posts.findIndex((c) => c.id == value.id)
      if (check) {
        state.posts.splice(index, 1, value)
        console.log("hello");
      } else {
        let max = 0;
        let newId = 0;
        for (let i = 0; i < state.posts.length; i++) {
          if (state.posts[i].id > max) {
            max = state.posts[i].id
          }
        }
        newId = max + 1;
        value.id = newId
        state.posts.push(value)
      }

    },
    DELETE_POST(state, value) {
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id == value) {
          state.posts.splice(i, 1)
        }
      }
    },
    EDIT_POST(state, value) {
      state.selectedPost = value
    },
    SET_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const data = await axios.get('https://jsonplaceholder.typicode.com/posts')
        commit('SET_POSTS', data.data)
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
  modules: {
  }
})
