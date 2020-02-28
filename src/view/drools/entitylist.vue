<template>
    <div>

    </div>
</template>

<script>
    import {getAllEntities} from '@/api/business/droolsapi'

    export default {
        name: "entitylist",
        data() {
            return {
                entitylist: [],
                groupName: '',
                groupId: '',
                entityName: '',
                id: 0
            }
        },
        methods: {
            loadData() {
                var postdata = {
                    id: this.id,
                    groupName: this.groupName,
                    entityName: this.entityName,
                    groupId: this.groupId
                }
                getAllEntities(postdata);
            }
        }
    }
</script>

<style scoped>

</style>
