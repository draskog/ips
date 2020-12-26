<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>IPS QR kod generator</h1>
        <v-form ref="ipsCodeForm" v-model="formValidity" @submit.prevent="posalji">
          <v-text-field
              label="Naziv primaoca"
              type="text"
              v-model="primaoc"
              :rules="primaocRules"
              required
          ></v-text-field>
          <v-text-field
              label="Adresa primaoca"
              type="text"
              v-model="adresa"
              :rules="adresaRules"
              required
          ></v-text-field>
          <v-text-field
              label="Svrha plaćanja"
              type="text"
              placeholder="Rođendan"
              v-model="s"
              :rules="sRules"
              required
          ></v-text-field>
          <v-row>
            <v-col
                cols="12"
                md="2"
            >
              <v-autocomplete
                  @blur="handleRacun"
                  v-model="racun1"
                  :rules="racun1Rules"
                  :counter="3"
                  label="Fiksni broj banke"
                  :items="banks"
                  required
              ></v-autocomplete>
            </v-col>

            <v-col
                cols="12"
                md="8"
            >
              <v-text-field
                  @blur="handleRacun"
                  v-model="racun2"
                  :rules="racun2Rules"
                  :counter="13"
                  label="Broj računa"
                  required
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="2"
            >
              <v-text-field
                  @blur="handleRacun"
                  type="number"
                  v-model="racun3"
                  :rules="racun3Rules"
                  :counter="2"
                  label="Kontrolni broj"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
              type="number"
              v-model="iznos"
              :rules="iznosRules"
              label="Iznos"
              required
          ></v-text-field>
          <v-btn
              type="submit"
              color="primary"
              class="mr-4"
              :disabled="!validForm">
            Kreiraj kod
          </v-btn>
          <v-btn color="success" class="mr-4" @click="validateForm">Validiraj podatke</v-btn>
          <v-btn color="warning" class="mr-4" @click="resetValidation">Poništi validaciju</v-btn>
          <v-btn color="error" class="mr-4" @click="resetForm">Obriši formular</v-btn>
          <!--<v-btn color="error" @click="fillForm">Popuni formular</v-btn>-->
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="400"
      >
        <v-card
            class="mx-auto"
            max-width="400"
            v-if="slika"
        >
          <v-container>
            <v-row justify="space-between">
              <div ref="kopiranje" contenteditable="true"
                   style="position:absolute; top:-400px; left:-400px; background-color: white; color: black;">
                {{ primaoc }}
                <br>
                {{ adresa }}
                <br>
                {{ racun1 }}-{{ racun2 }}-{{ racun3 }}
                <br><br>
                <img :src="'codes/'+slika">
              </div>
              <v-col cols="auto">
                {{ primaoc }}
                <br>
                {{ adresa }}
                <br>
                {{ racun1 }}-{{ racun2 }}-{{ racun3 }}
                <br><br>
                <v-img
                    height="200"
                    width="200"
                    :src="'codes/'+slika"
                ></v-img>
              </v-col>

              <v-col
                  cols="auto"
                  class="text-center pl-0"
              >
                <v-row
                    class="flex-column ma-0 fill-height"
                    justify="center"
                >
                  <v-col class="px-0">
                    <v-tooltip right close-delay="600">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-on="on"
                               @click="copyMarkup">
                          <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                      </template>
                      <span v-if="copied">Sadržaj je kopiran</span>
                      <span v-else>Kopiraj</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="closeDialog"
            >
              Zatvori
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar
        timeout="2000"
        absolute
        top
        v-model="toast"
        multi-line
        :color="color"
    >
      {{ message }}.
    </v-snackbar>
  </v-container>
</template>

<script>
const iban = require('iban')
const qrcode = require('qrcode')
let banke = []
import * as moment from 'moment'

export default {
  data: () => ({
    copied: false,
    dialog: false,
    slika: false,
    message: '',
    color: 'success',
    toast: false,
    banks: [105, 115, 125, 145, 150, 155, 160, 165, 170, 180, 190, 200, 205, 220, 250, 265, 275, 285, 295, 310, 325, 330, 340, 355, 360, 370, 375, 380, 385],
    k: 'PR',
    c: '1',
    sf: '289',
    v: '01',
    racun1: '',
    racun2: '',
    racun3: '',
    adresa: '',
    adresaRules: [
      value => !!value || 'Adresa primaoca je obavezana.',
      value => value.includes(', ') || 'Adresa primaoca mora da ima zarez i razmak između ulice i grada.',
    ],
    primaoc: '',
    primaocRules: [
      value => !!value || 'Naziv primaoca je obavezan.',
      value => value.includes(' ') || 'Naziv primaoca mora da ima razmak između imena i prezimena.',
    ],
    s: '',
    sRules: [
      value => !!value || 'Svrha plaćanja je obavezana.'
    ],
    racun1Rules: [
      value => !!value || 'Fiksni broj banke je obavezan.',
      value => banke.includes(value) || 'Fiksni broj banke je neispravan.'
    ],
    racun2Rules: [
      value => !!value || 'Broj računa je obavezan.',
      value => value.length === 13 || 'Broj računa je neispravan.'
    ],
    racun3Rules: [
      value => !!value || 'Kontrolni broj je obavezan.',
      value => value.length === 2 || 'Kontrolni broj je neispravan.'
    ],
    iznos: 1,
    iznosRules: [
      value => value >= 0 || 'Iznos je obavezan.'
    ],
    formValidity: false
  }),
  created ()
  {
    banke = this.banks
  },
  computed: {
    foo ()
    {
      return this.primaoc
    },
    n ()
    {
      return this.primaoc + ', ' + this.adresa
    },
    r ()
    {
      return this.racun1 + '' + this.racun2 + '' + this.racun3
    },
    i ()
    {
      return 'RSD' + this.iznos + ','
    },
    validRacun ()
    {
      return iban.isValid('RS35' + this.r)
    },
    validForm ()
    {
      return this.formValidity && iban.isValid('RS35' + this.r)
    }
  },
  methods: {
    resetForm ()
    {
      this.$refs.ipsCodeForm.reset()
      this.color = 'info'
      this.toast = true
      this.message = 'Formular je obisan'
    },
    resetValidation ()
    {
      this.$refs.ipsCodeForm.resetValidation()
      this.color = 'info'
      this.toast = true
      this.message = 'Validacija je poništena'
    },
    validateForm ()
    {
      this.$refs.ipsCodeForm.validate()
      if (!this.formValidity)
      {
        this.color = 'error'
        this.toast = true
        this.message = 'Proverite greške u formularu'
      } else
      {
        this.color = 'success'
        this.toast = true
        this.message = 'Formular je validan'
      }
    },
    fillForm ()
    {
      this.primaoc = 'Draško Gajić'
      this.adresa = 'Valjevska 10, Beograd'
      this.s = 'Fantasy'
      this.racun1 = 275
      this.racun2 = '0000330087024'
      this.racun3 = '39'
      this.iznos = 1000
    },
    copyMarkup ()
    {
      this.$refs.kopiranje.focus()
      document.execCommand('selectAll', false, null)
      document.execCommand('copy')
      this.copied = true
      this.toast = true
      this.message = 'Sadržaj je kopiran'
      setTimeout(() => {
        this.copied = false
      }, 2000)
    },
    closeDialog ()
    {
      axios.delete('/' + this.slika)
          .then(response => {
            this.slika = false
            this.dialog = false
          }).catch(error => {
        console.error(error)
      })

    },
    handleRacun ()
    {
      if (this.racun2.length < 13)
      {
        this.racun2 = this.racun2.padStart(13, '0')
      }
      if (this.racun1.toString().length === 3 && this.racun2.length === 13 && this.racun3.length === 2 && this.racun2Rules.length === 2)
      {
        this.racun2Rules.push(value => this.validRacun || 'Broj računa je neispravan.')
      }
    },
    posalji: function (event) {
      var args = {
        c: this.c,
        v: this.v,
        k: this.k,
        r: this.r,
        i: this.i,
        n: this.n,
        sf: this.sf,
        s: this.s,
        rl: moment().format('MM-YYYY')
      }
      args = obsKeysToString(args, '|')
      qrcode.toDataURL(args)
          .then(data => {
            axios.post('/', {
              imageBase64: data
            }).then(response => {
              this.slika = response.data
              this.dialog = true
            }).catch(error => {
              console.error(error)
            })
          }).catch(error => {
        console.error(error)
      })
    }
  }
}

function uuidv4 ()
{
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

const capitalizeKeys = (obj) => {
  const isObject = o => Object.prototype.toString.apply(o) === '[object Object]'
  const isArray = o => Object.prototype.toString.apply(o) === '[object Array]'

  let transformedObj = isArray(obj) ? [] : {}

  for (let key in obj)
  {
    // replace the following with any transform function
    const transformedKey = key.toUpperCase()

    if (isObject(obj[key]) || isArray(obj[key]))
    {
      transformedObj[transformedKey] = capitalizeKeys(obj[key])
    } else
    {
      transformedObj[transformedKey] = obj[key]
    }

  }
  return transformedObj
}

function obsKeysToString (o, sep)
{
  return ['k', 'v', 'c', 'r', 'i', 'n', 'rl', 'sf', 's']
      .map(opt =>
          o[opt] ? `${opt.toUpperCase()}:${o[opt]}` : undefined
      )
      .filter(i => i)
      .join(sep)
}
</script>