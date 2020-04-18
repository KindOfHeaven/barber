<template>

  <div class="category position-relative" @click="chooseCategory(category)" :class="{'category_active': category.id === (activeCategory ? activeCategory.id : -1)}">
    <div class="category__bg position-relative">
      <img :src="category.image" :srcset="category.image2x != null ? `${category.image} 1x, ${category.image2x} 2x` : null" :alt="category.title">
    </div>
    <div class="category__content position-absolute">
      <div class="category__title">{{ category.title }}</div>
      <div class="category__description">{{ category.description }}</div>
    </div>
    <div class="category__sale position-absolute" v-if="category.sale"></div>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
    export default {
        name: "Category",
        props: {
            category: {
                type: Object,
                required: true
            }
        },
        computed: {
            activeCategory () {
                return this.$store.state.activeCategory
            }
        },
        methods: {
            ...mapActions(['chooseCategory'])
        }
    }
</script>

<style scoped lang="scss">

  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";
  .category {
    width: 166px;
    height: 200px;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    @include media-breakpoint-down(xs) {
      width: 100%;
      height: auto;
    }

    &__bg {
      width: 100%;
      height: 100%;
      background: #000;
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
        opacity: .7;
        transition: opacity .3s linear;
      }
    }
    &__content {
      padding: 24px;
      bottom: 0;
      left: 0;
      width: 100%;
      height: auto;
      z-index: 2;

      @include media-breakpoint-down(xs) {
        padding: 12px;
      }
    }
    &__title {
      font-weight: 600;
      font-size: 20px;
      line-height: 130%;
      letter-spacing: -0.02em;

      color: #FFFFFF;
    }

    &__description {
      font-size: 12px;
      line-height: 130%;
      letter-spacing: -0.02em;

      color: #FFFFFF;
      opacity: 0.8;
    }

    &__sale {
      z-index: 3;
      right: 16px;
      top: 16px;
      width: 32px;
      height: 32px;
      background: url("../assets/images/icon-sale.svg") 0 0 no-repeat;
    }

    &_active {
      border: 2px solid #FF3F05;
      .category__bg {
        img {
          opacity: .5;
        }
      }
    }
  }
</style>