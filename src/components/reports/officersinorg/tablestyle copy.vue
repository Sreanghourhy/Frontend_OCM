<template >
    <div class="w-full p-8 " >
        <div class="pb-4 " >
            <n-select filterable v-model:value="selectedOrganization" :options="organizations" @update:value="updateSelectedOrganization" class="w-96" />
        </div>
        <div class="gd-section w-full mb-4" >
            <div v-if="selectedOrganizationRecord != null " class="w-full border-b border-gray-200 p-2 font-moul bg-blue-300 " >បញ្ជីរាយនាមមន្ត្រីរាជការក្នុងរចនាសម្ព័ន្ធនៅ{{ selectedOrganizationRecord?.organization?.name }} នៃទីស្តីការគណៈរដ្ឋមន្ត្រី</div>
            <table v-if="selectedOrganizationRecord?.organization" class="tbl-border w-full border-t-0 ">
                <thead>
                    <tr>
                        <th class="cell_llr" >ល.រ.រ</th>
                        <th class="cell_lr" >ល.រ</th>
                        <th class="cell_code" >អត្តលេខ</th>
                        <th class="cell_position" >មុខតំណែង</th>
                        <th class="cell_name" >គោត្តនាម និងនាម</th>
                        <th class="cell_gender" >ភេទ</th>
                        <th class="cell_dob" >ថ្ងៃខែឆ្នាំកំណើត</th>
                        <th class="cell_unofficial_date" >ថ្ងៃខែឆ្នាំចូលបម្រើការងារ</th>
                        <th class="cell_official_date" >ថ្ងៃខែឆ្នាំតាំងស៊ុប</th>
                        <th class="cell_krobkhan" >ក្របខ័ណ្ឌ</th>
                        <th class="cell_certificate" >កម្រិតវប្បធម៌</th>
                        <th class="cell_others" >ផ្សេងៗ</th>
                    </tr>
                </thead>
            </table>
            <table v-for="( child , cIndex ) in organizationsList " :key="cIndex"
                class="tbl-border w-full border-t-0 " >
                <caption v-if="selectedOrganizationRecord != null " class="w-full border-b border-gray-200 p-2 font-moul bg-blue-100 text-left " >{{ child.organization?.name }}</caption>
                <tbody>
                    <tr v-for="(sp , spIndex) in ( child.structure_positions ) " >
                        <td class="cell_llr" >{{ ( cIndex + 1 ) }}</td>
                        <td class="cell_lr" >{{ spIndex + 1 }}</td>
                        <td class="cell_code" >{{ sp }}</td>
                        <td class="cell_position" >{{ sp.position?.name }}</td>
                        <td class="cell_name" >{{ sp.officer_jobs?.pop()?.officer?.people?.lastname + ' ' + sp.officer_jobs?.pop()?.officer?.people?.firstname }}</td>
                        <td class="cell_gender" >{{ sp.officer_jobs?.pop()?.officer?.people?.gender == 1 ? 'ប្រុស' : 'ស្រី' }}</td>
                        <td class="cell_dob" >{{ sp.officer_jobs?.pop()?.officer?.people?.dob }}</td>
                        <td class="cell_unofficial_date" >{{ sp.officer_jobs?.pop()?.officer?.unofficial_date }}</td>
                        <td class="cell_official_date" >{{ sp.officer_jobs?.pop()?.officer?.official_date }}</td>
                        <td class="cell_krobkhan" >{{ sp.officer_jobs?.pop()?.officer?.salary_rank }}</td>
                        <td class="cell_certificate" >{{ sp.officer_jobs?.pop()?.officer?.people?.certificates[ sp.officer_jobs?.pop()?.officer?.people?.certificates.length -1 ]?.field_name  }}</td>
                        <td class="cell_others" >ផ្សេងៗ</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div v-if="selectedOrganizationRecord != null " class="w-full border-b border-gray-200 p-2 font-moul bg-gray-100 " >{{ selectedOrganizationRecord?.organization?.name }}</div> -->
            <!-- Officers at the top level -->
            <!-- <div v-if="selectedOrganizationRecord?.cids != null " class="w-full border-b border-gray-200 p-2 font-moul bg-gray-100 " >
                <div v-for="(child , index ) in selectedOrganizationRecord.cids" :key="index" class="w-full border-b border-gray-200 p-2 font-moul bg-gray-100 text-left " >{{ child?.organization?.name }}</div>
            </div> -->
            <!-- <table v-if="selectedOrganizationRecord?.organization" class="tbl-border w-full border-t-0 ">
                <thead>
                    <tr>
                        <th>ល.រ</th>
                        <th>អត្តលេខ</th>
                        <th>មុខតំណែង</th>
                        <th>គោត្តនាម និងនាម</th>
                        <th>ភេទ</th>
                        <th>ថ្ងៃខែឆ្នំកំណើត</th>
                        <th>ថ្ងៃខែឆ្នាំចូលបម្រើការងារ</th>
                        <th>ឋានន្តរស័ក្កិនិងថ្នាក់</th>
                        <th>កម្រិតវប្បធម៌</th>
                        <th>ផ្សេងៗ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="( child , cindex ) in selectedOrganizationRecord.cids" :key="cIndex" >
                        <td>{{ child }}</td>
                        <td >{{ 
                            
                        }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table> -->
        </div>
    </div>
</template>
<script >
import { ref, reactive, onMounted, computed } from 'vue' 
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useNotification, useMessage, useDialog } from 'naive-ui'
import Crud from '@classes/Crud'
export default {
    name: 'ReportOfficerWithOrganizationTableStyle',
    components: {},
    setup() {
        const model = reactive({
            name: 'Officer',
            module: 'officers',
            title: 'របាយការណ័មន្ត្រីតាមឋានានុក្រម'
        })

        const store = useStore()

        const organizations = ref([])
        const selectedOrganization = ref(null)
        const selectedOrganizationRecord = ref(null) 
        const organizationsList = ref([])
       
        async function loadOrganizationOptions() {
            selectedOrganization.value = null
            organizations.value = store.getters['organization/getRecords']
            if (Array.isArray(organizations.value) && organizations.value.length > 0) {
                organizations.value = store.getters['organization/getRecords'].map((o) => {
                    return { label: o.name , value: o.id }
                })
                return false
            }
            try {
                const res = await store.dispatch('organization/organizationStructure', {
                    search: '',
                    page: 1,
                    perPage: 1000,
                    id: 0
                })
                store.commit('organization/setRecords', Array.isArray(res?.data?.records) ? res.data.records : [])
                organizations.value = store.getters['organization/getRecords'].map((o) => {
                    return { label: o.name , value: o.id }
                })
            } catch (err) {
                console.log(err)
            }
        }

        let crud = new Crud()
        async function getOfficers(organizationStructureId) {
            crud.setServer(import.meta.env.VITE_API_SERVER)
            crud.setModel('officers')
            await crud.list({ organizations : organizationStructureId }, ( res) => { 
                    return crud.getRecords()
                }, ( err ) => {
                    console.log( err )
                }
            )
        }
        function updateSelectedOrganization() {
            console.log(selectedOrganization.value)
            if ( parseInt( selectedOrganization.value ) <= 0 ) return false
                
            // crud.list( 
            //     {
            //         organizations: selectedOrganization.value,
            //         perPage: 1000
            //     },
            //     (res) => {
            //         records.value = crud.getRecords()
            //         columns.value = crud.getColumns()
            //     },
            //     (err) => {
            //         console.log( err )
            //     }
            // )
            store.dispatch('officer/officersunderorganization', {
                page: 1,
                perPage: 100,
                search: '' ,
                organizations: selectedOrganization.value,
                positions: '',
                ids: '' 
            }).then(res => { 
                selectedOrganizationRecord.value = res.data.organization
                organizationsList.value = res.data.record
                console.log( organizationsList.value )
            }).catch(err => { 
                console.log( err )
            })
        }

        onMounted(() => { 
            loadOrganizationOptions()
        })
        
        return {
            model,
            organizations,
            selectedOrganization,
            updateSelectedOrganization,
            selectedOrganizationRecord,
            getOfficers,
            organizationsList
        }
    }
}
</script>
<style scoped >
    .tbl-border {
        @apply border border-gray-100;
    }
    .tbl-border tr:hover {
        @apply bg-yellow-50 ;
    }
    .tbl-border th {
        @apply border border-gray-100 p-1 bg-gray-50 ;
    }
    .tbl-border td {
        @apply border border-gray-100 p-1 ;
    }
    .cell_llr {
        @apply w-12;
    }
    .cell_lr {
        @apply w-12;
    }
    .cell_code {
        @apply w-28;
    }
    .cell_position {
        @apply w-60;
    }
    .cell_name {
        @apply w-96 text-left;
    }
    .cell_gender {
        @apply w-12;
    }
    .cell_dob, .cell_unofficial_date , .cell_official_date, .cell_krobkhan {
        @apply w-28;
    }
    .cell_certificate {
        @apply w-48;
    }
    .cell_others {
        @apply w-24;
    }
</style>