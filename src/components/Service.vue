<template>

  <div class="service d-flex px-2 py-2" @click="chooseService(service)" :class="{'service_active': activeService.includes(service)}">
    <div class="service__image mr-3 position-relative">
      <img :src="service.image" :srcset="service.image2x != null ? `${service.image} 1x, ${service.image2x} 2x` : null" :alt="service.title">
      <div class="service__sale position-absolute" v-if="service.sale"></div>
    </div>
    <div class="service__content d-flex flex-column justify-content-around flex-fill">
      <div class="service__title">{{ service.title }}</div>
      <div class="service__description my-2">{{ service.description }}</div>
      <div class="service__info d-flex">
        <div class="service__info__item time mr-3 d-flex align-items-center">{{ service.time + ' min' }}</div>
        <div class="service__info__item price d-flex align-items-center">{{ service.price + ' lei' }}</div>
      </div>
    </div>
  </div>

</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "Service",
        props: {
            service: {
                type: Object,
                required: true
            }
        },
        computed: {
            activeService () {
                return this.$store.state.activeService
            }
        },
        methods: {
            ...mapActions(['chooseService'])
        }
    }
</script>

<style scoped lang="scss">

  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/_breakpoints";
  .service {
    /*max-width: 414px;*/
    height: 224px;
    background: #FFFFFF;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid #ffffff;
    transition: border-color .3s linear;

    &__image {
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      width: 160px;
      max-width: 160px;
      flex: 0 0 160px;

      @media (max-width: 400px) {
        width: 120px;
        max-width: 120px;
        flex: 0 0 120px;
        height: auto;
        align-self: flex-start;
      }

      img {
        height: 100%;
        width: 100%;
        object-position: center;
        object-fit: cover;
      }

    }


    &__title {
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;

      letter-spacing: -0.02em;

      color: #010101;
    }

    &__description {
      font-size: 14px;
      line-height: 150%;

      letter-spacing: -0.04em;

      color: rgba(1, 1, 1, .5);
    }
    
    &__info {
      &__item {
        font-weight: 600;
        font-size: 12px;
        line-height: 150%;
        letter-spacing: -0.02em;
        white-space: nowrap;
        color: #3D3D3D;
        &::before {
          margin-right: 5px;
          background: #FF3F05;
          content: '';
          display: block;
          margin-top: -4px;
        }

        &.time {
          &::before {
            width: 14px;
            height: 16px;
            mask: url('../assets/images/icon-time.svg') 0 0/14px 16px no-repeat;
          }
        }
        &.price {
          &::before {
            width: 14px;
            height: 14px;
            mask: url('../assets/images/icon-price.svg') 0 0/14px 14px no-repeat;
          }
        }
      }
    }

    &_active {
      border: 2px solid #FF3F05;
    }
  }
</style>