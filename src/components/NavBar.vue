<template>
  <div>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/lego/2.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>PWA Ninja</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.path == '#' ? '' : item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" color="deep-purple">
      <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">I am NOT a PWA</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>      
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>


<script>
  export default {
    name: 'NavBar',
    data () {
      return {
        drawer: false,
        clipped: false,
        items: [
          { title: 'Home', 
            icon: 'home',
            path: '/'
          },
          { title: 'Posts', 
            icon: 'question_answer',
            path: '/posts' 
          }
        ]
      }
    }
  }
</script>

<style>
</style>
