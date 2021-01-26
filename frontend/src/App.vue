<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>URL Shorten Service.</h1>
    <div>
      <v-container>
        <v-form ref="form" @submit.prevent="submit">
          <v-row>
            <v-col md="2"></v-col>
            <v-col md="6">
              <v-text-field label="Long URL" :rules="rules" hide-details="auto" v-model="longUrl"> </v-text-field>
            </v-col>
            <v-col md="4" style="display: flex; align-items: center; text-align: left">
              <v-btn class="mr-4" @click="submit" :disabled="!longUrl"> Shorten </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col>
            <a v-if="!!shortenUrl" :href="`/${shortenUrl}`">
              {{ `http://localhost:3000/${shortenUrl}` }}
            </a>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

const urlReqPattern = new RegExp(
  '^(https?:\\/\\/)' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i'
); // fragment locator

@Component
export default class App extends Vue {
  rules = [
    (value: string) => !!value || 'Required.',
    (value: string) => (value && !!urlReqPattern.test(value)) || 'Valid URL should start with http:// or https://',
  ];

  longUrl = '';

  shortenUrl = '';

  submit() {
    const param = {
      url: this.longUrl,
    };

    axios
      .post('/shorten', param)
      .then((res) => res.data)
      .then((res) => {
        this.shortenUrl = res.short_url;
      });
  }
}
</script>

<style scroped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.v-label {
  left: 0 !important;
  right: auto !important;
}
</style>
