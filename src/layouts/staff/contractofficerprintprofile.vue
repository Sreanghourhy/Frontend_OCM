<template >
  <div class="birth-information relative flex flex-wrap mx-auto " :style=" 'width: 21cm;' " >
    <div v-if="officer != undefined && officer != null " class="p-2 flex flex-wrap text-left " >
      <div class="heading w-full mb-4 relative flex flex-wrap " >
        <div class="font-moul w-full leading-6 text-center" >ព្រះរាជាណាចក្រកម្ពុជា</div>
        <div class="font-moul w-full leading-6 text-center" >ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        <div class="font-tacteing w-full  text-center h-10 -mt-2 " style="font-size: 2rem; " >3</div>
        <div class="organization w-1/2 relative my-2 pt-6 text-left -mt-2" >
          <div class="font-moul w-full leading-6" >ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
          <div v-if="organizationDisplayName && organizationDisplayName != 'ទីស្ដីការគណៈរដ្ឋមន្ត្រី' " class="font-moul w-full leading-6" >{{ organizationDisplayName }}</div>
        </div>
        <div class="profile-photo w-1/2 relative my-2 -mt-2 " style="height: 3.2cm; " >
          <div class="absolute top-0 right-0 mr-12 " style="width: 3.2cm; height: 4.2cm; " >
            <img v-if="officer.image != undefined && officer.image != null && officer.image.length > 0 " :src="officer.image" class="border border-gray-200 " style="width: 100%; height: 100%; " />
            <img v-if="officer.image == undefined || officer.image == null " :src="ocmLogoUrl" class="border border-gray-200 " style="width: 100%; height: 100%; opacity: 50%; padding: 10px; " />
          </div>
        </div>
      </div>
      <div class="font-moul w-full pb-2  text-center mb-2 " >ជីវប្រវត្តិ{{ officer_type_name }}
         <div class="font-tacteing w-full  text-center h-10 -mt-2 " style="font-size: 2rem; " >3</div>
        <!-- <div class="font-tacteing w-full mt-2 text-center" style="font-size: 1rem; " >3</div> -->
      </div>
      <div class="body w-full font-sr" >
        <div class="form-panel   w-full mx-auto " >
          <div class="w-full mb-4 " >
            <div class="relative w-full mb-2 font-moul text-left" >ក. ព័ត៌មានផ្ទាល់ខ្លួន</div>
            <table v-if=" officer.people != undefined && officer.people != null " class="w-full section-bullet-table personal-info-table" >
              <colgroup>
                <col class="pi-col-label" />
                <col class="pi-col-main" />
                <col class="pi-col-right" />
                <col class="pi-col-right2" />
              </colgroup>
              <tbody>
                
                <tr>
                  <td > - គោត្តនាម និងនាម</td>
                  <td >
                    <div>
                      {{ officer.people.lastname }}
                      {{officer.people.firstname }}
                    </div>
                  </td> 
                  <td colspan="1" >ភេទ : {{ parseInt( officer.people.gender ) == 1 ? 'ប្រុស' : 'ស្រី' }}</td>
                  <td>
                    សញ្ជាតិ : {{ officer.people.national || officer.people.nationality }}
                  </td>                
                </tr>
                <tr>
                  <td > - អក្សរពុម្ពឡាតាំង</td>
                  <td >
                    <div>
                      {{officer.people.enfirstname }}
                      {{officer.people.enlastname }}
                    </div>
                  </td> 
                  <!-- <td colspan="3" >{{ 'អក្សរពុម្ភឡាតាំង : ' + officer.people.enlastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " អក្សរពុម្ភឡាតាំង : " +  officer.people.enfirstname }}</td> -->
                  <!-- <td colspan="3" >{{ 'គោត្តនាម : ' + officer.people.enlastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " នាមខ្លួន : " +  officer.people.enfirstname }}</td> -->
                </tr>
                <tr>
                  <td > - ថ្ងៃខែឆ្នាំកំណើត</td>
                  <td>{{ ( ( officer.people.dob != null && officer.people.dob.length > 0 ) ? $toKhmer( formatKhmerDateWithMonthName( officer.people.dob ) ) : '' ) }}</td>
                  <!-- <td class="">ជនជាតិ : {{ officer.people.national }}</td>
                  <td class="">សញ្ជាតិ : {{ officer.people.nationality }}</td> -->
                </tr>
                <tr>
                  <td > - ទីកន្លែងកំណើត</td>
                  <td colspan="3" >{{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.pob != null  ) ? $toKhmer( officer.people.pob ) : '' ) }}</td>
                </tr>
                <tr>
                  <td > - កម្រិតវប្បធម៌</td>
                  <td colspan="3" >
                     {{ 
                      (() => {
                        const certificates = officer?.people?.certificates;
                        if (!certificates) return '';
                        
                        let selectedCert = null;
                        
                        if (certificates.middle?.length > 0) {
                          selectedCert = certificates.middle[certificates.middle.length - 1];
                        } else if (certificates.first?.length > 0) {
                          selectedCert = certificates.first[certificates.first.length - 1];
                        }
                        
                        // return selectedCert?.group?.name ? $toKhmer(selectedCert.group.name) : '';
                        if (!selectedCert) return '';
        
                        const level = selectedCert?.group?.name || '';
                        const field = selectedCert?.field_name || '';
                        
                        if (level && field) {
                          return $toKhmer(level + ' - ' + field);
                        } else if (level) {
                          return $toKhmer(level);
                        } else if (field) {
                          return $toKhmer(field);
                        }
                        return '';
                      })()
                    }}
                  </td>
                </tr>
                <!-- --------start: identification row with NID and passport logic-------- -->
                <tr>
                  <td> - លេខអត្តសញ្ញាណប័ណ្ណ</td>
                  <td colspan="3">
                    <div class="flex items-center gap-4">
                      <div class="flex items-center leading-6">
                        <svg v-if="officer?.people?.nid && officer.people.nid.trim() !== ''" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <rect width="24" height="24" rx="3" fill="black"/>
                          <path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/>
                        </svg>
                        សញ្ជាតិខ្មែរ
                      </div>
                      <div class="flex items-center leading-6">
                        <svg v-if="(!officer?.people?.nid || officer.people.nid.trim() === '') && officer?.people?.passports && officer.people.passports.length > 0 && officer.people.passports[0].number && officer.people.passports[0].number.trim() !== ''" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <rect width="24" height="24" rx="3" fill="black"/>
                          <path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/>
                        </svg>
                        ឬលិខិតឆ្លងដែន
                      </div>
                      <span class="font-bold ml-2">
                        {{ 
                          (() => {
                            if (officer?.people?.nid && officer.people.nid.trim() !== '') {
                              return officer.people.nid
                              // return $toKhmer(officer.people.nid)
                            } else if (officer?.people?.passports && officer.people.passports.length > 0 && officer.people.passports[0].number && officer.people.passports[0].number.trim() !== '') {
                              return officer.people.passports[0].number
                            }
                            return '-'
                          })()
                        }}
                      </span>
                    </div>
                  </td>
                </tr>
                <!-- --------end: identification row with NID and passport logic-------- -->
                <!-- <tr>
                  <td >អត្តលេខមន្ត្រីរាជការ</td>
                  <td class="" >{{ $toKhmer( officer.code ) }}</td>
                </tr> -->
                <!-- <tr v-if="officer.people.passports != null && officer.people.passports != undefined && officer.people.passports.length > 0" >
                  <td >លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</td>
                  <td>{{ $toKhmer( officer.people.passports[0].number ) }}</td>
                  <td class="">សុពលភាព : {{ $toKhmer( formatDateSafe( officer.people.passports[0].effective_date ) ) }}</td>
                  <td class="">ដល់ថ្ងៃ : {{ $toKhmer( formatDateSafe( officer.people.passports[0].expired_date ) ) }}</td>
                </tr> -->
                <tr>
                  <td style="padding-right: 20px;">- អង្គភាព/ទីកន្លែងបំពេញការងារ</td>
                  <td style="padding-left: 20px;">
                    {{ organizationDisplayName ? $toKhmer(organizationDisplayName) : '' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div> 
        </div>
        <div class="form-panel family-info-section w-full mx-auto" >
          <div class="w-full mb-4" >
            <div class="relative w-full mb-2 font-moul text-left" >ខ. ព័ត៌មានទំនាក់ទំនង</div>
            <!-- <div class="relative w-full my-2 font-btb-black " >ខ.១.ព័ត៌មានប្រពន្ធឬប្ដី</div> -->
            <table v-if=" officer.people != undefined && officer.people != null " class="w-full section-bullet-table parent-subsection-table contact-subsection-table" >
              <colgroup>
                <col class="parent-col-label" />
                <col class="parent-col-name" />
                <col class="parent-col-status" />
                <col class="parent-col-dob" />
              </colgroup>
              <tbody>
                <tr>
                  <td > - អាសយដ្ឋានបច្ចុប្បន្ន</td>
                  <td colspan="3" >{{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.address != null  ) ? $toKhmer( officer.people.address ) : '' ) }}</td>
                </tr> 
                <tr>
                  <td > - លេខទូរស័ព្ទ</td>
                  <td >{{ $toKhmer( officer.people.mobile_phone ) }}</td>
                </tr>     
                <tr>
                  <td>- អុីមែល (ប្រសិនបើមាន):</td>
                  <td> {{ officer.people.email }}</td>
                </tr>
                <tr>
                  <td colspan="4" class="contact-declaration-cell">
                    ខ្ញុំបាទសូមធានាអះអាងចំពោះព័ត៌មានខាងលើ​ ពិតជាត្រឹមត្រូវ។
                  </td>
                </tr>          
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-full relative h-60" >
          <div class="absolute left-0 top-12 w-80" >
            <p class="indent-4 leading-6 text-center font-moul" >បានឃើញ និងបញ្ជាក់ថា</p>
            <p class="indent-4 leading-6 text-center ">ហត្ថលេខាខាងស្ដាំ ពិតជាហត្ថលេខារបស់</p>
            <p class="indent-4 leading-6 text-center ">ឈ្មោះ  <span class="font-moul" >{{ officer.people.lastname + ' ' + officer.people.firstname }}</span> ពិតប្រាកដមែន។</p>
            <p class="text-center leading-6 whitespace-nowrap " >ថ្ងៃ <span class="signature-date-line"></span>  <span class="signature-date-line"></span> ខែ <span class="signature-date-line signature-date-line-month"></span> ឆ្នាំ <span class="signature-date-line signature-date-line-year"></span> ព.ស. {{ $toKhmer(String(today.getFullYear() + 543)) }}</p> 
            <p class="text-center leading-6 my-2 " >........., ថ្ងៃទី <span class="signature-date-line"></span> ខែ <span class="signature-date-line signature-date-line-month"></span> ឆ្នាំ {{ $toKhmer(today.getFullYear()) }}</p>
            <p class="indent-4 leading-6 text-center font-moul " >ប្រធានអង្គភាព</p>
          </div>
          <div class="absolute right-0 top-12 w-80 overflow-visible" >
            <!-- <p class="indent-4 leading-6 text-justify " ><span class="text-red-500 mr-1 " >*</span>សាមីខ្លួន</p>
            <p class="indent-4 leading-6 text-justify ">ខ្ញុំសូមធានាទទួលខុសត្រូវចំពោះមុខច្បាប់ ព័ត៌មានបានបំពេញក្នុងជីវប្រវត្តិនេះ ពិតជាត្រឹមត្រូវប្រាកដមែន។</p> -->
            <div class="signature-date-lines-wrap">
              <p class="text-center leading-6 whitespace-nowrap" >ថ្ងៃ {{ signatureDates.weekday }} {{ normalizeKhmerNumber(signatureDates.day) }} ខែ {{ normalizeKhmerMonth(signatureDates.month) }} ឆ្នាំ {{ normalizeKhmerNumber(signatureDates.year) }} ព.ស. {{ $toKhmer(String(today.getFullYear() + 543)) }}</p>
              <p class="text-center leading-6 " >{{ signatureDates.place || '.........' }}, ថ្ងៃទី  {{ normalizeKhmerNumber(signatureDates.day2) }} ខែ {{ normalizeKhmerMonth(signatureDates.month2) }} ឆ្នាំ {{ normalizeKhmerNumber(signatureDates.year2) }}</p>
              <p class="text-center leading-6 " >ហត្ថលេខា (សាមីខ្លួន)</p>
            </div>
            <!-- <p class="text-center mt-20" ><span class="font-moul" >{{ 
            // ( officer.countesy != undefined && officer.countesy != null ? officer.countesy.name + ' ' : '' ) + 
            officer.people.lastname + ' ' + officer.people.firstname }}</span></p> -->
          </div>
        </div>
      </div>
    </div>
  </div>    
</template>
<script >
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter , useRoute } from 'vue-router'
import { useNotification } from 'naive-ui'
import ocmLogoUrl from '@assets/logo.svg'
import pkachan from '@assets/pkachan.png'
import dateFormat from 'dateformat'
import { formatKhmerDateWithMonthName, formatKhmerSlashDateMonthName, normalizeKhmerNumber, normalizeKhmerMonth } from '../../utils/khmer'
  export default {
      components: {
      },
      setup(props){
          const store = useStore()
          const route = useRoute()
          const router = useRouter()
          const notify = useNotification()
          const officer = ref(null)
          const today = ref( new Date() )
        // Career form (language.vue) saves ល្អ/មធ្យម/ខ្សោយ; legacy data may use A/B/C
        const languageGrade = Object.freeze({
          A: 'ល្អ',
          B: 'មធ្យម',
          C: 'ខ្សោយ',
          ល្អ: 'ល្អ',
          មធ្យម: 'មធ្យម',
          ខ្សោយ: 'ខ្សោយ'
        })
        function formatLanguageGrade (value) {
          if (value == null || value === '') return ''
          const s = String(value).trim()
          if (!s) return ''
          const upper = s.toUpperCase()
          return languageGrade[upper] ?? languageGrade[s] ?? s
        }
          function formatDateSafe(value) {
            if (value == null || value === '') return ''
            const d = new Date(value)
            if (Number.isNaN(d.getTime())) return ''
            try {
              return dateFormat(d, 'dd-mm-yyyy')
            } catch (e) {
              return ''
            }
          }
          function resolvePrintOrganizationName (rec) {
            if (!rec) return ''
            if (rec.organization != null && rec.organization.name) {
              return String(rec.organization.name).trim()
            }
            const job = rec.job != null ? rec.job : rec.current_job
            if (job && job.organization_structure_position &&
                job.organization_structure_position.organization_structure &&
                job.organization_structure_position.organization_structure.organization) {
              const n = job.organization_structure_position.organization_structure.organization.name
              if (n) return String(n).trim()
            }
            const workplace = rec.people && rec.people.office_phone != null
              ? String(rec.people.office_phone).trim()
              : ''
            return workplace
          }
          const organizationDisplayName = computed(() => resolvePrintOrganizationName(officer.value))
          let signatureDates = reactive({
            weekday: '',
            day: '',
            month: '',
            year: '',
            place: '',
            day2: '',
            month2: '',
            year2: ''
          })
          try {
            const raw = localStorage.getItem('officerPrintSignatureDates')
            if (raw) {
              const parsed = JSON.parse(raw)
              signatureDates.weekday = parsed.weekday != null ? String(parsed.weekday) : ''
              signatureDates.day = parsed.day != null ? String(parsed.day) : ''
              signatureDates.month = parsed.month != null ? String(parsed.month) : ''
              signatureDates.year = parsed.year != null ? String(parsed.year) : ''
              signatureDates.place = parsed.place != null ? String(parsed.place) : ''
              signatureDates.day2 = parsed.day2 != null ? String(parsed.day2) : ''
              signatureDates.month2 = parsed.month2 != null ? String(parsed.month2) : ''
              signatureDates.year2 = parsed.year2 != null ? String(parsed.year2) : ''
            }
          } catch (e) {}

          if( parseInt( route.params.id ) <= 0 ){
            notify.warning({
              title: 'បោះពុម្ភប្រវត្តិរូបមន្ត្រី' ,
              content: 'សូមបញ្ជាក់លេខមន្ត្រី។'
            })
            return false
          }

          const changeTypes = ref([
              {
                  key : 0 ,
                  label: 'វេនជ្រើសរើស' 
              },
              {
                  key : 1 ,
                  label: 'អតីតភាព' 
              },
              {
                  key : 2 ,
                  label: 'ប្ដូរប្រភេទក្របខណ្ឌ' 
              },
              {
                  key : 4 ,
                  label: 'និយ័តកម្មថ្នាក់' 
              },
          ])

          const additional_officer_types = ref([
              {
                  key : 'politician' ,
                  label: 'មន្ត្រីនយោបាយ' 
              },
              {
                  key : "admin_official" ,
                  label: 'មន្ត្រីមុខងារសាធារណៈ' 
              },
              {
                  key : 'admin_unofficial' ,
                  label: 'មន្ត្រីជាប់កិច្ចសន្យា' 
              },
              {
                  key : 'contracted_officer' ,
                  label: 'មន្ត្រីផ្សេងៗ' 
              },
          ])

          const officer_type_name = ref('មន្ត្រីរាជការ')
          const additional_officer_type = ref( null )

          store.dispatch('officer/mybackground',{ id: route.params.id }).then( res => {
              officer.value = ( res.data.ok == true ) ? res.data.record : null
              additional_officer_type.value = additional_officer_types.value.find( aot => aot.key == officer.value.additional_officer_type )
              officer_type_name.value = additional_officer_type.value == null || additional_officer_type.value == undefined ? "មន្ត្រីរាជការ" : additional_officer_type.value.label
          }).catch( err => {
              console.log( err )
          })


          return {
              today ,
              officer ,
              organizationDisplayName ,
              signatureDates ,
              dateFormat ,
              formatDateSafe ,
              formatKhmerDateWithMonthName ,
              formatKhmerSlashDateMonthName ,
              normalizeKhmerNumber ,
              normalizeKhmerMonth ,
              changeTypes ,
              ocmLogoUrl ,
              pkachan ,
              additional_officer_types ,
            officer_type_name,
              languageGrade,
              formatLanguageGrade
          }
      },
      updated(){
        // setTimeout(function(){
        //   window.print()
        //   window.close()
        //   clearTimeout()
        // },500)
      }
  }
</script>
<style scoped >
  .birth-information * {
    font-size: 0.75rem ;
  }
  /* Override body * font - content uses Siem Reap, titles keep their font */
  .birth-information .body,
  .birth-information .body * {
    font-family: "sr", sans-serif !important;
  }
  .birth-information .body .font-moul {
    font-family: "moul", sans-serif !important;
  }
  .birth-information .body .font-tacteing {
    font-family: tacteing, sans-serif !important;
  }
  .birth-information .body .font-btb-black {
    font-family: "btb-black", sans-serif !important;
  }
  table tr td , table tr th  {
    padding: 5px 0px ; 
  }
  table.inside tr td , table.inside tr th  {
    padding: 10px 5px ; 
  }
  table.inside {
    border-collapse: collapse;
  }
  table.inside th,
  table.inside td {
    border: 1px solid #000000;
  }
  table.inside td.border-b,
  table.inside th.border-b {
    border: 1px solid #000000;
  }
  .signature-date-line {
    display: inline-block;
    min-width: 3.5em;
    border-bottom: 1px dotted #333;
    vertical-align: bottom;
  }
  .signature-date-line-month { min-width: 5em; }
  .signature-date-line-year { min-width: 3.5em; }
  .section-bullet-table td:first-child {
    padding-left: 16px;
    white-space: nowrap;
  }
  /* ក. ព័ត៌មានផ្ទាល់ខ្លួន — tighter label / value gap */
  .personal-info-table {
    table-layout: fixed;
    width: 100%;
  }
  .personal-info-table col.pi-col-label { width: 19%; }
  .personal-info-table col.pi-col-main { width: 36%; }
  .personal-info-table col.pi-col-right { width: 22%; }
  .personal-info-table col.pi-col-right2 { width: 23%; }
  .personal-info-table td:first-child,
  .contact-subsection-table td:first-child {
    padding-left: 8px;
  }
  .contact-subsection-table td.contact-declaration-cell {
    padding-left: 8px;
    padding-top: 3px;
    vertical-align: top;
    text-align: left;
  }
  /* .section-bullet-table td:first-child::before {
    content: " ";
  } */
  /* ខ. ព័ត៌មានគ្រួសារ / គ. ព័ត៌មានទំនាក់ទំនង — tighter vertical rhythm */
  .family-info-section table tr td,
  .family-info-section table tr th,
  .contact-info-section table tr td,
  .contact-info-section table tr th {
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .gap-6 {
    gap: 3rem;
  }
  /* ខ.៣ — father / mother tables share column grid so rows align */
  .parent-subsection-table {
    table-layout: fixed;
    width: 100%;
  }
  /* Tight name col → status starts sooner; DOB col absorbs width for long dates */
  .parent-subsection-table col.parent-col-label { width: 19%; }
  .parent-subsection-table col.parent-col-name { width: 12%; }
  .parent-subsection-table col.parent-col-status { width: 21%; }
  .parent-subsection-table col.parent-col-dob { width: 48%; }
  .parent-subsection-table td.parent-td-name {
    min-width: 0;
    word-break: break-word;
  }
  /* Keep full date (ឆ្នាំ + year) on one line — same as checkbox row */
  .parent-subsection-table td.parent-td-dob {
    min-width: 0;
    white-space: nowrap;
  }
  .parent-subsection-table td.parent-td-status {
    vertical-align: middle;
  }
  .parent-subsection-table .parent-td-status-inner {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 3rem;
    min-width: 0;
  }
</style>