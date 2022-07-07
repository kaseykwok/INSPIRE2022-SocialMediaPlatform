<template>
    <div>
        <EntrepreneurDisplay :entrepreneurData="entrepreneur"/>
        <b-card class="mb-5 mx-auto" style="max-width: 800px">
            <b-form>
                <b-form-group>
                    <b-form-radio-group 
                        class="mb-3 ms-3"
                        :options="paymentOptions" 
                        value-field="item"
                        text-field="name"
                        v-model="selectedPaymentMethod"
                    >
                    </b-form-radio-group>
                </b-form-group>

            </b-form>
            <b-button style="width: 100%" variant="primary">Click here to link to external payment site.</b-button>
        </b-card>
    </div>
</template>

<script>
import EntrepreneurDisplay from '../components/EntrepreneurDisplay.vue'
import EntrepreneurshipDataService from '../services/EntrepreneurshipDataService.js'

export default {
    name: 'EntrepreneurshipList',
    components: {
        EntrepreneurDisplay
    },
    data() {
        return {
            entrepreneur: {},
            selectedPaymentMethod: null,
            paymentOptions: [
                { item: 'VISA', name: 'VISA' },
                { item: 'Mastercard', name: 'Mastercard' },
                { item: 'JCB', name: 'JCB' }
            ]
        }
    },
    computed: {
        entrepreneurId() {
            return this.$route.params.id
        }
    },
    methods: {
        loadEntrepreneur() {
            EntrepreneurshipDataService.getEntrepreneurById(this.entrepreneurId).then(response => {
                this.entrepreneur = response.data
                console.log(this.entrepreneur)
             }).catch( error => {
                console.log("Error in retrieving entrepreneurship", error.response.data)
            })
        }
    },
    watch: {
        entrepreneurId() {
            this.loadEntrepreneur()
        }
    },
    created() {
        this.loadEntrepreneur()
    }
}
</script>