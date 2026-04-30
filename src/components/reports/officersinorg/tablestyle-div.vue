<template >
    <div class="report-officers-org w-full relative mt-8 text-sm leading-normal">
        <!-- Body Khmer: scoped .report-officers-org (Siemreap); Moul / Tacteing on letterhead — matches print profiles -->
        <header class="report-letterhead mb-6 flex flex-wrap items-start justify-between gap-6 px-1">
            <div class="report-letterhead__left min-w-0 max-w-xl flex-1 text-left">
                <div class="font-moul text-lg leading-snug">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                <div class="font-moul text-base sm:text-lg leading-relaxed break-words">
                    {{ selectedOrganizationRecord?.organization?.name }}
                </div>
            </div>
            <div class="report-letterhead__right shrink-0 max-w-md text-right">
                <div class="font-moul text-lg leading-snug">ព្រះរាជាណាចក្រកម្ពុជា</div>
                <div class="font-moul text-lg leading-snug">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
                <div
                  class="font-tacteing leading-none text-right -mt-1"
                  style="font-size: 2rem"
                  aria-hidden="true"
                >3</div>
            </div>
        </header>
        <!-- <div class="pb-4 relative" >
            <n-select filterable v-model:value="selectedOrganization" :options="organizations" @update:value="updateSelectedOrganization" class="w-96" placeholder="សូមជ្រើសរើសអង្គភាព" />
            <div @click="$router.push('/officer')" class="absolute top-0 right-0 h-8 w-24 leading-8 rounded bg-blue-200 text-gray-800 border border-blue-400 cursor-pointer hover:bg-blue-400 duration-300 ">បញ្ជីមន្ត្រី</div>
        </div> -->
        <div v-if="selectedOrganizationRecord != null " class="gd-section w-full mb-4" >
            <!-- <div class="w-full border-b border-gray-200 p-2 font-moul bg-blue-300 " >បញ្ជីរាយនាមមន្ត្រីរាជការក្នុងរចនាសម្ព័ន្ធនៅ{{ selectedOrganizationRecord?.organization?.name }} នៃទីស្តីការគណៈរដ្ឋមន្ត្រី</div> -->
            <div class="report-section-title w-full border-b border-gray-200 p-2 py-4 font-moul bg-white leading-relaxed break-words" >បញ្ជីរាយនាមមន្ត្រីរាជការក្នុងរចនាសម្ព័ន្ធនៅ {{ selectedOrganizationRecord?.organization?.name }} នៃទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
            <div v-if="selectedOrganizationRecord?.organization" class="w-full bg-blue-300">
                <div class="w-full flex " >
                    <!-- <div class="cell_llr" >ល.រ.រ</div> -->
                    <div class="cell_lr" >ល.រ</div>
                    <div class="cell_code" >អត្តលេខ</div>
                    <div class="cell_position" >មុខតំណែង</div>
                    <div class="cell_name" >គោត្តនាម និងនាម</div>
                    <div class="cell_gender" >ភេទ</div>
                    <div class="cell_dob" >ថ្ងៃខែឆ្នាំកំណើត</div>
                    <div class="cell_unofficial_date" >ថ្ងៃខែឆ្នាំចូលបម្រើការងារ</div>
                    <div class="cell_official_date" >ថ្ងៃខែឆ្នាំតាំងស៊ប់</div>
                    <div class="cell_krobkhan" >ក្របខ័ណ្ឌ</div>
                    <div class="cell_certificate" >កម្រិតវប្បធម៌</div>
                    <div class="cell_others" >ផ្សេងៗ</div>
                </div>
            </div>
            <div v-for="( child , cIndex ) in organizationsList " :key="cIndex" class="tbl-border w-full border-t-0 " >
                <div :id="child.organization.keyname" v-if="selectedOrganizationRecord != null " class="tbl-caption w-full border-b border-gray-200 p-2 font-moul bg-blue-100 text-left leading-relaxed break-words clear-both" >{{
                    // $toKhmer(cIndex + 1) + '. ' +
                    child.organization?.name }}</div>
                <div v-for="(oj, oIndex) in (child.structure_positions?.map((sp) => { return sp.officer_jobs }).flat() )" :key="oIndex" 
                    class="w-full flex flex-wrap relative tbl-row" >
                    <div class="cell_lr" >{{ $toKhmer( oIndex + 1 ) }}</div>
                    <div class="cell_code" >{{ $toKhmer( oj.officer?.code ) }}</div>
                    <div class="cell_position" >{{ oj.officer?.current_job?.organization_structure_position?.position?.name }}</div>
                    <div class="cell_name" >{{ oj.officer?.people?.lastname + ' ' + oj.officer?.people?.firstname }}</div>
                    <div class="cell_gender" >{{ oj.officer?.people?.gender == 1 ? 'ប្រុស' : 'ស្រី' }}</div>
                    <div class="cell_dob" >{{ oj.officer?.people?.dob != null && oj.officer?.people?.dob.length > 0 ? $toKhmer( dateFormat( new Date( oj.officer?.people?.dob ) , 'dd-mm-yyyy' ) ) : '' }}</div>
                    <div class="cell_unofficial_date" >{{ oj.officer?.unofficial_date != null && oj.officer?.unofficial_date.length > 0 ? $toKhmer( dateFormat( new Date( oj.officer?.unofficial_date ) , 'dd-mm-yyyy' ) ) : '' }}</div>
                    <div class="cell_official_date" >{{ oj.officer?.official_date != null && oj.officer?.official_date.length > 0 ? $toKhmer( dateFormat( new Date( oj.officer?.official_date ) , 'dd-mm-yyyy' ) ) : '' }}</div>
                    <div class="cell_krobkhan" >{{ oj.officer?.salary_rank  }}</div>
                    <div class="cell_certificate" v-html="oj.officer?.people?.certificates?.map( (c) => { return c.field_name }).join('<br/>')" ></div>
                    <div class="cell_others" >{{ oj?.unofficial_position?.name }}</div>
                    <div class="cell_actions" >
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <svg class="text-red-500" @click="deleteOfficerJob(oj)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M11.5 4a1.5 1.5 0 0 0-3 0h-1a2.5 2.5 0 0 1 5 0H17a.5.5 0 0 1 0 1h-.554L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.553 5H3a.5.5 0 0 1-.492-.41L2.5 4.5A.5.5 0 0 1 3 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 0 0 .994.885h6.326a1 1 0 0 0 .993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z" fill="currentColor"></path></g></svg>
                            </template>
                            លុបទិន្នន័យនេះ
                        </n-tooltip>
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M920 760H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-568H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM216 712H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h72.4v20.5h-35.7c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h35.7V838H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4V716c0-2.2-1.8-4-4-4zM100 188h38v120c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V152c0-4.4-3.6-8-8-8h-78c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4zm116 240H100c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h68.4l-70.3 77.7a8.3 8.3 0 0 0-2.1 5.4V592c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4v-36c0-2.2-1.8-4-4-4h-68.4l70.3-77.7a8.3 8.3 0 0 0 2.1-5.4V432c0-2.2-1.8-4-4-4z" fill="currentColor"></path></svg>
                            </template>
                            កំណត់លេខរៀង
                        </n-tooltip>
                    </div>
                </div>
            </div>
            <div class="flex flex-row-reverse" >
                <div class="w-96" >
                    <div class="w-full" >
                        <table class="w-full border mt-4  rounded-sm">
                            <caption class="py-2 font-moul bg-blue-500 text-white rounded-t-md " >បូកសរុបចំនួនមន្ត្រីនិងថ្នាក់ដឹកនាំតាមតួនាទី</caption>
                            <tbody>
                                <tr v-for="(totalOfficerInPosition , position ) in totalByPositions" :key="position" class="border-b border-blue-100 " >
                                    <td class="text-left p-2 " >{{ position }}</td>
                                    <td class="text-center p-2 font-bold" >{{ $toKhmer( totalOfficerInPosition ) }}</td>
                                </tr>
                                <tr class=" bg-blue-100">
                                    <td class="text-left p-2 text-blue-600 " >សរុប</td>
                                    <td class="text-center p-2 font-bold text-blue-600" >{{ $toKhmer( totalOfficers ) }}</td>
                                    <!-- <td colspan="2" class="text-right p-2 pr-6 font-bold">សរុប ៖ {{ totalOfficers }}</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectedOrganizationRecord == null " class="place-content-center" >
            <div class="p-8 w-full mx-auto rounded bg-opacity-80 text-base font-moul" >
                <svg class="w-24 h-24 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z" fill="currentColor"></path><path d="M464 688a48 48 0 1 0 96 0a48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" fill="currentColor"></path></svg><br/>
                សូមជ្រើសរើសអង្គភាពក្នុងប្រអប់ខាងលើ។
            </div>
        </div>
        <div v-if="reloadReportOverlay" class="absolute right-0 bottom-0 top-0 left-0 bg-opacity-50 bg-white p-1 place-content-center" >
            <div class="p-8 w-60 mx-auto rounded -mt-48 bg-opacity-80" >
                <svg class="mx-auto animate-spin h-8 w-8 text-blue-600 mb-8 " viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g><animateTransform attributeName="transform" type="rotate" values="0 100 100;270 100 100" begin="0s" dur="1.6s" fill="freeze" repeatCount="indefinite"></animateTransform><circle class="n-base-loading__icon" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" cx="100" cy="100" r="92" stroke-dasharray="567" stroke-dashoffset="1848"><animateTransform attributeName="transform" type="rotate" values="0 100 100;135 100 100;450 100 100" begin="0s" dur="1.6s" fill="freeze" repeatCount="indefinite"></animateTransform><animate attributeName="stroke-dashoffset" values="567;142;567" begin="0s" dur="1.6s" fill="freeze" repeatCount="indefinite"></animate></circle></g></svg>
                កំពុងរៀបចំរបាយការណ៍
            </div>
        </div>
    </div>
</template>
<script >

import { ref, reactive, onMounted, computed } from 'vue' 
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useNotification, useMessage, useDialog , useLoadingBar } from 'naive-ui'
import Crud from '@classes/Crud'
import dateFormat from 'dateformat'
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
        const route = useRoute()
        const dialog = useDialog()

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
                // if (route.query?.organizationId > 0) {
                //     selectedOrganization.value = route.query.organizationId
                //     updateSelectedOrganization()
                // }
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
                // if (route.query?.organizationId > 0) {
                //     selectedOrganization.value = route.query.organizationId
                //     updateSelectedOrganization()
                // }
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
        const totalByPositions = ref([])
        const totalOfficers = ref(0)
        function updateSelectedOrganization() {
            // អគ្គនាយកដ្ឋានបរិវត្តកម្មឌីជីថល
            selectedOrganization.value = 401
            reloadReportOverlay.value = true 
            if ( parseInt( selectedOrganization.value ) <= 0 ) return false
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
                totalByPositions.value = res.data.totalOfficersWithInPosition
                totalOfficers.value = res.data.totalOfficers
                
                reloadReportOverlay.value = false
            }).catch(err => { 
                console.log(err)
            })
        }        

        onMounted(() => { 
            loadOrganizationOptions()
        })

        const reloadReportOverlay = ref(false)

        function deleteOfficerJob(officerJob) {
            dialog.warning({
                title: 'លុបមន្ត្រី',
                content: 'តើអ្នកពិតជាត្រូវការលុបតួនាទីរបស់មន្ត្រីនេះមែនទេ?',
                positiveText: 'លុប',
                negativeText: 'ទេ',
                draggable: true,
                onPositiveClick: () => {
                    store.dispatch('officer/removeOfficerJob', {
                        id: officerJob.id 
                        // officer_id: officerJob.officer.id ,
                        // officer_job_id : officerJob.id
                    }).then(res => {
                        console.log(res.data)
                        updateSelectedOrganization()
                    }).catch(err => {
                        console.log( err )
                    })      
                },
                onNegativeClick: () => {
                    
                }
            })
        }

        updateSelectedOrganization()

        return {
            model,
            organizations,
            selectedOrganization,
            updateSelectedOrganization,
            selectedOrganizationRecord,
            getOfficers,
            organizationsList ,
            reloadReportOverlay ,
            dateFormat,
            deleteOfficerJob,
            totalByPositions, 
            totalOfficers   
        }
    }
}
</script>
<style scoped >
    .tbl-border {
        @apply border border-gray-100 flex flex-wrap;
    }
    .tbl-border tr:hover {
        @apply bg-yellow-50 ;
    }
    .cell_llr {
        @apply w-12 border border-gray-100 p-1 border-r-0  leading-5;
    }
    .cell_lr {
        @apply w-12 border border-gray-100 p-1 border-r-0  leading-5;
    }
    .cell_code {
        @apply w-28 border border-gray-100 p-1 border-r-0  leading-5;
    }
    .cell_position {
        @apply w-60 border border-gray-100 p-1 border-r-0  leading-5;
    }
    .cell_name {
        @apply w-96 text-left flex-grow border border-gray-100 p-1 border-r-0 leading-5;
    }
    .cell_gender {
        @apply w-12 border border-gray-100 p-1 border-r-0  leading-5;
    }
    .cell_dob, .cell_unofficial_date , .cell_official_date, .cell_krobkhan {
        @apply w-32 border border-gray-100 p-1  border-r-0 leading-5;
    }
    .cell_certificate {
        @apply w-48 border border-gray-100 p-1  border-r-0 leading-5 ;
    }
    .cell_others {
        @apply w-32 border border-gray-100 p-1 leading-5 ;
    }
    .cell_actions {
        @apply invisible absolute top-0 right-0 bottom-0 bg-yellow-50 flex flex-row p-1 my-1 ;
    }
    .cell_actions svg {
        @apply w-4 h-4 mx-1 cursor-pointer ;
    }
    .tbl-row:hover {
        @apply bg-yellow-50;
    }
    .tbl-row:hover .cell_actions {
        @apply visible ;
    }

    /*
      Global app.css uses body * { font-family: Arial }, which breaks Khmer in table cells.
      Force Siemreap for report text; Moul / Tacteing for letterhead (higher specificity).
    */
    .report-officers-org {
        font-family: "sr", "Kantumruy Pro", "Khmer OS", sans-serif;
    }
    .report-officers-org * {
        font-family: inherit;
    }
    .report-officers-org .font-moul {
        font-family: "moul", sans-serif;
    }
    .report-officers-org .font-tacteing {
        font-family: tacteing, sans-serif;
    }
</style>