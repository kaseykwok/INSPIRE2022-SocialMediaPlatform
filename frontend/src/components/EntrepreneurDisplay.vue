<template>
    <div class="mb-4">
        <b-card-group>
            <b-card class="p-2 mx-auto" style="max-width: 800px"
                :img-src="entrepreneurData.imageURL"
            >
            <b-card-body>
                <b-button style="float: right" v-if="inListPage" @click="onSupport">Support</b-button>
                <b-card-title>{{ entrepreneurData.title }}</b-card-title>
                <b-card-text>{{ entrepreneurData.description }}</b-card-text>

                <br>

                <div class="row mb-2">
                    <b-card-text>Crowdfunding progress: ${{currentAmount}} / ${{entrepreneurData.targetAmount}}</b-card-text>
                </div>
                <b-progress height="2rem" :value="currentAmount" :max="entrepreneurData.targetAmount" stripeed animated
                ></b-progress>
                <br>
                <b-card-sub-title style="float: right">Proposed By 
                    <span class="username" @click="onClickProfile">{{userData.name}} (@{{ userData.username }}) </span>
                </b-card-sub-title>
            </b-card-body>

            </b-card>
        </b-card-group>
        
    </div>
</template>

<script>
export default {
    name: "EntrepreneurDisplay",
    props: {
        entrepreneurData: Object,
    },
    data() {
        return {
            currentAmount: 20000,
        }
    },
    computed: {
        userData() {
            return this.entrepreneurData.user
        },

        inListPage() {
            return this.$route.path === '/entrepreneurshipList'
        }
    },
    methods: {
        onClickProfile() {
            this.$router.push({ path: '/profile/' + this.userData.username })
        },

        onSupport() {
            this.$router.push({ path: '/entrepreneurship/' + this.entrepreneurData.id })
        }
    }
};
</script>

<style scoped>
.username:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>
