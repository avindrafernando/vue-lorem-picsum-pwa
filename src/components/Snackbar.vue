<template>
    <v-snackbar
      v-model="notification"
      bottom
      :color="type"
      :timeout="timeout"
    >
      {{ notificationText }}
      <v-btn
        v-if="hasButton"
        flat
        :color="buttonColor"
        @click="onClick"
      >
        {{ buttonText }}
      </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    name: 'Snackbar',
    data() {
      return {
        buttonColor: "",
        buttonText: "",
        onClick: () => {},
        hasButton: true,
        notificationText: "",
        notification: false,
        timeout: 4000,
        type: null
      }
    },
    mounted() {
      document.addEventListener('ShowSnackbar', this.addNotification);
    },
    beforeDestroy () {
      document.removeEventListener('ShowSnackbar', this.addNotification);
    },
    methods: {
      /**
       * Snackbar options
       * @param options.notificationText - Snackbar text
       * @param options.buttonText - Button text
       * @param options.closeable  - Whether snackbar is closeable
       * @param options.onClick    - Button handler
       * @param options.timeout    - Snackbar timeout
       * @param options.type       - Snackbar type
       */
      addNotification(options = {}) {
        // Support custom events
        options = options.detail.options || options
        
        // Hide previous notification
        this.notification = false;
        
        // Display new notification (but give time for previous to disappear)
        setTimeout(() => {
          this.notificationText = options.notificationText ? options.notificationText : "";
          this.notification = true;
          
          // Customization
          this.buttonColor = options.type ? "white" : "yellow darken-1";
          this.buttonText = options.buttonText ? options.buttonText : "";
          this.hasButton = options.buttonText && options.onClick;
          this.onClick = options.onClick ? options.onClick : null;
          this.timeout = options.timeout ? options.timeout : 4000;
          this.type = options.type ? options.type : null;
          
          // Closeable snackbars override other properties
          if (options.closeable) {
            this.buttonText = "Close";
            this.hasButton = true;
            this.onClick = this.closeNotification;
          }
        }, 100)
      },
      /**
       * Close the snackbar and execute callback
       */
      clickHandler(callback) {
        this.closeNotification();
        callback();
      },
      /**
       * Close the snackbar
       */
      closeNotification() {
        this.notification = false;
      }
    }
  }
</script>

<style scoped>
</style>
