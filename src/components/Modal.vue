<template>
    <div class="modal" v-bind:class="{'is-active':is_active}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <slot></slot>
        </div>
        <button class="modal-close is-large" v-on:click="closeModal()" aria-label="close"></button>
    </div>
</template>
<script>
    export default {
        name: "Modal",
        data: function(){
            return {
                is_active: false
            }
        },
        methods: {
            closeModal: function(){
                this.is_active = false
            },
            openModal: function(){
                console.log('opening modal')
                this.is_active = true
                console.log(this.is_active)
            }
        }
    }
</script>