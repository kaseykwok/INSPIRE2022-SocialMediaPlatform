<template>
    <b-nav-form class="mx-3" style="width: 320px" @submit.prevent="onSearch">
        <b-input-group>
            <b-form-input 
                v-model="searchWord"
                placeholder="Search for users/entrepreneurships"
                autocomplete="off"
            >
            </b-form-input>
            <b-input-group-append>
                <b-button variant="secondary" type="submit">
                    <b-icon icon="search"></b-icon>
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </b-nav-form>
</template>

<script>
export default {
    name: 'SearchBox',
    data() {
        return {
            searchWord: ''
        }
    },
    methods: {
        onSearch() {
            console.log(this.searchWord)
            this.$router.push({
                path: '/searchResult',
                query: {
                    text: this.searchWord
                }
            })
        }
    }
}
</script>
