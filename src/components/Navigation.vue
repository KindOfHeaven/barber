<template>

  <nav class="navigation w-100 mt-4 mt-lg-0 px-5 px-lg-0">
    <ul class="navigation__steps d-flex d-lg-block justify-content-between align-items-center w-100" :data-step="activeStep">
      <li class="navigation__step d-flex align-items-center mb-xl-4 mb-3 flex-column flex-lg-row" :class="{'navigation__step_active': index <= activeStep,'navigation__step_previous': index < activeStep }" v-for="(step, index) in steps" :key="index+10" @click="tryToChange(index)">
        <div class="navigation__step__icon d-flex align-items-center justify-content-center mr-0 mr-lg-3 mb-2 mb-lg-0">{{ index+1 }}</div>
        <div class="navigation__step__text d-lg-block d-none">{{ step.label }}</div>
        <div class="navigation__step__mobile-text d-lg-none">{{ step.mobileText }}</div>
      </li>
    </ul>
  </nav>

</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: "Navigation",
        props: {
            steps: {
                type: Array,
                required: true
            }
        },
        computed: {
            activeStep () {
                return this.$store.state.activeStep
            }
        },
        methods: {
            ...mapActions(['changeStep']),
            tryToChange (step) {
                if (step < this.activeStep) {
                    this.changeStep(step)
                }
            }
        }
    }
</script>

<style scoped lang="scss">

  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";

  .navigation {
    &__steps {
      list-style: none;
      padding: 0;
      margin: 0;

      @include media-breakpoint-down(md) {
        position: relative;
        &::after {
          content: '';
          height: 1px;
          display: block;
          width: calc(100% - 24px);
          background: #E3E3E3;
          position: absolute;
          top: 14px;
          z-index: 1;
          left: 12px;
        }

        &[data-step="1"] {
          &::before {
            content: '';
            height: 1px;
            display: block;
            width: calc((100% - 24px)/3);
            background: #FF3F05;
            position: absolute;
            top: 14px;
            z-index: 2;
            left: 12px;
          }
        }
        &[data-step="2"] {
          &::before {
            content: '';
            height: 1px;
            display: block;
            width: calc((100% - 24px) / 3 * 2);
            background: #FF3F05;
            position: absolute;
            top: 14px;
            z-index: 2;
            left: 12px;
          }
        }
        &[data-step="3"], &[data-step="4"] {
          &::before {
            content: '';
            height: 1px;
            display: block;
            width: calc((100% - 24px));
            background: #FF3F05;
            position: absolute;
            top: 14px;
            z-index: 2;
            left: 12px;
          }
        }
      }
    }
    &__step {
      white-space: nowrap;
      position: relative;
      z-index: 3;
      &__icon {
        width: 28px;
        height: 28px;
        flex: 0 0 28px;
        max-width: 28px;
        border: 2px solid #C8C8C8;
        border-radius: 50%;
        background: #000;

        font-weight: 600;
        font-size: 18px;
        letter-spacing: -0.04em;
        color: #C8C8C8;

        transition: all .3s linear;

        padding-top: 3px;
      }
      &__text {
        font-size: 20px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #ACACAC;
        transition: color .3s linear;
      }

      &__mobile-text {

        font-weight: 600;
        font-size: 12px;
        line-height: 130%;

        text-align: center;
        letter-spacing: -0.02em;

        color: #ACACAC;
      }

      &_active {
        .navigation__step__icon {
          border-color: #FF3F05;
          background-color: #FF3F05;
          color: #fff;
        }
        .navigation__step__text {
          color: #FF3F05;
        }
        .navigation__step__mobile-text {
          color: #FF3F05;
        }
      }

      &_previous {
        cursor: pointer;

        &:not(.navigation__item_active) {
          .navigation__step__icon {
            font-size: 0;
            &:after {
              content: '';
              background: #fff;
              width: 12px;
              height: 8px;
              mask: url("../assets/images/icon-check.svg") 0 0/12px 8px no-repeat;
            }
          }
        }
      }
    }
  }
</style>