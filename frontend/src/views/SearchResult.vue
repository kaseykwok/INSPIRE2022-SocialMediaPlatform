<template>
    <div style="max-width: 800px" class="mx-auto">
        <h2>Search Results of "{{ searchWord }}"</h2>
        <p>Found</p>
    </div>
</template>

<script>
export default {
    name: 'SearchResult',
    data() {
        return {
            userMatch: [],
            entrepreneurMatch: []
        }
    },
    computed: {
        searchWord() {
            return this.$route.query.text
        }
    },  
    methods: {

    },
    created() {

    }
}
</script>