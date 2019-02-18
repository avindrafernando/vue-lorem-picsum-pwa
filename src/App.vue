<template>
  <v-app>
    <NavBar/>
    <Snackbar/>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Snackbar from './components/Snackbar'

export default {
  name: 'App',
  components: {
    NavBar,
    Snackbar
  }
}
</script>
