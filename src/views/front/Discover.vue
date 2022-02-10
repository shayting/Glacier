<template>
  <div id="discover" class="my-container mt-100 mb-100">
    <v-row>
      <v-col cols="4">
        <v-sheet class="secondary pa-4" rounded>
          <div class="text-h5 mb-2 white--text">類別</div>
          <!-- 類別chips -->
          <v-chip-group active-class="light-blue--text" column dark>
            <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
      <!-- list -->
      <v-col cols="8">
        <v-sheet color="secondary" min-height="800" class="pa-4" rounded>
          <ul class="white--text">
            <li class="d-flex align-center pa-2" style="height:80px;">
              <div class="text-h6">1</div>
              <img class="ms-2" src="https://source.boringavatars.com/marble/1/?square" />
              <div class="me-auto ms-6">
                <div class="text-h6">Lover boy</div>
                <div class="text-body-2">Phum virit</div>
              </div>
              <div class="d-flex align-center">
                <v-btn icon color="white">
                  <v-icon medium>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-cards-heart-outline</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </li>
            <li class="d-flex align-center pa-2" style="height:80px;">
              <div class="text-h6">2</div>
              <img class="ms-2" src="https://source.boringavatars.com/marble/1/?square" />
              <div class="me-auto ms-6">
                <div class="text-h6">Lover boy</div>
                <div class="text-body-2">Phum virit</div>
              </div>
              <div class="d-flex align-center">
                <v-btn icon color="white">
                  <v-icon medium>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-cards-heart-outline</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </li>
          </ul>
        </v-sheet>
        <div class="text-center my-4">
            <v-pagination v-model="page" :length="4" circle dark color="secondary"></v-pagination>
          </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    tags: [
      'Rock',
      'Hip hop/ Rap',
      'Electronic',
      'Pop',
      'Folk',
      'Alternative',
      'Post rock',
      'Metal',
      'Punk',
      'Reggae / Funk',
      'R&B / Soul',
      'Classic',
      'Blues',
      'Jazz'
    ]
  })
}
</script>
<style lang="scss" scoped>
li {
  img {
    height: 100%;
  }
  border-bottom: 1px solid white !important;
}
</style>
