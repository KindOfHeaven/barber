<template>

  <div class="master d-flex flex-column flex-lg-row" :class="{'master_active': master.id === (activeMaster ? activeMaster.id : -1)}">
    <div class="master__image position-relative d-flex d-lg-block " @click="chooseMaster(master)" >
      <div class="master__image__wrapper">
        <img :src="master.image" :srcset="master.image2x != null ? `${master.image} 1x, ${master.image2x} 2x` : null" :alt="master.title">
      </div>
      <div class="master__image__content position-absolute d-flex flex-column justify-content-end">
        <div class="master__name">{{ master.title }}</div>
        <div class="master__type">{{ master.type }}</div>
      </div>
    </div>
    <div class="master__content ml-lg-4 d-flex flex-column justify-content-between py-3" v-if="master.id === (activeMaster ? activeMaster.id : -1)">
      <div class="master__block">
        <div class="master__subtitle mb-1">Choose the date</div>
        <div class="master__date position-relative">
          <flat-pickr v-model="date" :config="config" :class="{'filled flatpickr-input': activeDate}"></flat-pickr>
          <div class="master__date__box position-absolute d-flex align-items-center justify-content-center"></div>
        </div>
      </div>
      <div class="master__block mt-4 mt-lg-0" v-if="date">
        <div class="master__subtitle mb-1">Available at:</div>
        <div class="master__times__wrapper position-relative">
          <div class="master__times__inner d-flex" ref="times" v-on:scroll="checkScroll">
            <div class="master__time d-flex align-items-center justify-content-center mr-2" v-for="(time,index) in master.time" :key="index+1000" @click="chooseTime(time)" :class="{'master__time_active': time === activeTime}">{{ time }}</div>
          </div>
          <div class="master__times__arrow position-absolute d-flex align-items-center justify-content-center" :class="{'scrolled': scrolled}" @click="scrollElem"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import { mapState, mapActions } from "vuex";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: "Master",
        components: {
            flatPickr
        },
        data () {
            return {
                date: this.$store.state.activeDate,
                config: {
                    dateFormat: 'd / m / Y',
                    disableMobile: true,
                    onChange: function(selectedDates, dateStr, instance) {
                        if (selectedDates) {
                            instance.element.classList.add('filled')
                        } else {
                            instance.element.classList.remove('filled')
                        }
                    }
                },
                scrolled: false,
            }
        },
        props: {
            master: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapState(['activeTime', 'activeMaster', 'activeDate'])
        },
        methods: {
            ...mapActions(['chooseMaster', 'chooseDate', 'chooseTime']),
            scrollElem () {
                this.$refs.times.scrollLeft = this.scrolled ? 0 : 10000
            },
            checkScroll () {
                this.scrolled = this.$refs.times.scrollLeft > 0
            }
         },
        watch: {
            date () {
                this.chooseDate(this.date)
            },
            activeDate () {
                this.date = this.activeDate
            }
        }
    }
</script>

<style scoped lang="scss">


  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";


  .master {
    padding: 18px;
    background: #fff;
    border-radius: 12px;
    height: 236px;
    width: auto;
    max-width: 615px;
    border: 2px solid #fff;
    transition: border-color .3s linear;

    @include media-breakpoint-down(md) {
      flex: 0 0 calc((100% - 40px)/4);
      width: calc((100% - 40px)/4);
      height: auto;
      padding: 10px;
    }

    @include media-breakpoint-down(sm) {
      flex: 0 0 calc((100% - 25px)/3);
      width: calc((100% - 25px)/3);
    }

    @include media-breakpoint-down(xs) {
      padding: 5px;
      flex: 0 0 calc((100% - 20px)/2);
      width: calc((100% - 20px)/2);
    }


    &__image {
      background: #000000;
      border-radius: 12px;
      width: 160px;
      flex: 0 0 160px;
      max-width: 160px;
      height: 100%;
      overflow: hidden;
      cursor: pointer;

      &__wrapper {
        height: 100%;
        width: 100%;
      }

      @include media-breakpoint-down(md) {
        height: auto;
        width: 100%;
        max-width: 100%;
        flex: 0 0 100%;
      }

      @include media-breakpoint-down(xs) {
        flex: 0 0 100%;
        width: 100%;
        max-width: 100%;
        height: auto;
      }

      img {
        width: 100%;
        height: 100%;
        opacity: .7;
        transition: opacity .3s linear;
      }

      &__content {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 12px 15px;
      }
    }

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

    &__date {
      width: 200px;
      height: 48px;
      background: #fff;

      &__box {
        top: 12px;
        left: 20px;
        width: 24px;
        height: 24px;
        border-radius: 2px;
        border: 2px solid #E2574C;

        &::after {
          content: '';
          display: block;
          width: 12px;
          height: 8px;
          background: #40545E;
          mask: url("../assets/images/icon-check.svg") 0 0/12px 8px no-repeat;
          opacity: 0;
          transition: opacity .3s linear;
        }
      }

      .flatpickr-input.filled + .master__date__box {
        &::after {
          opacity: 1;
        }
      }
    }

    .flatpickr-input {
      outline: none;
      border: 2px solid rgba(43, 47, 58, 0.1);
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding-left: 60px;
      border-radius: 8px;
    }

    &__times {
      &__wrapper {
        width: 370px;
      }
      &__inner {
        width: 100%;
        max-width: 100%;
        overflow-x: scroll;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          width: 0 !important
        }
      }

      &__arrow {
        width: 30px;
        height: 36px;
        right: -30px;
        top: 0;
        cursor: pointer;
        z-index: 10;

        @include media-breakpoint-down(md) {
          right: 0;
        }

        &::after {
          content: '';
          display: block;
          width: 6px;
          height: 11px;
          background: #000;
          mask: url("../assets/images/icon-next.svg") 0 0/5px 10px no-repeat;
          transition: transform .3s linear;
        }

        &.scrolled {
          &::after {
            transform: rotate(180deg);
          }
        }
      }
    }

    &__time {
      background: #F4F4F4;
      border: 2px solid rgba(43, 47, 58, 0.02);
      box-sizing: border-box;
      border-radius: 12px;
      width: auto;
      flex: 0 0 auto;
      padding: 0 16px;
      height: 36px;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #000000;
      cursor: pointer;
      transition: color .3s linear, background-color .3s linear;

      &_active {
        background: #FF3F05;
        border: 2px solid rgba(43, 47, 58, 0.02);
        color: #fff;
      }
    }

    &__content {
      width: 425px;
      flex: 0 0 425px;
    }

    &_active {
      border: 2px solid #FF3F05;

      @include media-breakpoint-down(md) {
        flex: 0 0 100%;
        width: 100%;
        max-width: 100%;
      }

      @include media-breakpoint-down(md) {
        height: auto;
        padding: 12px;
        .master__image {
          overflow: visible;
          background: none;
          width: 100%;
          max-width: 100%;
          height: auto;
          flex: 0 0 auto;

          &__wrapper {
            width: 56px;
            flex: 0 0 56px;
            height: 56px;
            overflow: hidden;
            border-radius: 50%;
            img {
              opacity: 1;
              object-position: center;
              object-fit: cover;
            }
          }

          &__content {
            position: static !important;
            padding: 0;
            margin-left: 20px !important;
            justify-content: space-around !important;
          }
        }
        .master__name {
          font-weight: 600;
          font-size: 20px;
          line-height: 130%;
          letter-spacing: -0.02em;
          color: #060606;
        }
        .master__type {
          font-weight: 600;
          font-size: 14px;
          line-height: 150%;
          letter-spacing: -0.02em;
          color: #060606;
          opacity: .8;
        }
        .master__content {
          flex: 0 0 auto;
          height: auto;
          width: 100%;
          max-width: 100%;
        }
        .master__times {
          &__wrapper {
            width: 100%;
            max-width: 100%;
          }
          &__inner {
            width: calc(100% - 30px);
          }
        }
        grid-column: 1/3;
      }
    }
  }
</style>