<template>

  <div class="confirm">
    <div class="confirm__inner">
      <div class="confirm__image position-relative">
        <img :src="activeMaster.image" :srcset="activeMaster.image2x != null ? `${activeMaster.image} 1x, ${activeMaster.image2x} 2x` : null" :alt="activeMaster.title">
        <div class="confirm__image__content position-absolute d-flex flex-column justify-content-end">
          <div class="confirm__master__name">{{ activeMaster.title }}</div>
          <div class="confirm__master__type">{{ activeMaster.type }}</div>
        </div>
      </div>
      <div class="confirm__details">
        <div class="confirm__title mb-4">Details</div>
        <div class="d-flex align-items-sm-center justify-content-between confirm__detail flex-sm-row flex-column mb-3">
          <div class="confirm__detail__label mb-1 mb-sm-0">Services</div>
          <div class="confirm__detail__value">{{ services }}</div>
        </div>
        <div class="d-flex align-items-sm-center justify-content-between confirm__detail flex-sm-row flex-column mb-3">
          <div class="confirm__detail__label mb-1 mb-sm-0">Est. price</div>
          <div class="confirm__detail__value" v-html="price" />
        </div>
        <div class="d-flex align-items-sm-center justify-content-between confirm__detail flex-sm-row flex-column mb-3">
          <div class="confirm__detail__label mb-1 mb-sm-0">Est. time</div>
          <div class="confirm__detail__value" v-html="time" />
        </div>
      </div>
      <div class="confirm__comments">
        <div class="confirm__title mb-4">Additional comments</div>
        <div class="confirm__form">
          <input type="text" class="confirm__input mb-2 required" placeholder="Your name*" v-model="form.name" name="name">
          <input type="email" class="confirm__input mb-2 required" placeholder="Your email*" v-model="form.email" name="email">
          <input type="tel" class="confirm__input mb-2 required" placeholder="Your phone*" v-model="form.phone" name="phone">
          <textarea class="confirm__textarea" placeholder="Your message here" v-model="form.message" name="message"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'

    export default {
        model: {
            prop: 'initForm',
            event: 'change'
        },
        props: {
            initForm: Object
        },
        name: "Confirm",
        data () {
            return {
                form: {
                    name: this.initForm.name,
                    email: this.initForm.email,
                    phone: this.initForm.phone,
                    message: this.initForm.message
                }
            }
        },
        computed: {
            ...mapState(['activeMaster', 'activeService']),
            services () {
                let services = ''
                this.activeService.forEach((el, index) => services += (index > 0 ? `, ${el.title}` : el.title))
                return services
            },
            price () {
                let overallPrice = 0;
                this.activeService.forEach((el) => {
                    if (el.price.indexOf('—') !== -1) {
                        overallPrice += (parseInt(el.price.substr(0, el.price.indexOf('—'))) + parseInt(el.price.substr(el.price.indexOf('—') + 1)))/2
                    }
                })
                return `<span>~</span>${overallPrice} lei`
            },
            time () {
                let overallTime = 0;
                this.activeService.forEach(el => overallTime += (+el.time))
                return `<span>~</span>${overallTime} min`
            }
        },
        methods: {
            ...mapActions(['changeForm'])
        },
        watch: {
            form: {
                handler (val) {
                    this.$emit('change', val)
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">

  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";
  .confirm {
    padding: 48px;
    background: #EEEEEE;
    border-radius: 24px;

    @media (max-width: 1300px) {
      padding: 25px;
    }

    @include media-breakpoint-down(md) {
      padding: 20px;
    }
    @include media-breakpoint-down(xs) {
      padding: 10px;
    }

    &__inner {
      display: grid;
      grid-template-columns: 240px auto 1fr;
      grid-column-gap: 80px;
      width: 100%;
      height: 100%;

      @media (max-width: 1500px) {
        grid-template-columns: 240px 200px 1fr;
        grid-column-gap: 30px;
      }

      @media (max-width: 1300px) {
        grid-template-columns: 180px 180px 1fr;
        grid-column-gap: 30px;
      }
      @media (max-width: 1150px) {
        grid-template-columns: 180px 1fr;
        grid-template-rows: auto auto;
        grid-row-gap: 30px;
      }

      @include media-breakpoint-down(md) {
        grid-template-columns: 240px 1fr;
        grid-column-gap: 30px;
        grid-row-gap: 20px;
        grid-template-rows: auto auto;
      }
      @include media-breakpoint-down(xs) {
        grid-template-columns: 120px 1fr;
        grid-column-gap: 15px;
        grid-row-gap: 20px;
        grid-template-rows: auto auto;
      }
    }

    &__image {
      width: 240px;
      height: 320px;
      overflow: hidden;
      background: #000;
      border-radius: 16px;

      @media (max-width: 1300px) {
        width: 180px;
        height: 260px;
      }

      @include media-breakpoint-down(xs) {
        width: 100%;
        height: auto;
        background: none;
        align-self: start;
      }

      img {
        width: 100%;
        height: 100%;
        opacity: 1;
        object-fit: cover;
        object-position: center;
        transition: opacity .3s linear;

        @include media-breakpoint-down(xs) {
          height: auto;
        }
      }

      &__content {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 40px 40px;

        @include  media-breakpoint-down(xs) {
          padding: 15px;
          height: auto;
          top: 0
        }
      }
    }

    &__master {
      &__name {
        font-weight: 600;
        font-size: 20px;
        line-height: 130%;
        letter-spacing: -0.02em;
        color: #FFFFFF;
      }
      &__type {
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: rgba(255,255,255,.8);
      }
    }
    &__details {
      /*margin-top: 100px;*/
    }
    &__title {
      font-weight: 600;
      font-size: 24px;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #010101;
    }

    &__comments {

      @media (max-width: 1150px) {
        width: 100%;
        max-width: 100%;
        grid-column: 1/3;
      }
    }

    &__textarea {
      background: #FFFFFF;
      border-radius: 8px;
      width: 100%;
      height: 180px;
      padding: 15px 20px;
      border: none;
      outline: none;
      box-shadow: none;
      resize: none;

      font-size: 16px;
      line-height: 150%;
      /* identical to box height, or 24px */

      display: flex;
      align-items: center;
      letter-spacing: -0.02em;

      color: #000000;

      &::placeholder {
        color: rgba(0,0,0,.3)
      }
    }


    &__input {
      background: #FFFFFF;
      border-radius: 4px;
      width: 100%;
      height: 36px;
      padding: 0 15px;
      border: none;
      outline: none;
      box-shadow: none;
      resize: none;

      font-size: 16px;
      line-height: 150%;
      /* identical to box height, or 24px */

      display: flex;
      align-items: center;
      letter-spacing: -0.02em;

      color: #000000;

      &::placeholder {
        color: rgba(0,0,0,.3)
      }
    }

    &__detail {
      width: 287px;
      max-width: 287px;

      @media (max-width: 1500px) {
        width: 100%;
        max-width: 200px;
      }

      @include media-breakpoint-down(xs) {
        width: 100%;
        max-width: 100%;
      }

      &__label {
        font-size: 18px;
        line-height: 150%;
        letter-spacing: -0.04em;
        color: rgba(0,0,0,.5);
      }

      &__value {
        font-weight: 600;
        font-size: 18px;
        line-height: 150%;
        letter-spacing: -0.04em;
        color: #000000;

        span {
          position: relative;
          top: 4px;
        }
      }
    }
  }
</style>