<template>
  <div id="wrapper">
    <div class="tab-group">
      <div class="tab-item">
        <span class="icon icon-cancel icon-close-tab"></span>
        Tab
      </div>
      <div class="tab-item active">
        <span class="icon icon-cancel icon-close-tab"></span>
        Tab active
      </div>
      <div class="tab-item">
        <span class="icon icon-cancel icon-close-tab"></span>
        Tab
      <div class="tab-item tab-item-fixed" @click="addTable">
        <span class="icon icon-plus"></span>
      </div>
      <div class="tab-item tab-item-fixed">
        <span class="icon icon-menu"></span>
      </div>
    </div>
    <main>
      <nav class="nav-group">
        <h5 class="nav-group-title">Favorites</h5>
        <a class="nav-group-item active">
          <span class="icon icon-home"></span>
          connors
        </a>
        <span class="nav-group-item">
          <span class="icon icon-download"></span>
          Downloads
        </span>
        <span class="nav-group-item">
          <span class="icon icon-folder"></span>
          Documents
        </span>
        <span class="nav-group-item">
          <span class="icon icon-signal"></span>
          AirPlay
        </span>
        <span class="nav-group-item">
          <span class="icon icon-print"></span>
          Applications
        </span>
        <span class="nav-group-item">
          <span class="icon icon-cloud"></span>
          Desktop
        </span>
      </nav>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import TabGroup from 'electron-tabs';
  export default {
    name: 'landing-page',
    components: { SystemInformation },
    created() {
      // this.getGroup();
    },
    mounted() {
      // this.getGroup();
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      getGroup() {
        
        let tabGroup = new TabGroup({
          newTab: {
              title: 'New Tab'
          }
        });
        tabGroup.addTab({
            title: 'Google',
            src: '/',
        });
        tabGroup.addTab({
            title: "Electron",
            src: "/",
            visible: true,
            active: true
        });
      }
    }
  }
</script>

<style>
  /* @import './test.css'; */
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    /* padding: 60px 80px; */
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
