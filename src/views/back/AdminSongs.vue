<template>
  <div class="white--text">
    <template>
      <v-card>
        <v-card-title>
          音樂管理
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="tracks" :search="search">
          <template v-slot:item.private="{ item }">
            <v-switch v-model="item.private" readonly @click="changeState(item)"></v-switch>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: '音樂名稱',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: '作者名稱', value: 'artist' },
        { text: '音樂類型', value: 'type' },
        { text: '隱私狀態', value: 'private' }
      ],
      tracks: [],
      id: '',
      private: false
    }
  },
  methods: {
    async getAllTracks () {
      try {
        const { data } = await this.api.get('/tracks/all', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.tracks = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    async changeState (item) {
      this.id = item._id
      let state = item.private
      state = !state
      try {
        await this.api.patch('/tracks/admin/' + this.id, { private: state }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
        this.getAllTracks()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async created () {
    this.getAllTracks()
  }
}
</script>
