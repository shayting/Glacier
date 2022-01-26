<template>
  <v-carousel
    id="home-carousel"
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style lang="scss">
  #home-carousel{
  margin-top: 64px;
  .v-carousel__controls{
    .v-btn--icon{
      background-color:transparent!important;
      width: 20px !important;
      height: 20px !important;
    }
    .mdi:before{
      font-size: 10px!important;
    }
  }
  }

</style>

<script>

export default {
  name: 'Home',
  data () {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ]
    }
  }
}
</script>
