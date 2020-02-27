<template>
    <div>
<editorcom/>
    </div>
</template>

<script>
    import editorcom from '@/components/editorcomponent/index.vue'
    export default {
        name: "index",
        components: {
            editorcom
        },
        data () {
            return {
                msg: 'Welcome to Use Tinymce Editor',
                disabled: false
            }
        }
    }
</script>

<style scoped>

</style>