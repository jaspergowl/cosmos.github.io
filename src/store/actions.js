export const setFaqElementsVisible =
  ({ commit }, value) => commit('setFaqElementsVisible')
export const setFaqTocVisible =
  ({ commit }, value) => commit('setFaqElementsVisible')
export const setWhitepaperElementsVisible =
  ({ commit }, value) => commit('setWhitepaperElementsVisible')
export const setWhitepaperTocVisible =
  ({ commit }, value) => commit('setWhitepaperToc')
export const upvoteComment =
  ({ commit }, commentId) => commit('upvoteComment')
export const downvoteComment =
  ({ commit }, commentId) => commit('downvoteComment')
export const addComment =
  ({ commit }, comment) => commit('addComment')
export const setCommentFormVisible =
  ({ commit }, value) => commit('setCommentFormVisible')
