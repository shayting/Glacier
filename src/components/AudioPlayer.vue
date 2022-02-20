<template>
  <kinesis-container :audio="audio">
              <kinesis-audio
                :audioIndex="10">
                  <kinesis-element
                    :strength="10"
                    type="depth">
                  <img src="https://res.cloudinary.com/dbn5orfpi/image/upload/v1644825817/nltegkl6wiivemxcq4on.jpg" alt="">
                </kinesis-element>
                </kinesis-audio>
          </kinesis-container>
</template>

<script>
export default {
  data () {
    return {
      audio: 'https://res.cloudinary.com/dbn5orfpi/video/upload/v1644824574/izrepwfv3jdzpjurpr7d.mp3'
    }
  }
}

</script>
