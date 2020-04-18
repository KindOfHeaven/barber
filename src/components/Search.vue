<template>

  <div class="search-block">
    <div class="search-block__icon">
      <img src="../assets/images/icon-search.svg" alt="search">
    </div>
    <input type="text" class="search-block__input" name="search" v-model="input" :placeholder="placeholder">
    <div class="search-block__hints position-absolute w-100" v-if="inputHints.length">
      <div class="search-block__hints__item mb-2" v-for="(hint, index) in inputHints" :key="index+1000" @click="chooseHint(hint)">{{ hint.title }}</div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Search",
        props: {
            placeholder: {
                type: String,
                required: true
            },
            hints: {
                type: Array,
                 required: true
            }
        },
        data () {
            return {
                input: '',
                inputHints: []
            }
        },
        watch: {
            input () {
                this.inputHints = this.input ? this.hints.filter(el => el.title.toLowerCase().includes(this.input.toLowerCase())) : []
            }
        },
        methods: {
            chooseHint (hint) {
                this.inputHints = []
                this.input = ''
                this.$emit('choose-item', hint)
            }
        }
    }
</script>

<style scoped lang="scss">

  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";
  .search-block {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 0 15px 0 60px;
    position: relative;
    height: 64px;
    max-width: 400px;
    width: 100%;

    @include media-breakpoint-down(md) {
      max-width: 100%;
      box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.02);
      border-radius: 24px;
    }

    &__icon {
      position: absolute;
      top: 20px;
      left: 20px;
    }
    &__input {
      background: transparent;
      border: none !important;
      outline: none !important;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: -0.02em;
      color: #000000;
      height: 100%;
      width: 100%;
    }

    &__hints {
      background: #fff;
      border-radius: 12px;
      padding: 10px 15px 0 60px;
      top: 100%;
      left: 0;
      border: 1px solid #eee;

      &__item {
        cursor: pointer;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: -0.02em;
        color: #000000;
        transition: color .3s linear;
        &:hover {
          color: #FC4549
        }
      }
    }
  }
</style>