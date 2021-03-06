<template>
<header class="app-header">
  <div class="container">

  <div class="header-item" @click="toggleMenuApp" v-if="!desktop">
    <i v-if="!activeMenuApp" class="fa fa-bars"></i>
    <i v-else class="fa fa-times"></i>
  </div>

  <router-link to="/" class="header-item">
    <img src="../assets/images/cosmos-logo-black-alpha.png" alt="Cosmos Logo">
  </router-link>

  <menu class="menu-popup menu-app" v-if="activeMenuApp || desktop">
    <nav class="nav-app">
      <router-link to="/plan" @click.native="close" exact>Plan</router-link>
      <router-link to="/whitepaper" @click.native="close" exact>Whitepaper</router-link>
      <router-link to="/faq" @click.native="close" exact>FAQ</router-link>
      <a href="https://blog.cosmos.network" @click.native="close" target="_blank">Blog</a>
      <router-link to="/about" @click.native="close" exact>About</router-link>
    </nav>
    <nav>
      <a href="https://github.com/cosmos/cosmos" target="_blank">GitHub</a>
    </nav>
  </menu>

  <div class="header-item header-item-alert" @click="toggleMenuFundraiser">
    <i v-if="!activeMenuFundraiser" class="fa fa-hourglass-end">
      <!--<span class="alert">1</span>-->
    </i>
    <i v-else class="fa fa-times"></i>
    <span class="label" v-if="desktop">Fundraiser</span>
  </div>

  <menu-fundraiser
    :status="fundraiserStatus"
    v-if="activeMenuFundraiser"
    @click.native="toggleMenuFundraiser">
  </menu-fundraiser>

  </div>
</header>
</template>

<script>
import { mapGetters } from 'vuex'
import disableScroll from 'disable-scroll'
import MenuFundraiser from './MenuFundraiser'
export default {
  name: 'app-header',
  components: {
    MenuFundraiser
  },
  computed: {
    ...mapGetters(['config'])
  },
  data: () => ({
    activeMenuApp: false,
    activeMenuFundraiser: false,
    desktop: false
  }),
  methods: {
    close () {
      this.activeMenuApp = false
      this.activeMenuFundraiser = false
      disableScroll.off()
    },
    goto (route) {
      this.close()
      // console.log('going to', route)
      this.$router.push(route)
      return
    },
    toggleMenuApp () {
      this.activeMenuApp = !this.activeMenuApp
      if (this.activeMenuApp) disableScroll.on()
      else disableScroll.off()
    },
    toggleMenuFundraiser () {
      this.activeMenuFundraiser = !this.activeMenuFundraiser
      if (this.activeMenuFundraiser) disableScroll.on()
      else disableScroll.off()
    },
    watchWindowSize () {
      let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      if (w >= 1024) {
        this.close()
        this.desktop = true
        return
      }
      this.desktop = false
      return
    }
  },
  mounted () {
    this.watchWindowSize()
    window.onresize = this.watchWindowSize
  }
}
</script>

<style lang="stylus">
@require '../styles/variables.styl'

.app-header
  position fixed
  top 0
  left 0
  z-index 100
  width 100%

  background alpha(#fff, 95%)
  backdrop-filter blur(0.125rem)
  shadow()
  font-weight 400

  .container
    max-width 1024px
    margin 0 auto
    display flex
    flex-flow row wrap
    justify-content space-between

  .header-item
    height 3rem
    display flex
    align-items center
    padding 0 1rem

    color txt
    cursor pointer
    &:hover
      color link

    i.fa
      width 1rem
      text-align center
      position relative
    i.fa + .label
      margin-left 0.5rem
    i.fa, .label
      color txt

    .label
      user-select none

    img
      display block
      height 1.125rem
      width auto

    &.header-item-flush
      padding 0

    &.header-item-alert
      justify-content flex-end
      .alert
        df()
        font-size 0.5rem
        font-weight 600
        line-height 1
        color #fff
        display flex
        align-items center
        justify-content center

        width 0.666rem
        height 0.666rem
        border-radius 0.333rem
        background #f00
        position absolute
        bottom -0.3rem
        right -0.3rem
    &:hover
      i.fa, .label
        color link

  #nav-fundraiser
    display flex
    justify-content space-between
    align-items center
    span
      padding 0 0.375rem
      border 1px solid link
      border-radius 0.125rem
      font-size 0.875rem
      height 1.5rem
      display flex
      align-items center
      color link

    &.soon
      cursor not-allowed
      color light

  .menu-app
    nav
      a,
        display flex
        align-items center
        cursor pointer
        i.fa
          margin-right 0.25rem
        img
          height 1rem
          margin-right 0.1rem

  .menu-popup
    z-index 101
    user-select none

@media screen and (max-width:1023px)
  .menu-popup
    height 100vh
    position fixed
    top 3rem
    left 0
    bottom 0
    width 100vw

    background c-app-fg
    user-select none

    nav
      display flex
      flex-flow column
      padding 1.5rem 3rem
      > a, > p
        padding 0.75rem 0
      > a
        color txt
        border-bottom 1px solid bc
        display flex
        align-items center
        justify-content space-between
        user-select none
        &.disabled
          color light
          cursor not-allowed
        &:hover
          color link
        .alert
          display flex
          align-items center
          background link
          color c-app-fg
          font-size 0.75rem
          padding 0 0.5rem
          border-radius 0.25rem
          height 1.5rem
          i.fa
            color c-app-fg
          i.fa + .ni-time-left
            margin-left 0.25rem
      > p
        .ni-time-left
          display inline
          font-weight bold
        a
          color link
          &:hover
            text-decoration underline

@media screen and (min-width: 1024px)
  .app-header
    .container
      .header-item
        width 8rem

  .menu-popup.menu-app
    display flex
    padding 0 1rem
    .container
      display flex
    nav
      display flex
      flex-flow row
      align-items center
      > a
        padding 0 1rem
        color txt
        line-height 3rem
        &:hover
          color link
        &.router-link-active
          background linear-gradient(top, hsl(0,0,96%), hsl(0,0,98%))
          cursor default
          &:hover
            color txt
</style>
