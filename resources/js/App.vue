<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-icon>mdi-qrcode</v-icon>
        IPS QR kod
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          v-for="link in links"
          :key="`${link.label}-header-link`"
          text
          rounded
          :to="link.url"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer dark padless>
      <v-layout justify-center wrap>
        <v-card
            class="mx-auto"
            max-width="160px"
        >
          <v-img
              src="/images/donate.png"
              height="145px"
          ></v-img>

          <v-card-title>
            Doniraj
          </v-card-title>
          <v-card-subtitle>
            doniraj 100 dinara za razvoj pametnih rešenja
          </v-card-subtitle>
        </v-card>
        <v-card flat tile class="layout justify-center wrap indigo lighten-1 white--text text-center">
          <v-card-text>
            <v-btn
                v-for="link in links"
                :key="`${link.label}-footer-link`"
                color="white"
                text
                rounded
                class="my-2"
                :to="link.url"
            >
              {{ link.label }}
            </v-btn>
          </v-card-text>
          <v-card-text class="white--text pt-0">
            Jednostavna aplikacija za generisanje IPS QR kodova za plaćanje računa.<br>
          </v-card-text>
          <v-divider></v-divider>

          <v-divider></v-divider>
          <v-card-text class="white--text">
            Copyright {{ new Date().getFullYear() }} — Draško Gajić — IPS QR kod — MIT License - Verzija 1.1.1
          </v-card-text>
        </v-card>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data ()
  {
    return {
      links: [
        {
          label: 'Početna',
          url: '/'
        }
      ]
    }
  },
  created ()
  {
    this.$vuetify.theme.dark = true
  },
}
</script>
