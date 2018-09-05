<template>
    <div class="wrapper">
        <v-head></v-head>
         <v-sidebar v-on:tell-to-expend="listenToExpend"></v-sidebar> 
         <div  v-bind:class="[ expend ? 'content-extend':'content']"> 
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
         data () {
            return {
             expend:false
            }
          },
        components:{
            vHead, vSidebar
        },
        methods: {
            listenToExpend: function (msg) {
              this.expend = msg
            }
        }
    }
</script>
