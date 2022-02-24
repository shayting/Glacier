// actions 執行非同步的function
import { api } from '@/plugins/axios.js'

export const getLastSong = async ({ commit, state }) => {
  try {
    const { data } = await api.get('/tracks/' + state._id)
    const info = {
      title: data.result.title,
      artist: data.result.artist.userName,
      file: data.result.file,
      cover: data.result.cover,
      _id: data.result._id
    }
    commit('play', info)
  } catch (error) {
    console.log(error)
  }
}
