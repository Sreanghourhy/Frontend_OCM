<template >
  <div class="birth-information relative flex flex-wrap mx-auto " :style=" 'width: 21cm;' " >
    <div v-if="officer != undefined && officer != null " class="p-2 flex flex-wrap text-left " >
      <div class="heading w-full mb-4 relative flex flex-wrap " >
        <div class="font-moul w-full leading-6 text-center" >ព្រះរាជាណាចក្រកម្ពុជា</div>
        <div class="font-moul w-full leading-6 text-center" >ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        <div class="font-tacteing w-full  text-center h-10 -mt-2 " style="font-size: 2rem; " >3</div>
        <div class="organization w-1/2 relative my-2 pt-6 text-left -mt-2" >
          <div class="font-moul w-full leading-6" >ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
          <div v-if="officer.organization != undefined && officer.organization.name != 'ទីស្ដីការគណៈរដ្ឋមន្ត្រី' " class="font-moul w-full leading-6" >{{ officer.organization.name }}</div>
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
            <table v-if=" officer.people != undefined && officer.people != null " class="w-full section-bullet-table" >
              <tbody>
                <tr>
                  <td > - ឈ្មោះជាភាសាខ្មែរ</td>
                  <td >{{ 'គោត្តនាម : ' + officer.people.lastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " នាមខ្លួន : " + officer.people.firstname }}</td>
                  <td colspan="2" >ភេទ : {{ parseInt( officer.people.gender ) == 1 ? 'ប្រុស' : 'ស្រី' }}</td>
                </tr>
                <tr>
                  <td > - ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                  <td colspan="3" >{{ 'អក្សរពុម្ពឡាតាំង : ' + officer.people.enlastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " អក្សរពុម្ពឡាតាំង : " +  officer.people.enfirstname }}</td>
                  <!-- <td colspan="3" >{{ 'គោត្តនាម : ' + officer.people.enlastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " នាមខ្លួន : " +  officer.people.enfirstname }}</td> -->
                </tr>
                <tr>
                  <td > - ថ្ងៃខែឆ្នាំកំណើត</td>
                  <td>{{ ( ( officer.people.dob != null && officer.people.dob.length > 0 ) ? $toKhmer( formatKhmerDateWithMonthName( officer.people.dob ) ) : '' ) }}</td>
                  <td class="">ជនជាតិ : {{ officer.people.national }}</td>
                  <td class="">សញ្ជាតិ : {{ officer.people.nationality }}</td>
                </tr>
                <tr>
                  <td > - ទីកន្លែងកំណើត</td>
                  <td colspan="3" >ភូមិ {{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.address != null  ) ? $toKhmer( officer.people.address ) : '' ) }}</td>
                </tr>
                <tr>
                  <td > - អាសយដ្ឋានបច្ចុប្បន្ន</td>
                  <td colspan="3" >{{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.address != null  ) ? $toKhmer( officer.people.address ) : '' ) }}</td>
                </tr>
                <tr>
                  <td > - អាសយដ្ឋានអចិន្ត្រៃយ៍</td>
                  <td colspan="3" >{{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.current_address != null  ) ? $toKhmer( officer.people.current_address ) : '' ) }}</td>
                </tr>
                <tr>
                  <td > - លេខទូរស័ព្ទ</td>
                  <td >{{ $toKhmer( officer.people.mobile_phone ) }}</td>
                  <td class="" colspan="2" >អ៉ីមែល: {{ officer.people.email }}</td>
                </tr>
                <tr>
                  <td > - លេខអត្ត.សញ្ជាតិខ្មែរ</td>
                  <td class="" >{{ $toKhmer( officer.people.nid ) }}</td>
                </tr>
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
                  <td > - កាយសម្បទា</td>
                  <td class="flex " >
                      <div class="w-24 flex items-center leading-6 " >
                        <svg v-if="parseInt( officer.people.body_condition ) == 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg v-if="parseInt( officer.people.body_condition ) != 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                        គ្រប់គ្រាន់
                      </div>
                      <div class="w-24 flex items-center leading-6 " >
                        <svg v-if="parseInt( officer.people.body_condition ) == 1 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg v-if="parseInt( officer.people.body_condition ) != 1 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                        ពិការភាព
                      </div>
                      <!-- <n-space item-style="display: flex;" align="center">
                          <n-space>
                              <n-radio :checked=" parseInt( officer.people.body_condition ) == 0 ? true : false " >គ្រប់គ្រាន់</n-radio>
                              <n-radio :checked=" parseInt( officer.people.body_condition ) == 1 ? true : false " >ពិការភាព</n-radio>
                          </n-space>
                      </n-space> -->
                  </td>
                  <td colspan="2" class="">ប្រភេទពិការភាព : {{ parseInt( officer.people.body_condition ) == 1 ? officer.people.body_condition_desp : '' }}</td>
                </tr>
              </tbody>
            </table>
          </div> 
        </div>
        <div class="form-panel     w-full mx-auto " >
          <div class="w-full " >
            <div class="relative w-full mb-2 flex items-center gap-6" >
              <div class="shrink-0 font-moul">ខ. ព័ត៌មានគ្រួសារ</div>
              <div class="flex items-center font-normal">
                <div class="w-24 flex items-center leading-6 " >
                  <svg v-if="officer.people.marry_status == 'single'" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg v-if="officer.people.marry_status != 'single'" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                  នៅលីវ
                </div>
                <div class="w-40 flex items-center leading-6 " >
                  <svg v-if="officer.people.marry_status == 'married'" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg v-if="officer.people.marry_status != 'married'" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                  រៀបអាពាហ៍ពិពាហ៍
                </div>
                <div class="w-40 flex items-center leading-6 " >
                  <svg v-if="officer.people.marry_status == 'divorced'" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg v-if="officer.people.marry_status != 'divorced'" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                  មេម៉ាយ / ពោះម៉ាយ
                </div>
                <!-- <n-space item-style="display: flex;" align="center">
                  <n-space>
                    <n-radio :checked=" officer.people.marry_status == 'single' ? true : false " >នៅលីវ</n-radio>
                    <n-radio :checked=" officer.people.marry_status == 'married' ? true : false " >រៀបការរួច</n-radio>
                    <n-radio :checked=" officer.people.marry_status == 'divorced' ? true : false " >ពោះមាយ / មេមាយ</n-radio>
                  </n-space>
                </n-space> -->
              </div>
            </div>
            <table class="w-full" >
              <tbody>
                <tr >
                  <td>
                    <div class="relative w-full my-2 font-btb-black " >ខ.១.ព័ត៌មានប្រពន្ធឬប្ដី</div>
                    <table class="w-full section-bullet-table" >
                      <tbody>
                        <!-- <tr >
                          <td >លេខសំបុត្រអាពាហ៍ពិពាហ៍</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? $toKhmer( officer.people.wedding_certificates[0].wedding_number ) : '' }}</td>
                          <td >លេខសៀវភៅអាពាហ៍ពិពាហ៍</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? $toKhmer( officer.people.wedding_certificates[0].book_number ) : '' }}</td>
                        </tr> -->
                          <!-- <td class="w-48">ខ.១.ព័ត៌មានប្រពន្ធឬប្ដី</td> -->
                        <tr >
                          <td class="w-48 "> - ឈ្មោះប្រពន្ធឬប្តី</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? officer.people.wedding_certificates[0].spouse_lastname + ' ' + officer.people.wedding_certificates[0].spouse_firstname : '' }}</td>
                          <td>
                              <div class="w-40 flex items-center leading-6 " >
                                <svg v-if="officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].spouse_death == 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <svg v-if="officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].spouse_death != 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                                <svg v-if="officer.people.wedding_certificates == undefined || officer.people.wedding_certificates == null " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                រស់
                              </div>
                          </td>
                          <td>
                              <div class="w-40 flex items-center leading-6 " >
                                <svg v-if="officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].spouse_death == 1" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <svg v-if="officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].spouse_death != 1" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                                <svg v-if="officer.people.wedding_certificates == undefined || officer.people.wedding_certificates == null " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                ស្លាប់
                              </div>
                          </td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? officer.people.wedding_certificates[0].spouse_enlastname + ' ' + officer.people.wedding_certificates[0].spouse_enfirstname : '' }}</td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - ថ្ងៃខែឆ្នាំកំណើត</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? $toKhmer( formatKhmerDateWithMonthName( officer.people.wedding_certificates[0].spouse_dob ) ) : '' }}</td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - លេខអត្ត.សញ្ជាតិខ្មែរ</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? $toKhmer( officer.people.wedding_certificates[0].spouse_nid ) : '' }}</td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - ទីកន្លែងកំណើត</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? officer.people.wedding_certificates[0].spouse_pob : '' }}</td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - មុខរបរបច្ចុប្បន្ន</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? officer.people.wedding_certificates[0].spouse_profession : '' }}</td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - ឈ្មោះអង្គភាព</td>
                          <td>{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? officer.people.wedding_certificates[0].spouse_profession_organization : '' }}</td>
                        </tr>
                        <tr >
                          <td class="w-48 "> - អាសយដ្ឋានបច្ចុប្បន្ន</td>
                          <td colspan="3" >{{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 ? officer.people.wedding_certificates[0].spouse_address : '' }}</td>
                        </tr>                        
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr >
                  <td>
                    <div class="relative w-full mt-2 font-btb-black " >ខ.២.ព័ត៌មានកូន</div>
                    <table class="w-full section-bullet-table" >
                      <tbody>
                        <tr >
                          <td class="w-48" > - មានកូនចំនួន {{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].birth_certificates != undefined && officer.people.wedding_certificates[0].birth_certificates != null && officer.people.wedding_certificates[0].birth_certificates.length > 0 ? $toKhmer( officer.people.wedding_certificates[0].birth_certificates.length ) : '' }} នាក់</td>
                          <td class="w-48" >  ស្រីចំនួន {{ officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].birth_certificates != undefined && officer.people.wedding_certificates[0].birth_certificates != null && officer.people.wedding_certificates[0].birth_certificates.length > 0 ? $toKhmer( officer.people.wedding_certificates[0].birth_certificates.filter( ( b ) => b.gender != 'male' ).length ) : '' }} នាក់</td>
                        </tr>
                        <tr v-if="officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].birth_certificates != undefined && officer.people.wedding_certificates[0].birth_certificates != null && officer.people.wedding_certificates[0].birth_certificates.length > 0" >
                          <td colspan="4" >
                            <div v-for="(o,i) in officer.people.wedding_certificates[0].birth_certificates"  :key="i"
                              class="w-full " >
                              <div class="w-full flex py-1 " >
                                <div class="w-6/12" > - គោត្តនាម និងនាមខ្លួន : {{ o.lastname + ' ' + o.firstname }}</div>
                                <div class="w-3/12" >ភេទ : {{ o.gender == "male" ? 'ប្រុស' : 'ស្រី' }}</div>
                                <div class="w-3/12" >ថ្ងៃខែឆ្នាំកំណើត : {{ $toKhmer( formatKhmerDateWithMonthName( o.dob ) ) }}</div>
                              </div>
                              <div class="w-full flex py-1 " >
                                <div class="w-3/12" > - មុខរបរ: {{ o.profession }}</div>
                                <div class="w-3/12" >ក្នុងបន្ទុក ស្ថានភាព : </div>
                              </div>
                            </div>
                            <!-- <table class="w-full" >
                              <thead>
                                <tr>
                                  <th class="text-left w-24" >ល.រ</th>
                                  <th class="text-left">គោត្តនាមនិងនាមខ្លួន</th>
                                  <th class="text-left">ភេទ</th>
                                  <th class="text-left">ថ្ងៃខែឆ្នាំកំណើត</th>
                                  <th class="text-left">មុខរបរ</th>
                                </tr>
                              </thead>
                              <tbody v-if="officer.people.wedding_certificates != undefined && officer.people.wedding_certificates.length > 0 && officer.people.wedding_certificates[0].birth_certificates != undefined && officer.people.wedding_certificates[0].birth_certificates != null && officer.people.wedding_certificates[0].birth_certificates.length > 0" >
                                <tr v-for="(o,i) in officer.people.wedding_certificates[0].birth_certificates"  :key="i">
                                  <td class="w-24 " >{{ $toKhmer( i + 1 ) }}. </td>
                                  <td>{{ o.lastname + ' ' + o.firstname }}</td>
                                  <td>{{ o.gender == "male" ? 'ប្រុស' : 'ស្រី' }}</td>
                                  <td>{{ $toKhmer( formatKhmerDateWithMonthName( o.dob ) ) }}</td>
                                  <td>{{ o.profession }}</td>
                                </tr>
                              </tbody>
                            </table> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-2 font-btb-black " >ខ.៣.ព័ត៌មានឪពុកនិងម្ដាយបង្កើត</div>
                    <table class="w-full section-bullet-table" >
                      <tbody>
                        <tr>
                          <td > - ឪពុកឈ្មោះ :</td>
                          <td class="w-24" >{{ officer.people.father_lastname }} {{ officer.people.father_firstname }}</td>
                          <td class="flex items-center" >
                              <div class="w-40 flex items-center leading-6 " >
                                <svg v-if="officer.people.father_death != undefined && officer.people.father_death == 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <svg v-if="officer.people.father_death != undefined && officer.people.father_death != 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                                <svg v-if="officer.people.father_death != undefined && officer.people.father_death == null " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                រស់
                              </div>
                              <div class="w-40 flex items-center leading-6 " >
                                <svg v-if="officer.people.father_death != undefined && officer.people.father_death == 1" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <svg v-if="officer.people.father_death != undefined && officer.people.father_death != 1" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                                <svg v-if="officer.people.father_death != undefined && officer.people.father_death == null " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                ស្លាប់
                              </div>
                          </td>
                          <td>{{ officer.people.father_dob != undefined && officer.people.father_dob.length > 0 ? $toKhmer( formatKhmerDateWithMonthName( officer.people.father_dob, true ) ) : '' }}</td>
                        </tr>
                        <tr>
                          <td> - ទីកន្លែងកំណើត​ :</td>
                          <td colspan="3">{{ officer.people.father_pob }}</td>
                        </tr>
                        <tr>
                          <td> - មុខរបរ :</td>
                          <td colspan="3">{{ officer.people.father_profession }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <div class="relative w-full pb-2 font-btb-black " >ព័ត៌មានឪពុក</div> -->
                    <!-- <table class="w-full" >
                      <tbody>
                        <tr>
                          <td >ឪពុកឈ្មោះ</td>
                          <td >{{ officer.people.father_lastname }}</td>
                          <td>{{ officer.people.father_firstname }}</td>
                        </tr>
                        <tr>
                          <td >ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                          <td >{{ officer.people.father_enlastname }}</td>
                          <td>{{ officer.people.father_enfirstname }}</td>
                        </tr>
                        <tr>
                          <td >ថ្ងៃខែឆ្នាំកំណើត</td>
                          <td>{{ officer.people.father_dob != undefined && officer.people.father_dob.length > 0 ? $toKhmer( dateFormat( new Date( officer.people.father_dob ) , 'dd-mm-yyyy' ) ) : '' }}</td>
                          <td class="">ជនជាតិ : {{  officer.people.father_national }}</td>
                          <td class="">សញ្ជាតិ : {{ officer.people.father_nationality }}</td>
                        </tr>
                        <tr>
                          <td >ទីកន្លែងកំណើត</td>
                          <td colspan="3" >{{ officer.people.father_pob }}</td>
                        </tr>
                        <tr>
                          <td >អាសយដ្ឋានបច្ចុប្បន្ន</td>
                          <td colspan="3" >{{ officer.people.father_address }}</td>
                        </tr>
                        <tr>
                          <td >មុខរបរបច្ចុប្បន្ន</td>
                          <td colspan="3" >{{ officer.people.father_profession }}</td>
                        </tr>
                      </tbody>
                    </table> -->
                    <!-- <div class="relative w-full mt-2 pb-2 font-btb-black " >ព័ត៌មានម្ដាយ</div> -->
                    <table class="w-full section-bullet-table" >
                      <tbody>
                        <tr>
                          <td> - ម្ដាយឈ្មោះ : </td>
                          <td class="w-24">{{ officer.people.mother_lastname }} {{ officer.people.mother_firstname }}</td>
                          <td class="flex items-center" >
                              <div class="w-40 flex items-center leading-6 " >
                                <svg v-if="officer.people.mother_death != undefined && officer.people.mother_death == 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <svg v-if="officer.people.mother_death != undefined && officer.people.mother_death != 0 " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                                <svg v-if="officer.people.mother_death != undefined && officer.people.mother_death == null " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                រស់
                              </div>
                              <div class="w-40 flex items-center leading-6 " >
                                <svg v-if="officer.people.mother_death != undefined && officer.people.mother_death == 1" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <svg v-if="officer.people.mother_death != undefined && officer.people.mother_death != 1" class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="black" stroke-width="1.5"/></svg>
                                <svg v-if="officer.people.mother_death != undefined && officer.people.mother_death == null " class="w-3 h-3 mr-1 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="black"/><path d="M6 12.5L10 16.5L18 8.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                ស្លាប់
                              </div>
                          </td>
                          <td>{{ officer.people.mother_dob != undefined && officer.people.mother_dob.length > 0 ? $toKhmer( formatKhmerDateWithMonthName( officer.people.mother_dob, true ) ) : '' }}</td>
                        </tr>
                        <tr>
                          <td> - ទីកន្លែងកំណើត​ :</td>
                          <td colspan="3">{{ officer.people.mother_pob }}</td>
                        </tr>
                        <tr>
                          <td> - មុខរបរ :</td>
                          <td colspan="3">{{ officer.people.mother_profession }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form-panel     w-full mx-auto " >
          <div class="w-full " >
            <div class="relative w-full my-2 font-moul " >គ. ព័ត៌មានទំនាក់ទំនងក្នុងករណីមានអាសន្ន</div>
            <table class="w-full section-bullet-table" >
              <tbody>
                <tr>
                  <td > -  ឈ្មោះជាភាសាខ្មែរ : </td>
                  <td >គោត្តនាម : {{ officer.people.emergency_lastname }}</td>
                  <td>នាមខ្លួន ​: {{ officer.people.emergency_firstname }}</td>
                  <td >ភេទ : {{ officer.people.emergency_gender == 0 ? 'ស្រី' : 'ប្រុស' }}</td>
                </tr>
                <tr>
                  <td > -ទំនាក់ទំនងត្រូវជា : </td>
                  <td >{{ officer.people.emergency_relationship }}</td>
                  <td>មុខរបរ : </td>
                  <td >{{ officer.people.emergency_profession }}</td>
                </tr>
                <tr>
                  <td > - អាសយដ្ឋានបច្ចុប្បន្ន : </td>
                  <td colspan="3" >{{ officer.people.emergency_address }}</td>
                </tr>
                <tr>
                  <td > - លេខទូរស័ព្ទ : </td>
                  <td >{{ $toKhmer( officer.people.emergency_phone ) }}</td>
                  <td >អ៉ីមែល : </td>
                  <td >{{ officer.people.emergency_email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form-panel     w-full mx-auto " >
          <div class="w-full " >
            <div class="relative w-full my-2 font-moul " >ឃ. កំរិតវប្បធម៌ទូទៅ ការបណ្ដុះបណ្ដាលមុខវិជ្ជាជីវៈ និងការបណ្ដុះបណ្ដាលបន្ត</div>
            <table class="w-full" >
              <tbody>
                <tr>
                  <td>
                    <table class="inside w-full border border-gray-100 " >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th  class="text-center">វគ្គ<br/>ឬកម្រិតសិក្សា</th>
                          <th  class="text-center">គ្រឹះស្ថានសិក្សា<br/>បណ្ដុះបណ្ដាល</th>
                          <th class="text-center">រាជធានី<br/>ខេត្តឬប្រទេស</th>
                          <th class="text-center" >សញ្ញាបត្រ</th>
                          <th class="text-center">ជំនាញ</th>
                          <th class="text-center w-20" >ថ្ងៃខែឆ្នាំ<br/>ចូលសិក្សា</th>
                          <th class="text-center w-20">ថ្ងៃខែឆ្នាំ<br/>បញ្ចប់សិក្សា</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td colspan="7" class="border-b border-gray-100 font-btb-black" >១. កម្រិតវប្បធម៌ទូទៅ (សូមបំពេញកម្រិតចុងក្រោយ)</td>
                          </tr>
                          <tr v-for="(certificate , index) in officer.people.certificates.first" :key="index" >
                            <td class="border-b border-gray-100 text-center" >{{ certificate.group != undefined && certificate.group != null ? certificate.group.education_level : '' }}</td>
                            <td class="border-b border-gray-100 text-center"  >{{ certificate.place_name }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.location }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.group != undefined && certificate.group != null ? ( certificate.certificate_group_id == 3 ? certificate.certificate_note : certificate.group.name ) : '' }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.field_name }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( certificate.start ) ) }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( certificate.end ) ) }}</td>
                          </tr>
                          <tr>
                            <td colspan="7" class="border-b border-gray-100 font-btb-black" >២. កម្រិតបណ្ដុះបណ្ដាលវិជ្ជាជីវៈមូលដ្ឋាន និងក្រោយមូលដ្ឋាន (សូមបំពេញតាមលំដាប់ថ្មីទៅចាស់)</td>
                          </tr>
                          <tr v-for="(certificate , index) in officer.people.certificates.middle" :key="index" >
                            <td class="border-b border-gray-100 text-center" >{{ certificate.group != undefined && certificate.group != null ? certificate.group.education_level : '' }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.place_name }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.location }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.group != undefined && certificate.group != null ? ( certificate.certificate_group_id == 8 ? certificate.certificate_note : certificate.group.name ) : '' }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.field_name }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( certificate.start ) ) }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( certificate.end ) ) }}</td>
                          </tr>
                          <tr>
                            <td colspan="7" class="border-b border-gray-100 font-btb-black" >៣. វគ្គបណ្ដុះបណ្ដាលផ្សេងៗ (សូមបំពេញវគ្គសក្សាថ្មី សំខាន់ៗ និងចាំបាច់)</td>
                          </tr>
                          <tr v-for="(certificate , index) in officer.people.certificates.others" :key="index" >
                            <td class="border-b border-gray-100 text-center" >{{ certificate.place_name }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.location }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.field_name }}</td>
                            <td class="border-b border-gray-100 text-center" >{{ certificate.group != undefined && certificate.group != null ? certificate.group.name : '' }}</td>
                          </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Language -->
        <div class="form-panel     w-full mx-auto " >
          <div class="w-full " >
            <div class="relative w-full my-4 font-moul " >ង. ភាសាបរទេស (សូមបំពេញនូវកម្រិតចំណេះដឹងភាសាបរទេស ពីល្អ មធ្យម ខ្សោយ)</div>
            <table class="inside w-full" >
              <thead>
                <tr class="bg-gray-300 " >
                  <th class="text-center" >ភាសាបរទេស</th>
                  <th class="text-center" >ការអាន</th>
                  <th class="text-center">ការសន្ទនា</th>
                  <th class="text-center" >ការសសេរ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(language , index) in officer.people.languages" :key="index" >
                  <td class="border-b border-gray-100 text-center" >{{ language.name }}</td>
                  <td class="border-b border-gray-100 text-center" >{{ languageGrade[language.reading.toUpperCase()] }}</td>
                  <td class="border-b border-gray-100 text-center" >{{ languageGrade[language.speaking.toUpperCase()] }}</td>
                  <td class="border-b border-gray-100 text-center" >{{ languageGrade[language.writing.toUpperCase()] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Working background -->
        <div class="form-panel     w-full mx-auto " >
          <div class="w-full " >
            <div class="relative w-full mt-4 mb-2 font-moul " >ច- ប្រវត្តិការងារ</div>
            <table class="w-full" >  
              <tbody>
                <tr>
                  <td>
                    <table class="w-full " >
                      <tbody>
                        <tr>
                          <td class="" >- ថ្ងៃខែឆ្នាំចូលបម្រើក្របខ័ណ្ឌរដ្ឋ : </td>
                          <td class="" >{{ officer.unofficial_date != undefined && officer.unofficial_date.length > 0 ? $toKhmer( formatKhmerSlashDateMonthName( officer.unofficial_date ) ) : '' }}</td>
                          <td class="" >ថ្ងៃខែឆ្នាំតាំងស៊ប់ក្នុងក្របខ័ណ្ឌរដ្ឋ : </td>
                          <td class="" >{{ officer.official_date != undefined && officer.official_date.length > 0 ? $toKhmer( formatKhmerSlashDateMonthName( officer.official_date ) ) : '' }}</td>
                        </tr>
                        <tr>
                          <td class="" >- ឈ្មោះក្របខ័ណ្ឌ : </td>
                          <td class="" >{{ officer.officer_type }}</td>
                          <td class="" >ក្របខ័ណ្ឌ ឋានន្តរស័ក្តិ និងថ្នាក់បច្ចុប្បន្ន : </td>
                          <td class="" >{{ officer.salary_rank }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                    <td>
                        <div class="relative w-full my-2 font-moul " >ច.១.មុខតំណែង (សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)</div>
                        <div class="relative w-full mb-2 font-moul " >ច.១.១.ក្នុងវិស័យសាធារណៈ</div>
                        <table class="inside w-full border border-gray-100 " >
                            <thead>
                                <tr class="bg-gray-300 " >
                                    <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>ចូលបម្រើការងារ</th>
                                    <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>បញ្ចប់ការងារ</th>
                                    <th class="text-center">ក្រសួង-ស្ថាប័ន</th>
                                    <th class="text-center" >នាយកដ្ឋាន-អង្គភាព</th>
                                    <th class="text-center" >មុខតំណែង</th>
                                    <th class="text-center" >ជំនាញ/បច្ចេកទេស<br/>ក្នុងមុខតំណេង</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(job,index) in officer.job_backgrounds.filter( (jb) => jb.sector == 0 )" :key="index" >
                                    <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( job.start ) ) }}</td>
                                    <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( job.end ) ) }}</td>
                                    <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.organization ) }}</td>
                                    <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.sub_organization ) }}</td>
                                    <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.position ) }}</td>
                                    <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.skill_of_position ) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-4 font-moul " >ច.១.២.ក្នុងវិស័យឯកជន</div>
                    <table class="inside w-full border border-gray-100 " >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>ចូលបម្រើការងារ</th>
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>បញ្ចប់ការងារ</th>
                          <th class="text-center" >គ្រឹះស្ថាន-អង្គភាព</th>
                          <th class="text-center">តួនាទី</th>
                          <th class="text-center" >ជំនាញ/បច្ចេកទេស</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(job,index) in officer.job_backgrounds.filter( (jb) => jb.sector == 1 )" :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( job.start ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( job.end ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.organization ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.position ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( job.skill_of_position ) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-4 font-moul " >ច.២.ការដំឡើងឋានន្តរស័ក្តិ និងថ្នាក់តាមវេនជ្រើសរើស អតីតភាព ប្ដូរប្រភេទក្របខ័ណ្ឌ និងនិយ័តកម្មថ្នាក់ (សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)</div>
                    <table class="inside w-full border border-gray-100 " >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>សុពលភាព</th>
                          <th class="text-center" >ក្រសួង-ស្ថាប័ន</th>
                          <th class="text-center" >នាយកដ្ឋាន-អង្គភាព</th>
                          <th class="text-center" >ការិយាល័យ-ផ្នែក</th>
                          <th class="text-center">ក្របខ័ណ្ឌ ឋានន្តរ<br/>ស័ក្ដិ <br/>និងថ្នាក់ចាស់</th>
                          <th class="text-center">ក្របខ័ណ្ឌ ឋានន្តរ<br/>ស័ក្ដិ <br/>និងថ្នាក់ថ្មី</th>
                          <th class="text-center" >ប្រភេទ<br/>ដំឡើង/ប្ដូរ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(rank , index) in officer.ranking_by_workings " :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( rank.date ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.organization }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.sub_organization }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.sub_sub_organization }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.previous_rank != null ? rank.previous_rank.name : '' }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.rank != null ? rank.rank.name : '' }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ changeTypes.find( (t) => t.key == rank.changing_type ) != null ? changeTypes.find( (t) => t.key == rank.changing_type ).label : '' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-4 font-moul " >ច.៣.ការដំឡើងឋានន្តរស័ក្តិ និងថ្នាក់តាមសញ្ញាបត្រ(សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)</div>
                    <table class="inside w-full border border-gray-100 " >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>សុពលភាព</th>
                          <th class="text-center" >គ្រឹះស្ថានបណ្ដុះបណ្ដាល</th>
                          <th class="text-center" >ទីកន្លែងសិក្សា</th>
                          <th class="text-center" >សញ្ញាបត្របានទទួល</th>
                          <th class="text-center">ក្របខ័ណ្ឌ ឋានន្តរ<br/>ស័ក្ដិ <br/>និងថ្នាក់ចាស់</th>
                          <th class="text-center">ក្របខ័ណ្ឌ ឋានន្តរ<br/>ស័ក្ដិ <br/>និងថ្នាក់ថ្មី</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(rank , index) in officer.ranking_by_certificates " :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( rank.date ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.organization }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.location }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.certificate }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.previous_rank != null ? rank.previous_rank.name : '' }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ rank.rank != null ? rank.rank.name : '' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-4 font-moul " >ច.៤.ស្ថានភាពស្ថិតនៅក្រៅក្របខ័ណ្ឌដើម / ទំនេរពីមុខងារ (សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)</div>
                    <table class="inside w-full border border-gray-100 " >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>ចាប់ផ្ដើម</th>
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>បញ្ចប់</th>
                          <th class="text-center" >ក្រសួង/ស្ថាប័ន</th>
                          <th class="text-center">មុខតំណែង</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(work , index) in officer.pending_works.filter( (w) => w.type == 0 ) " :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( work.start ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( work.end ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( work.organization ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( work.position ) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-4 font-moul " >ច.៥.ស្ថានភាពស្ថិតនៅក្នុងភាពទំនេរគ្មានបៀវត្ស (សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)</div>
                    <table class="inside w-full border border-gray-100 " >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>ចាប់ផ្ដើម</th>
                          <th class="text-center" >ថ្ងៃខែឆ្នាំ<br/>បញ្ចប់</th>
                          <th class="text-center" >ក្រសួង/ស្ថាប័ន</th>
                          <th class="text-center">ចំនួន(ខែ/ឆ្នាំ)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(work , index) in officer.pending_works.filter( (w) => w.type == 1 ) " :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( work.start ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( work.end ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( work.organization ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ formatKhmerMonthDuration( work.total_months ) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Reward & Penalty -->
        <div class="form-panel     w-full mx-auto mt-4" >
          <div class="w-full " >
            <div class="relative w-full pb-2 font-moul " >ឆ. ការលើកសរសើរ ឬដាក់វិន័យ</div>
            <table class="w-full"  >  
              <tbody>
                <tr>
                  <td>
                    <div class="relative w-full mb-2 font-moul " >ឆ.១.ការលើកសរសើរ (គ្រឿងឥស្សរិយយស មេដាយ បណ្ណសរសើរ)</div>
                    <table class="inside w-full border border-gray-100 "  >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >លេខលិខិត</th>
                          <th class="text-center" >កាលបរិច្ឆេទ</th>
                          <th class="text-center" >ក្រសួង/ស្ថាប័ន/រាជធានី/ខេត្ត<br/>(ស្នើសុំ)</th>
                          <th class="text-center">បរិយាយ</th>
                          <th class="text-center">ប្រភេទ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(medal , index) in officer.medal_histories " :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( medal.fid ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( medal.date ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ medal.organization }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ medal.desp }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ medal.type }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="relative w-full my-2 font-moul " >ឆ.២.ការដាក់វិន័យ</div>
                    <table class="inside w-full border border-gray-100 "  >
                      <thead>
                        <tr class="bg-gray-300 " >
                          <th class="text-center" >លេខលិខិត</th>
                          <th class="text-center" >កាលបរិច្ឆេទ</th>
                          <th class="text-center" >ក្រសួង/ស្ថាប័ន/រាជធានី/ខេត្ត</th>
                          <th class="text-center">បរិយាយ</th>
                          <th class="text-center">ប្រភេទ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(penalty , index) in officer.panelty_histories " :key="index" >
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( penalty.fid ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ $toKhmer( formatKhmerSlashDateMonthName( penalty.date ) ) }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ penalty.organization }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ penalty.desp }}</td>
                          <td class="border-b border-gray-100 text-center" >{{ penalty.type }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> 
        </div>
        <!-- <div class="form-panel     w-full mx-auto mt-4 mb-8" >
          <div class="w-full " >
            <div class="relative w-full pb-2 font-moul " >ឈ. ការបញ្ជាក់អំពីស្ថានភាព</div>
            <table class="w-full"  >  
              <tbody>
                <tr>
                  <td>
                      <div class="flex items-center leading-6 " >
                      <svg v-if="officer.additional_officer_type == 'politician'" class="w-6 h-6 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z" fill="currentColor"></path><path d="M14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z" fill="currentColor"></path></svg>
                      <svg v-if="officer.additional_officer_type != 'politician'" class="w-6 h-6 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
                      មន្ត្រីនយោបាយ
                      </div>
                  </td>
                  <td>
                      <div class="flex items-center leading-6 " >
                      <svg v-if="officer.additional_officer_type == 'admin_official'" class="w-6 h-6 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z" fill="currentColor"></path><path d="M14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z" fill="currentColor"></path></svg>
                      <svg v-if="officer.additional_officer_type != 'admin_official'" class="w-6 h-6 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
                      មន្ត្រីមុខងារសាធារណៈ
                      </div>
                      </td>
                  <td>
                      <div class="flex items-center leading-6 " >
                      <svg v-if="officer.additional_officer_type == 'admin_unofficial'" class="w-6 h-6 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z" fill="currentColor"></path><path d="M14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z" fill="currentColor"></path></svg>
                      <svg v-if="officer.additional_officer_type != 'admin_unofficial'" class="w-6 h-6 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
                      មន្ត្រីជាប់កិច្ចសន្យា
                      </div>
                      </td>
                  <td>
                      <div class="flex items-center leading-6 " >
                      <svg v-if="officer.additional_officer_type == 'contracted_officer'" class="w-6 h-6 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 26V6h20v20z" fill="currentColor"></path><path d="M14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z" fill="currentColor"></path></svg>
                      <svg v-if="officer.additional_officer_type != 'contracted_officer'" class="w-6 h-6 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect></svg>
                      មន្ត្រីផ្អែកលើកិច្ចព្រមព្រៀងការងារ
                      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> 
        </div> -->
        <div class="w-full relative h-60" >
          <div class="py-2 " >ខ្ញុំសូមធានាទទួលខុសត្រូវចំពោះមុខច្បាប់ ព័ត៌មានបានបំពេញក្នុងជីវប្រវត្តិនេះ ពិតជាត្រឹមត្រូវប្រាកដមែន។</div>
          <div class="absolute left-0 top-12 w-80" >
            <p class="indent-4 leading-6 text-center font-moul" >បានឃើញ និងបញ្ជាក់ថា</p>
            <p class="indent-4 leading-6 text-center ">ហត្ថលេខាខាងស្ដាំ ពិតជាហត្ថលេខារបស់</p>
            <p class="indent-4 leading-6 text-center ">ឈ្មោះ  <span class="font-moul" >{{ officer.people.lastname + ' ' + officer.people.firstname }}</span> ពិតប្រាកដមែន។</p>
            <p class="text-center leading-6 whitespace-nowrap " >ថ្ងៃ <span class="signature-date-line"></span> ទី <span class="signature-date-line"></span> ខែ <span class="signature-date-line signature-date-line-month"></span> ឆ្នាំ <span class="signature-date-line signature-date-line-year"></span> ព.ស. {{ $toKhmer(String(today.getFullYear() + 543)) }}</p> 
            <p class="text-center leading-6 my-2 " >........., ថ្ងៃទី <span class="signature-date-line"></span> ខែ <span class="signature-date-line signature-date-line-month"></span> ឆ្នាំ {{ $toKhmer(today.getFullYear()) }}</p>
            <p class="indent-4 leading-6 text-center font-moul " >ប្រធានអង្គភាព</p>
          </div>
          <div class="absolute right-0 top-12 w-80 overflow-visible" >
            <!-- <p class="indent-4 leading-6 text-justify " ><span class="text-red-500 mr-1 " >*</span>សាមីខ្លួន</p>
            <p class="indent-4 leading-6 text-justify ">ខ្ញុំសូមធានាទទួលខុសត្រូវចំពោះមុខច្បាប់ ព័ត៌មានបានបំពេញក្នុងជីវប្រវត្តិនេះ ពិតជាត្រឹមត្រូវប្រាកដមែន។</p> -->
            <div class="signature-date-lines-wrap">
              <p class="text-center leading-6 whitespace-nowrap" >ថ្ងៃ {{ signatureDates.weekday }} ទី {{ normalizeKhmerNumber(signatureDates.day) }} ខែ {{ normalizeKhmerMonth(signatureDates.month) }} ឆ្នាំ {{ normalizeKhmerNumber(signatureDates.year) }} ព.ស. {{ $toKhmer(String(today.getFullYear() + 543)) }}</p>
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
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter , useRoute } from 'vue-router'
import { useNotification } from 'naive-ui'
import ocmLogoUrl from '@assets/logo.svg'
import pkachan from '@assets/pkachan.png'
import dateFormat from 'dateformat'
import { formatKhmerDateWithMonthName, formatKhmerMonthDuration, formatKhmerSlashDateMonthName, normalizeKhmerNumber, normalizeKhmerMonth } from '../../utils/khmer'
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
        const languageGrade = reactive({
          'A': 'ល្អ',
          'B': 'មធ្យម',
          'C': 'ខ្សោយ'
        })
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
              title: 'បោះពុម្ពប្រវត្តិរូបមន្ត្រី' ,
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
                  label: 'ប្ដូរប្រភេទក្របខ័ណ្ឌ' 
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
                  label: 'មន្ត្រីផ្អែកលើកិច្ចព្រមព្រៀងការងារ' 
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
              signatureDates ,
              dateFormat ,
              formatDateSafe ,
              formatKhmerDateWithMonthName ,
              formatKhmerMonthDuration ,
              formatKhmerSlashDateMonthName ,
              normalizeKhmerNumber ,
              normalizeKhmerMonth ,
              changeTypes ,
              ocmLogoUrl ,
              pkachan ,
              additional_officer_types ,
            officer_type_name,
              languageGrade
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
  /* .section-bullet-table td:first-child::before {
    content: " ";
  } */
  .gap-6 {
    gap: 6.5rem;
  }
</style>
