<template>
  <div id="rank" class="mt-100 mb-100 my-container">
    <v-sheet color="secondary pa-4" min-height="800" class="d-flex flex-column align-center">
      <v-sheet min-width="800">
        <Instant></Instant>
      </v-sheet>

    </v-sheet>
  </div>
</template>
<script>
import Instant from '../../components/Instant.vue'
export default {
  name: 'Rank',
  components: {
    Instant
  },
  data () {
    return {
    }
  }
}

</script>
