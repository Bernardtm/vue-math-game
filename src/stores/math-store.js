import { defineStore } from 'pinia'

export const useMathStore = defineStore('math', {
  state: () => ({
    score: 0,
    correct: 0,
    wrong: 0
  }),
  getters: {
    getScore: (state) => state.score,
    getCorrect: (state) => state.correct,
    getWrong: (state) => state.wrong
  },
  actions: {
    incrementCorrect () {
      this.correct++
    },
    incrementWrong () {
      this.wrong++
    },
    addScore (value) {
      this.score += value
    }
  }
})
