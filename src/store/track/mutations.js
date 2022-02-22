export const play = (state, data) => {
  state.title = data.title
  state.artist = data.artist
  state.src = data.file
  state.pic = data.cover
  state._id = data._id
  state.num++
}
