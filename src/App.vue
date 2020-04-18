<template>
  <div id="app">
    <div class="wrapper d-flex d-lg-block flex-column">
      <div class="inner d-flex flex-column flex-lg-row align-items-stretch  flex-fill">
        <div class="aside d-flex justify-content-start align-items-center justify-content-lg-between align-items-lg-start mb-4 mb-lg-0 flex-column">
          <div class="logotype">
            <img src="./assets/images/logo.png" alt="Logotype">
          </div>
          <Navigation :steps="steps" />
          <footer class="d-none w-100 d-lg-flex align-items-sm-center justify-content-sm-between flex-sm-row flex-column align-items-end justify-content-between">
            <a href="javascript:void(0)" class="link ml-2 ml-sm-3 ml-lg-0">Terms & Conditions</a>
            <a href="javascript:void(0)" class="link ml-2 ml-sm-3 ml-lg-0">About</a>
            <a href="javascript:void(0)" class="link ml-2 ml-sm-3 ml-lg-0">Contact</a>
          </footer>
        </div>
        <div class="content d-flex flex-column align-content-stretch justify-content-between" :class="{'content_confirm': activeStep === 3, 'content_sended': activeStep === 4}">
          <header class="header d-flex align-items-xl-center justify-content-xl-between flex-xl-row flex-column position-relative">
            <h1 class="title d-none d-lg-block">{{ title }}</h1>
            <Search :placeholder="searchPlaceholder" v-if="activeStep < 3" :hints="searchHints" @choose-item="chooseItem"/>
          </header>
          <div class="current-step flex-fill py-4">
            <div v-if="activeStep === 0" class="first-step d-lg-flex flex-wrap">
              <Category v-for="cat in categories" :key="cat.id" :category="cat" />
            </div>
            <div v-else-if="activeStep === 1" class="second-step ">
              <Service v-for="service in activeCategory.services" :key="service.id" :service="service"/>
            </div>
            <div v-else-if="activeStep === 2" class="third-step d-lg-flex flex-wrap">
              <Master v-for="master in activeCategory.masters" :key="master.id" :master="master" class="mr-2 mb-2"/>
            </div>
            <Confirm v-else-if="activeStep === 3" v-model="form" />
          </div>
          <div class="footer d-flex align-items-center justify-content-between" :class="{'footer_last': activeStep === 3}" v-if="activeStep !== 4">
            <button class="footer__button footer__button_back d-flex flex-row-reverse align-items-center justify-content-center" :class="{'footer__button_hidden': activeStep === 0}"  type="button" @click.prevent="changeStep(activeStep-1)">Back</button>
            <button class="footer__button d-flex align-items-center justify-content-center" type="button" :class="{'footer__button_allowed': nextStepActive}" :disabled="!nextStepActive" @click.prevent="changeStep(activeStep+1)">{{ activeStep !== 3 ? 'Continue' : 'Confirm' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex'
  import Navigation from "./components/Navigation";
  import Category from "./components/Category";
  import Service from "./components/Service";
  import Search from "./components/Search";
  import Master from "./components/Master";
  import Confirm from "./components/Confirm";

  export default {
  name: 'app',
    components: {Confirm, Search, Category, Navigation, Service, Master},
      data () {
        return {
          form: {
              name: '',
              email: '',
              phone: '',
              message: ''
          }
        }
      },
    computed: {
      ...mapState(['steps', 'activeStep', 'categories', 'activeCategory', 'activeService', 'activeMaster', 'activeTime', 'activeDate']),
        title () {
          let title = ''
          switch (this.activeStep) {
            case 0:
                title = 'Choose the category'
                break
            case 1:
                title = this.activeCategory.title + ' — Choose the service'
                break
            case 2:
                this.activeService.forEach((el, index) => title += (index > 0 ? `, ${el.title}` : el.title))
                title += ' — Choose the master'
                break
            case 3:
                title = 'Confirm the appointment'
                  break
            case 4:
                title = 'Thank you!'
                  break
            default:
                break
          }
          return title
        },
        nextStepActive () {
          let active
          switch (this.activeStep) {
            case 0:
                active = !!this.activeCategory
                break
            case 1:
                active = !!this.activeService.length
                break
            case 2:
                active = !!this.activeMaster && !!this.activeDate && !!this.activeTime
                break
            case 3:
                active = !!this.form.phone && !!this.form.name && !!this.form.email
                break
            default:
                  break
          }
          return active
        },
        searchPlaceholder () {
            let placeholder
            switch (this.activeStep) {
                case 0:
                    placeholder = 'Search for a category'
                    break
                case 1:
                    placeholder = 'Search for a service'
                    break
                case 2:
                    placeholder = 'Search for a master'
                    break
                case 3:
                    placeholder = ''
                    break
                default:
                    break
            }
            return placeholder
        },
        searchHints () {
            let hints
            switch (this.activeStep) {
                case 0:
                    hints = this.categories
                    break
                case 1:
                    hints = this.activeCategory.services
                    break
                case 2:
                    hints = this.activeCategory.masters
                    break
                default:
                    hints = []
                    break
            }
            return hints
        }
    },
    methods: {
      ...mapActions(['changeStep', 'chooseCategory', 'chooseService', 'chooseMaster']),
        chooseItem (item) {
            switch (this.activeStep) {
                case 0:
                    this.chooseCategory(item)
                    break
                case 1:
                    this.chooseService(item)
                    break
                case 2:
                    this.chooseMaster(item)
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style lang="scss">
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";
  .wrapper {
    width: 100vw;
    height: 100vh;
    background: #060606;
    overflow: hidden;
    padding: 80px;

    @media (max-width: 1440px) {
      padding: 60px;
    }

    @media (max-width: 1700px) {
      padding: 40px;
    }
    @include media-breakpoint-down(md) {
      padding: 30px 0 0 0;
      overflow-y: auto;
      height: auto;
      min-height: 100vh;
    }
  }
  .inner {
    height: 100%;
  }
  .aside {
    height: 100%;
    margin-right: 80px;
    flex: 0 0 268px;
    width: 268px;
    max-width: 268px;

    @media (max-width: 1700px) {
      margin-right: 40px;
      flex: 0 0 230px;
      width: 230px;
      max-width: 230px;
    }

    @include media-breakpoint-down(md) {
      margin-right: 0;
      flex: 0 0 auto;
      width: 100%;
      max-width: 100%;
      height: auto;
      max-height: none;
    }

  }
  .logotype {
    width: 200px;
    height: 120px;
    max-width: 200px;
    @include media-breakpoint-down(md) {
      flex: 0 0 120px;
    }

    img {
      width: 100%;
      height: 100%;
    }

  }
  .link {
    font-size: 14px;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    opacity: 0.5;
    transition: opacity .3s linear;

    &:hover {
      opacity: 1;
      color: #fff;
      text-decoration: none;
    }
  }
  .content {
    background: #F6F6F6;
    border-radius: 24px;
    height: 100%;
    flex: 0 0 calc(100% - 348px);
    width: calc(100% - 348px);
    max-width: calc(100% - 348px);

    @media (max-width: 1700px) {
      flex: 0 0 calc(100% - 270px);
      width: calc(100% - 270px);
      max-width: calc(100% - 270px);
    }

    @include media-breakpoint-down(md) {
      flex: 1 1 auto;
      width: 100%;
      max-width: 100%;
      border-radius: 24px 24px 0 0;
      padding-bottom: 100px !important;

      &_confirm {
        padding: 0;
        .header {
          display: none !important;
        }
        .current-step {
          padding: 0 !important;
        }
      }

      &_sended {
        .header {
          display: block !important;
          .title {
            display: block !important;
            font-size: 35px;
            padding: 40px 30px
          }
        }
      }
    }


  }
  .footer {
    height: 108px;
    flex: 0 0 108px;
    max-height: 108px;
    padding-left: 64px;
    padding-right: 64px;
    border-top: 2px solid #E3E3E3;

    @media (max-width: 1440px) {
      padding-left: 30px;
      padding-right: 30px;
    }

    @media (max-width: 1700px) {
      padding-right: 20px;
      padding-left: 20px;
      height: 80px;
      max-height: 80px;
      flex: 0 0 80px;
    }

    @include media-breakpoint-down(md) {
      position: fixed;
      bottom: 0;
      width: 100vw;
      left: 0;
      z-index: 1000;
      background: #fff;
      border-top: 2px solid #E3E3E3 !important;
      box-shadow: 0px 0px 17px -4px rgba(0,0,0,.3);
    }

    &_last {
      border-top: none;
    }

    &__button {
      width: 147px;
      height: 44px;

      background: #E3E3E3;
      border-radius: 12px;

      border: none !important;
      outline: none !important;
      box-shadow: none !important;

      font-weight: bold;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #909090;

      cursor: default !important;
      transition: color .3s linear, background-color .3s linear, opacity .3s linear;
      opacity: 1;

      &::after {
        content: '';
        display: block;
        width: 16px;
        height: 11px;
        background: #909090;
        margin-left: 8px;
        mask: url("./assets/images/icon-arrow.svg") 0 0/16px 11px no-repeat;
        transition: background-color .3s linear;
      }

      &_allowed {
        background: #FF3F05;
        color: #fff;
        cursor: pointer !important;
        &::after {
          background-color: #fff;
        }

        &:hover {
          background-color: darken(#FF3F05, 8)
        }
      }

      &_back {
        background: #fff;
        border: 2px solid #e3e3e3 !important;
        cursor: pointer !important;
        
        &:hover {
          background: #e3e3e3;
        }
        &::after {
          transform: rotate(180deg);
          margin-left: 0;
          margin-right: 8px;
        }
      }

      &_hidden {
        opacity: 0;
      }
    }
  }
  .header {
    height: 200px;
    flex: 0 0 200px;
    max-height: 200px;
    padding-top: 80px;
    padding-left: 64px;
    padding-right: 64px;
    z-index: 2;

    @media (max-width: 1440px) {
      padding-top: 40px;
      padding-left: 30px;
      padding-right: 30px;
      height: 140px;
      max-height: 140px;
      flex: 0 0 140px;
    }

    @media (max-width: 1700px) {
      padding-top: 30px;
      padding-right: 20px;
      padding-left: 20px;
      height: 150px;
      max-height: 150px;
      flex: 0 0 150px;
    }

    @include  media-breakpoint-down(md) {
      height: 64px;
      max-height: 64px;
      flex: 0 0 64px;
      padding: 0;
    }

  }
  .current-step {
    padding-left: 64px;
    padding-right: 64px;
    position: relative;
    z-index: 1;
    overflow-y: scroll;

    @media (max-width: 1700px) {
      padding-right: 30px;
      padding-left: 30px;
    }

    @include media-breakpoint-down(md) {
      padding-right: 10px;
      padding-left: 10px;
    }
  }

  .title {

    font-weight: 600;
    font-size: 36px;
    line-height: 150%;
    letter-spacing: -0.02em;

    color: #FC4549;

    @include media-breakpoint-down(sm) {
      font-size: 23px;

    }
  }

  .first-step {
    display: flex;
    @include media-breakpoint-down(xs) {
      grid-template-columns: repeat(2, calc(50% - 10px));
      grid-gap: 20px;
      display: grid;
    }
    .category {
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
  .second-step {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    display: grid !important;

    @media (max-width: 1500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 1150px) {
      grid-template-columns: 1fr;
    }

    @include media-breakpoint-down(xs) {
      grid-template-columns: 1fr;
      grid-row-gap: 20px;
      display: grid !important;
    }
  }

  .third-step {
    display: flex;
    @include media-breakpoint-down(xs) {
      /*grid-template-columns: repeat(2, calc(50% - 10px));*/
      /*grid-gap: 20px;*/
      /*display: grid;*/
    }
  }

  .confirm {
    background: #EEEEEE;
    border-radius: 24px;
    width: 100%;
    height: auto;

    @include media-breakpoint-down(md) {
      flex: 0 0 100%;
    }
  }
</style>
