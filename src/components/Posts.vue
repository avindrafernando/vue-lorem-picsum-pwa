<template>
  <div>
    <v-layout align-center row wrap>
      <v-flex lg3 v-for="post in shuffle(posts)" :key="post.id">
        <v-card>
          <v-img
            v-bind:src="getSrc(post.id)"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ post.author }}</h3>
              <div>{{ getAuthorUserName(post.author_url) }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="deep-purple" :href="post.author_url" target="_blank">See My Work</v-btn>
            <v-btn flat color="deep-purple" :href="post.post_url" target="_blank">Image Source</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import postsApi from '../services/PostsApi.js'
  export default {
    name: 'Posts',
    methods: {
      shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      },
      getSrc(id) {
        const imagePostWidth = 250;
        const imagePostHeight = 375;
        return 'https://picsum.photos/' + imagePostWidth + '/' + imagePostHeight + '?image=' + id;
      },
      getAuthorUserName(str) {
        return str.substring(str.lastIndexOf('@'))
      }
    },
    data() {
      return {
        loading: true,
        posts: []
      }
    },
    created() {
      postsApi.getPosts()
        .then(posts => {
          this.posts = posts.slice(0, 100)
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.loading = false
        })
    }
  }

</script>

<style scoped>
  .v-card {
    margin: 20px;
  }
</style>
