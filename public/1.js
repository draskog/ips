(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IPSComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IPSComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/helpers */ "./resources/js/util/helpers.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
String.prototype.slugify = function () {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "-";
  return this.toString().normalize('NFD') // split an accented letter in the base letter and the acent
  .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
  .toLowerCase().trim().replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
  .replace(/\s+/g, separator);
};

var iban = __webpack_require__(/*! iban */ "./node_modules/iban/iban.js");

var qrcode = __webpack_require__(/*! qrcode */ "./node_modules/qrcode/lib/browser.js");

var ips = __webpack_require__(/*! ips-qr-code */ "./node_modules/ips-qr-code/lib/ips.js");

var banke = [];

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
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
      adresaRules: [function (value) {
        return !!value || 'Adresa primaoca je obavezana.';
      }, function (value) {
        return value.includes(', ') || 'Adresa primaoca mora da ima zarez i razmak između ulice i grada.';
      }],
      primaoc: '',
      primaocRules: [function (value) {
        return !!value || 'Naziv primaoca je obavezan.';
      }, function (value) {
        return value.includes(' ') || 'Naziv primaoca mora da ima razmak između imena i prezimena.';
      }],
      s: '',
      sRules: [function (value) {
        return !!value || 'Svrha plaćanja je obavezana.';
      }],
      racun1Rules: [function (value) {
        return !!value || 'Fiksni broj banke je obavezan.';
      }, function (value) {
        return banke.includes(value) || 'Fiksni broj banke je neispravan.';
      }],
      racun2Rules: [function (value) {
        return !!value || 'Broj računa je obavezan.';
      }, function (value) {
        return value.length === 13 || 'Broj računa je neispravan.';
      }],
      racun3Rules: [function (value) {
        return !!value || 'Kontrolni broj je obavezan.';
      }, function (value) {
        return value.length === 2 || 'Kontrolni broj je neispravan.';
      }],
      iznos: 1,
      iznosRules: [function (value) {
        return value >= 0 || 'Iznos je obavezan.';
      }],
      formValidity: false
    };
  },
  created: function created() {
    banke = this.banks;
  },
  computed: {
    foo: function foo() {
      return this.primaoc;
    },
    n: function n() {
      return this.primaoc + ', ' + this.adresa;
    },
    r: function r() {
      return this.racun1 + '' + this.racun2 + '' + this.racun3;
    },
    i: function i() {
      return 'RSD' + this.iznos + ',';
    },
    validRacun: function validRacun() {
      return iban.isValid('RS35' + this.r);
    },
    validForm: function validForm() {
      return this.formValidity && iban.isValid('RS35' + this.r);
    }
  },
  methods: {
    resetForm: function resetForm() {
      this.$refs.ipsCodeForm.reset();
      this.color = 'info';
      this.toast = true;
      this.message = 'Formular je obisan';
    },
    resetValidation: function resetValidation() {
      this.$refs.ipsCodeForm.resetValidation();
      this.color = 'info';
      this.toast = true;
      this.message = 'Validacija je poništena';
    },
    validateForm: function validateForm() {
      this.$refs.ipsCodeForm.validate();

      if (!this.formValidity) {
        this.color = 'error';
        this.toast = true;
        this.message = 'Proverite greške u formularu';
      } else {
        this.color = 'success';
        this.toast = true;
        this.message = 'Formular je validan';
      }
    },
    fillForm: function fillForm() {
      this.primaoc = 'Draško Gajić';
      this.adresa = 'Valjevska 10, Beograd';
      this.s = 'Fantasy';
      this.racun1 = 275;
      this.racun2 = '0000330087024';
      this.racun3 = '39';
      this.iznos = 1000;
    },
    copyMarkup: function copyMarkup() {
      var _this = this;

      this.$refs.kopiranje.focus();
      document.execCommand('selectAll', false, null);
      document.execCommand('copy');
      this.copied = true;
      this.toast = true;
      this.message = 'Sadržaj je kopiran';
      setTimeout(function () {
        _this.copied = false;
      }, 2000);
    },
    closeDialog: function closeDialog() {
      var _this2 = this;

      axios["delete"]('/' + this.slika).then(function (response) {
        _this2.slika = false;
        _this2.dialog = false;
      })["catch"](function (error) {
        console.error(error);
      });
    },
    handleRacun: function handleRacun() {
      var _this3 = this;

      if (this.racun2.length < 13) {
        this.racun2 = this.racun2.padStart(13, '0');
      }

      if (this.racun1.toString().length === 3 && this.racun2.length === 13 && this.racun3.length === 2 && this.racun2Rules.length === 2) {
        this.racun2Rules.push(function (value) {
          return _this3.validRacun || 'Broj računa je neispravan.';
        });
      }
    },
    posalji: function posalji(event) {
      var _this4 = this;

      var args = {
        c: this.c,
        v: this.v,
        k: this.k,
        r: this.r,
        i: this.i,
        n: this.n,
        sf: this.sf,
        s: this.s,
        'to-datauri': true
      };
      ips(args).then(function (dataString) {
        qrcode.toDataURL(dataString).then(function (data) {
          axios.post('/', {
            imageBase64: data
          }).then(function (response) {
            _this4.slika = response.data;
            _this4.dialog = true;
          })["catch"](function (error) {
            console.error(error);
          });
        })["catch"](function (error) {
          console.error(error);
        });
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IPSComponent.vue?vue&type=template&id=5722e4c8&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IPSComponent.vue?vue&type=template&id=5722e4c8& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            [
              _c("h1", [_vm._v("IPS QR kod generator")]),
              _vm._v(" "),
              _c(
                "v-form",
                {
                  ref: "ipsCodeForm",
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.posalji($event)
                    }
                  },
                  model: {
                    value: _vm.formValidity,
                    callback: function($$v) {
                      _vm.formValidity = $$v
                    },
                    expression: "formValidity"
                  }
                },
                [
                  _c("v-text-field", {
                    attrs: {
                      label: "Naziv primaoca",
                      type: "text",
                      rules: _vm.primaocRules,
                      required: ""
                    },
                    model: {
                      value: _vm.primaoc,
                      callback: function($$v) {
                        _vm.primaoc = $$v
                      },
                      expression: "primaoc"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      label: "Adresa primaoca",
                      type: "text",
                      rules: _vm.adresaRules,
                      required: ""
                    },
                    model: {
                      value: _vm.adresa,
                      callback: function($$v) {
                        _vm.adresa = $$v
                      },
                      expression: "adresa"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      label: "Svrha plaćanja",
                      type: "text",
                      placeholder: "Rođendan",
                      rules: _vm.sRules,
                      required: ""
                    },
                    model: {
                      value: _vm.s,
                      callback: function($$v) {
                        _vm.s = $$v
                      },
                      expression: "s"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "2" } },
                        [
                          _c("v-autocomplete", {
                            attrs: {
                              rules: _vm.racun1Rules,
                              counter: 3,
                              label: "Fiksni broj banke",
                              items: _vm.banks,
                              required: ""
                            },
                            on: { blur: _vm.handleRacun },
                            model: {
                              value: _vm.racun1,
                              callback: function($$v) {
                                _vm.racun1 = $$v
                              },
                              expression: "racun1"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "8" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              rules: _vm.racun2Rules,
                              counter: 13,
                              label: "Broj računa",
                              required: ""
                            },
                            on: { blur: _vm.handleRacun },
                            model: {
                              value: _vm.racun2,
                              callback: function($$v) {
                                _vm.racun2 = $$v
                              },
                              expression: "racun2"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "2" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              type: "number",
                              rules: _vm.racun3Rules,
                              counter: 2,
                              label: "Kontrolni broj",
                              required: ""
                            },
                            on: { blur: _vm.handleRacun },
                            model: {
                              value: _vm.racun3,
                              callback: function($$v) {
                                _vm.racun3 = $$v
                              },
                              expression: "racun3"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-text-field", {
                    attrs: {
                      type: "number",
                      rules: _vm.iznosRules,
                      label: "Iznos",
                      required: ""
                    },
                    model: {
                      value: _vm.iznos,
                      callback: function($$v) {
                        _vm.iznos = $$v
                      },
                      expression: "iznos"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: {
                        type: "submit",
                        color: "primary",
                        disabled: !_vm.validForm
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Kreiraj kod\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { color: "success" },
                      on: { click: _vm.validateForm }
                    },
                    [_vm._v("Validiraj podatke")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { color: "warning" },
                      on: { click: _vm.resetValidation }
                    },
                    [_vm._v("Poništi validaciju")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-4",
                      attrs: { color: "error" },
                      on: { click: _vm.resetForm }
                    },
                    [_vm._v("Obriši formular")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { justify: "center" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { "max-width": "400" },
              model: {
                value: _vm.dialog,
                callback: function($$v) {
                  _vm.dialog = $$v
                },
                expression: "dialog"
              }
            },
            [
              _vm.slika
                ? _c(
                    "v-card",
                    { staticClass: "mx-auto", attrs: { "max-width": "400" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "v-row",
                            { attrs: { justify: "space-between" } },
                            [
                              _c(
                                "div",
                                {
                                  ref: "kopiranje",
                                  staticStyle: {
                                    position: "absolute",
                                    top: "-400px",
                                    left: "-400px",
                                    "background-color": "white",
                                    color: "black"
                                  },
                                  attrs: { contenteditable: "true" }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.primaoc) +
                                      "\n                            "
                                  ),
                                  _c("br"),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.adresa) +
                                      "\n                            "
                                  ),
                                  _c("br"),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.racun1) +
                                      "-" +
                                      _vm._s(_vm.racun2) +
                                      "-" +
                                      _vm._s(_vm.racun3) +
                                      "\n                            "
                                  ),
                                  _c("br"),
                                  _c("br"),
                                  _vm._v(" "),
                                  _c("img", {
                                    attrs: { src: "codes/" + _vm.slika }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "auto" } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.primaoc) +
                                      "\n                            "
                                  ),
                                  _c("br"),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.adresa) +
                                      "\n                            "
                                  ),
                                  _c("br"),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.racun1) +
                                      "-" +
                                      _vm._s(_vm.racun2) +
                                      "-" +
                                      _vm._s(_vm.racun3) +
                                      "\n                            "
                                  ),
                                  _c("br"),
                                  _c("br"),
                                  _vm._v(" "),
                                  _c("v-img", {
                                    attrs: {
                                      height: "200",
                                      width: "200",
                                      src: "codes/" + _vm.slika
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                {
                                  staticClass: "text-center pl-0",
                                  attrs: { cols: "auto" }
                                },
                                [
                                  _c(
                                    "v-row",
                                    {
                                      staticClass:
                                        "flex-column ma-0 fill-height",
                                      attrs: { justify: "center" }
                                    },
                                    [
                                      _c(
                                        "v-col",
                                        { staticClass: "px-0" },
                                        [
                                          _c(
                                            "v-tooltip",
                                            {
                                              attrs: {
                                                right: "",
                                                "close-delay": "600"
                                              },
                                              scopedSlots: _vm._u(
                                                [
                                                  {
                                                    key: "activator",
                                                    fn: function(ref) {
                                                      var on = ref.on
                                                      var attrs = ref.attrs
                                                      return [
                                                        _c(
                                                          "v-btn",
                                                          _vm._g(
                                                            {
                                                              attrs: {
                                                                icon: ""
                                                              },
                                                              on: {
                                                                click:
                                                                  _vm.copyMarkup
                                                              }
                                                            },
                                                            on
                                                          ),
                                                          [
                                                            _c("v-icon", [
                                                              _vm._v(
                                                                "mdi-content-copy"
                                                              )
                                                            ])
                                                          ],
                                                          1
                                                        )
                                                      ]
                                                    }
                                                  }
                                                ],
                                                null,
                                                false,
                                                408312730
                                              )
                                            },
                                            [
                                              _vm._v(" "),
                                              _vm.copied
                                                ? _c("span", [
                                                    _vm._v("Sadržaj je kopiran")
                                                  ])
                                                : _c("span", [
                                                    _vm._v("Kopiraj")
                                                  ])
                                            ]
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card-actions",
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { color: "blue darken-1", text: "" },
                              on: { click: _vm.closeDialog }
                            },
                            [
                              _vm._v(
                                "\n                        Zatvori\n                    "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-snackbar",
        {
          attrs: {
            timeout: "2000",
            absolute: "",
            top: "",
            "multi-line": "",
            color: _vm.color
          },
          model: {
            value: _vm.toast,
            callback: function($$v) {
              _vm.toast = $$v
            },
            expression: "toast"
          }
        },
        [_vm._v("\n        " + _vm._s(_vm.message) + ".\n    ")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/IPSComponent.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/IPSComponent.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IPSComponent_vue_vue_type_template_id_5722e4c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IPSComponent.vue?vue&type=template&id=5722e4c8& */ "./resources/js/components/IPSComponent.vue?vue&type=template&id=5722e4c8&");
/* harmony import */ var _IPSComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IPSComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/IPSComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IPSComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IPSComponent_vue_vue_type_template_id_5722e4c8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IPSComponent_vue_vue_type_template_id_5722e4c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/IPSComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/IPSComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/IPSComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IPSComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IPSComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IPSComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IPSComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/IPSComponent.vue?vue&type=template&id=5722e4c8&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/IPSComponent.vue?vue&type=template&id=5722e4c8& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IPSComponent_vue_vue_type_template_id_5722e4c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./IPSComponent.vue?vue&type=template&id=5722e4c8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IPSComponent.vue?vue&type=template&id=5722e4c8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IPSComponent_vue_vue_type_template_id_5722e4c8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IPSComponent_vue_vue_type_template_id_5722e4c8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/util/helpers.js":
/*!**************************************!*\
  !*** ./resources/js/util/helpers.js ***!
  \**************************************/
/*! exports provided: getBranch, copyElementContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBranch", function() { return getBranch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyElementContent", function() { return copyElementContent; });
function getBranch() {
  var branch = window ? window.location.hostname.split('.')[0] : 'master';
  return ['master', 'dev', 'next'].includes(branch) ? branch : 'master';
}
function copyElementContent(el) {
  el.setAttribute('contenteditable', 'true');
  el.focus();
  document.execCommand('selectAll', false, null);
  document.execCommand('copy');
  el.removeAttribute('contenteditable');
}

/***/ })

}]);