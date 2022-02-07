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
    <v-data-table
      :headers="headers"
      :items="tracks"
      :search="search"
    ></v-data-table>
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
          text: '帳號',
          align: 'start',
          sortable: false,
          value: 'account'
        },
        { text: '使用者名稱', value: 'name' },
        { text: '電子信箱', value: 'email' },
        { text: '編輯', value: 'edit' }
      ],
      users: [
        {
          account: 'decajoins',
          name: 'Deca joins',
          email: 'deca@gmail.com',
          edit: 24
        },
        {
          account: 'user01',
          name: 'user01',
          email: '1@gmail.com',
          edit: 24
        },
        {
          account: 'user02',
          name: 'user02',
          email: '2@gmail.com',
          edit: 24
        },
        {
          account: 'user03',
          name: 'user03',
          email: '3@gmail.com',
          edit: 24
        },
        {
          account: 'user04',
          name: 'user04',
          email: '4@gmail.com',
          edit: 24
        }
      ]
    }
  }
}
</script>
