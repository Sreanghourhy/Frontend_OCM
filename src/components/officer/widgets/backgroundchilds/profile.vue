<template>
  <section class="w-full">
    <div
      v-if="officer != undefined && officer.people != undefined"
      class="w-full"
    >
      <div class="flex items-center gap-2 border-b border-[#E5E7EB] pb-2 mb-3">
        <button
          type="button"
          @click="activeTab = 'profile'"
          :class="[
            'px-3 py-1.5 text-[13px] rounded-t-md border border-b-0 transition-colors',
            activeTab === 'profile'
              ? 'bg-white text-[#1E3A8A] border-[#D8DEE8] font-semibold'
              : 'bg-[#F8FAFC] text-[#64748B] border-transparent hover:text-[#1E3A8A]',
          ]"
        >
          ជីវប្រវត្តិមន្ត្រី
        </button>
        <button
          type="button"
          @click="activeTab = 'two'"
          :class="[
            'px-3 py-1.5 text-[13px] rounded-t-md border border-b-0 transition-colors',
            activeTab === 'two'
              ? 'bg-white text-[#1E3A8A] border-[#D8DEE8] font-semibold'
              : 'bg-[#F8FAFC] text-[#64748B] border-transparent hover:text-[#1E3A8A]',
          ]"
        >
          ព័ត៌មានក្នុងអង្គភាព
        </button>
      </div>
      <div v-if="activeTab === 'profile'" class="px-4 pb-4">
        <div class="flex items-center justify-between pb-2">
          <h3 class="font-moul text-lg text-[#1E3A8A]">
            ក. ព័ត៌មានផ្ទាល់ខ្លួន
          </h3>
        </div>
        <div
          v-if="officer.people != undefined && officer.people != null"
          class="flex flex-nowrap gap-4 overflow-x-auto"
        >
          <div class="min-w-max">
            <table
              class="tbl-profile w-full min-w-max border-collapse"
              style="border-spacing: 0px"
            >
              <tbody>
                <tr>
                  <td class="w-48">ឈ្មោះជាភាសាខ្មែរ</td>
                  <!-- <td v-if="!isEditing" >{{ 'គោត្តនាម ៖ ' + officer.people.lastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " នាមខ្លួន ៖ " + officer.people.firstname }}</td> -->
                  <!-- <td v-if="isEditing" :class="['p-1', changedCellClass(['lastname', 'firstname'])]" > -->
                  <td
                    colspan="4"
                    :class="[
                      'p-1',
                      changedCellClass(['lastname', 'firstname']),
                    ]"
                  >
                    <div class="grid w-full grid-cols-3 items-start">
                      <div class="flex flex-nowrap items-start leading-8">
                        <div class="w-32 shrink-0">គោត្តនាម ៖</div>
                        <div class="flex min-w-0 flex-col">
                          <input
                            :ref="setValidationFieldRef('lastname')"
                            v-model="editData.lastname"
                            type="text"
                            placeholder="គោត្តនាម"
                            :class="[
                              'field-input w-24 border rounded px-2 text-[13px] bg-white',
                              fieldInputClass('lastname'),
                            ]"
                            @keydown="
                              handleRestrictedKeydown('lastname', $event)
                            "
                            @beforeinput="
                              handleRestrictedBeforeInput('lastname', $event)
                            "
                            @paste="handleRestrictedPaste('lastname', $event)"
                            @input="handleRestrictedInput('lastname', $event)"
                            @focus="handleFieldFocus('lastname')"
                            @blur="handleFieldBlur('lastname')"
                          />
                          <p
                            v-if="getFieldError('lastname')"
                            class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                          >
                            {{ getFieldError("lastname") }}
                          </p>
                        </div>
                      </div>
                      <div class="flex flex-nowrap items-start leading-8">
                        <div class="w-28 shrink-0">នាមខ្លួន ៖</div>
                        <div class="flex min-w-0 flex-col">
                          <input
                            :ref="setValidationFieldRef('firstname')"
                            v-model="editData.firstname"
                            type="text"
                            placeholder="នាមខ្លួន"
                            :class="[
                              'field-input w-36 border rounded px-2 text-[13px] bg-white',
                              fieldInputClass('firstname'),
                            ]"
                            @keydown="
                              handleRestrictedKeydown('firstname', $event)
                            "
                            @beforeinput="
                              handleRestrictedBeforeInput('firstname', $event)
                            "
                            @paste="
                              handleRestrictedPaste('firstname', $event)
                            "
                            @input="
                              handleRestrictedInput('firstname', $event)
                            "
                            @focus="handleFieldFocus('firstname')"
                            @blur="handleFieldBlur('firstname')"
                          />
                          <p
                            v-if="getFieldError('firstname')"
                            class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                          >
                            {{ getFieldError("firstname") }}
                          </p>
                        </div>
                      </div>
                      <div class="inline-flex items-center gap-2 flex-nowrap">
                        <div class="text-[13px] whitespace-nowrap pl-10">
                          ភេទ ៖
                        </div>
                        <n-select
                          v-model:value="editData.gender"
                          :options="genderOptions"
                          size="small"
                          :class="[
                            'w-36 uniform-select',
                            fieldChangedClass('gender'),
                          ]"
                          placeholder="ជ្រើសរើសភេទ"
                        />
                      </div>
                    </div>
                  </td>
                  <!-- <td colspan="2" v-if="!isEditing" >ភេទ ៖ {{ parseInt( officer.people.gender ) == 1 ? 'ប្រុស' : 'ស្រី' }}</td> -->
                  <!-- <td colspan="2" v-if="isEditing" :class="['p-1', changedCellClass('gender')]" > -->
                  <!-- <td colspan="2" :class="['p-1', changedCellClass('gender')]" >
                                        
                                    </td> -->
                </tr>
                <tr>
                  <td class="w-48">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                  <!-- <td colspan="3" v-if="!isEditing" >{{ 'គោត្តនាម ៖ ' + officer.people.enlastname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ " នាមខ្លួន ៖ " +  officer.people.enfirstname }}</td> -->
                  <td
                    v-if="isEditing"
                    :class="[
                      'p-1',
                      changedCellClass(['enlastname', 'enfirstname']),
                    ]"
                  >
                    <div class="grid w-full grid-cols-3 items-start">
                      <div class="flex flex-nowrap items-start leading-8">
                        <div class="w-32 shrink-0">គោត្តនាមជាឡាតាំង ៖</div>
                        <div class="flex min-w-0 flex-col">
                          <input
                            :ref="setValidationFieldRef('enlastname')"
                            v-model="editData.enlastname"
                            type="text"
                            placeholder="Last Name"
                            :class="[
                              'field-input w-24 border rounded px-2 text-[13px] bg-white',
                              fieldInputClass('enlastname'),
                            ]"
                            @keydown="
                              handleRestrictedKeydown('enlastname', $event)
                            "
                            @beforeinput="
                              handleRestrictedBeforeInput(
                                'enlastname',
                                $event,
                              )
                            "
                            @paste="
                              handleRestrictedPaste('enlastname', $event)
                            "
                            @input="
                              handleRestrictedInput('enlastname', $event)
                            "
                            @focus="handleFieldFocus('enlastname')"
                            @blur="handleFieldBlur('enlastname')"
                          />
                          <p
                            v-if="getFieldError('enlastname')"
                            class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                          >
                            {{ getFieldError("enlastname") }}
                          </p>
                        </div>
                      </div>
                      <div class="flex flex-nowrap items-start leading-8">
                        <div class="w-28 shrink-0">នាមខ្លួនជាឡាតាំង ៖</div>
                        <div class="flex min-w-0 flex-col">
                          <input
                            :ref="setValidationFieldRef('enfirstname')"
                            v-model="editData.enfirstname"
                            type="text"
                            placeholder="First Name"
                            :class="[
                              'field-input w-36 border rounded px-2 text-[13px] bg-white',
                              fieldInputClass('enfirstname'),
                            ]"
                            @keydown="
                              handleRestrictedKeydown('enfirstname', $event)
                            "
                            @beforeinput="
                              handleRestrictedBeforeInput(
                                'enfirstname',
                                $event,
                              )
                            "
                            @paste="
                              handleRestrictedPaste('enfirstname', $event)
                            "
                            @input="
                              handleRestrictedInput('enfirstname', $event)
                            "
                            @focus="handleFieldFocus('enfirstname')"
                            @blur="handleFieldBlur('enfirstname')"
                          />
                          <p
                            v-if="getFieldError('enfirstname')"
                            class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                          >
                            {{ getFieldError("enfirstname") }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="w-48"></td>
                  <td
                    colspan="3"
                    v-if="isEditing"
                    :class="['p-1', changedCellClass('countesy_id')]"
                  >
                    <div class="flex flex-nowrap items-start leading-8">
                      <div class="w-32 shrink-0">ងារ ៖</div>
                      <div class="flex min-w-0 flex-col">
                        <n-select
                          :ref="setValidationFieldRef('countesy_id')"
                          v-model:value="editData.countesy_id"
                          filterable
                          clearable
                          placeholder="សូមជ្រើសរើសងារ"
                          :options="countesyOptions"
                          :class="[
                            'w-56 uniform-select',
                            fieldInputClass('countesy_id'),
                          ]"
                          @focus="handleFieldFocus('countesy_id')"
                          @blur="handleFieldBlur('countesy_id')"
                        />
                        <p
                          v-if="getFieldError('countesy_id')"
                          class="pt-1 max-w-[20rem] text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("countesy_id") }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="w-48">ថ្ងៃខែឆ្នាំកំណើត</td>
                  <!-- <td v-if="!isEditing">{{ ( ( officer.people.dob != null  ) ? $toKhmer( dateFormat( new Date(officer.people.dob) , 'dd-mm-yyyy' ) ) : '' ) }}</td> -->
                  <td
                    colspan="2"
                    v-if="isEditing"
                    :class="['p-0', changedCellClass('dob'), 'flex', 'items-start']"
                  >
                    <div class="mr-6 w-40">
                      <div class="flex min-w-0 flex-col">
                        <officer-date-input
                          :ref="setValidationFieldRef('dob')"
                          v-model="dobForInput"
                          @focus="handleFieldFocus('dob')"
                          @blur="handleFieldBlur('dob')"
                        />
                        <p
                          v-if="getFieldError('dob')"
                          class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("dob") }}
                        </p>
                      </div>
                    </div>
                    <div class="mr-6 flex items-start leading-8">
                      <div class="w-20 shrink-0">ជនជាតិ ៖</div>
                      <div class="flex min-w-0 flex-col">
                        <input
                          :ref="setValidationFieldRef('national')"
                          v-model="editData.national"
                          type="text"
                          placeholder="ជនជាតិ"
                          :class="[
                            'field-input w-32 border rounded px-2 text-[13px] bg-white',
                            fieldInputClass('national'),
                          ]"
                          @keydown="
                            handleRestrictedKeydown('national', $event)
                          "
                          @beforeinput="
                            handleRestrictedBeforeInput('national', $event)
                          "
                          @paste="handleRestrictedPaste('national', $event)"
                          @input="handleRestrictedInput('national', $event)"
                          @focus="handleFieldFocus('national')"
                          @blur="handleFieldBlur('national')"
                        />
                        <p
                          v-if="getFieldError('national')"
                          class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("national") }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start leading-8">
                      <div class="w-20 shrink-0">សញ្ជាតិ ៖</div>
                      <div class="flex min-w-0 flex-col">
                        <input
                          :ref="setValidationFieldRef('nationality')"
                          v-model="editData.nationality"
                          type="text"
                          placeholder="សញ្ជាតិ"
                          :class="[
                            'field-input w-32 border rounded px-2 text-[13px] bg-white',
                            fieldInputClass('nationality'),
                          ]"
                          @keydown="
                            handleRestrictedKeydown('nationality', $event)
                          "
                          @beforeinput="
                            handleRestrictedBeforeInput('nationality', $event)
                          "
                          @paste="
                            handleRestrictedPaste('nationality', $event)
                          "
                          @input="
                            handleRestrictedInput('nationality', $event)
                          "
                          @focus="handleFieldFocus('nationality')"
                          @blur="handleFieldBlur('nationality')"
                        />
                        <p
                          v-if="getFieldError('nationality')"
                          class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("nationality") }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <!-- <td v-if="!isEditing">ជនជាតិ ៖ {{ officer.people.national }}</td> -->
                  <!-- <td v-if="isEditing" :class="['p-1', changedCellClass('national') || changedCellClass('nationality') ] + ' grid grid-cols-2 gap-2 w-full ' ">
                                        <div class="flex flex-wrap leading-8" >
                                            <div class="w-32" >ជនជាតិ ៖</div>
                                            <input v-model="editData.national" type="text" placeholder="ជនជាតិ" class="field-input w-24 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                                        </div>
                                        <div class="flex flex-wrap leading-8" >
                                            <div class="w-28" >សញ្ជាតិ ៖</div>
                                            <input v-model="editData.nationality" type="text" placeholder="សញ្ជាតិ" class="field-input w-24 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                                        </div>
                                    </td> -->
                  <!-- <td v-if="!isEditing">សញ្ជាតិ ៖ {{ officer.people.nationality }}</td> -->
                  <!-- <td v-if="isEditing" :class="['p-1', changedCellClass('nationality')]">
                                        សញ្ជាតិ ៖ <input v-model="editData.nationality" type="text" placeholder="សញ្ជាតិ" class="field-input w-24 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                                    </td> -->
                </tr>
                <tr class="">
                  <td class="w-48">ទីកន្លែងកំណើត</td>
                  <!-- <td colspan="3" v-if="!isEditing" >ភូមិ {{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.address != null  ) ? $toKhmer( officer.people.address ) : '' ) }}</td> -->
                  <td
                    colspan="3"
                    v-if="isEditing"
                    :class="['pt-1', changedCellClass('pob')]"
                  >
                    <textarea
                      v-model="editData.pob"
                      placeholder="ទីកន្លែងកំណើត"
                      :class="[
                        'field-input field-input-textarea w-4/5 border rounded px-2 py-1.5 text-[13px] bg-white resize-y',
                        fieldChangedClass('pob'),
                      ]"
                      rows="2"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td class="w-48">អាសយដ្ឋានបច្ចុប្បន្ន</td>
                  <!-- <td colspan="3" v-if="!isEditing" >{{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.address != null  ) ? $toKhmer( officer.people.address ) : '' ) }}</td> -->
                  <td
                    colspan="3"
                    v-if="isEditing"
                    :class="['pt-0', changedCellClass('address')]"
                  >
                    <textarea
                      v-model="editData.address"
                      placeholder="អាសយដ្ឋានបច្ចុប្បន្ន"
                      :class="[
                        'field-input field-input-textarea  w-4/5 border rounded px-2 py-1.5 text-[13px] bg-white resize-y',
                        fieldChangedClass('address'),
                      ]"
                      rows="2"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td class="w-48">អាសយដ្ឋានអចិន្ត្រៃយ៍</td>
                  <!-- <td colspan="3" v-if="!isEditing" >{{ ( ( officer != null && officer.people != undefined && officer.people != null && officer.people.current_address != null  ) ? $toKhmer( officer.people.current_address ) : '' ) }}</td> -->
                  <td
                    colspan="3"
                    v-if="isEditing"
                    :class="['pt-0', changedCellClass('current_address')]"
                  >
                    <textarea
                      v-model="editData.current_address"
                      placeholder="អាសយដ្ឋានអចិន្ត្រៃយ៍"
                      :class="[
                        'field-input field-input-textarea  w-4/5 border rounded px-2 py-1.5 text-[13px] bg-white resize-y',
                        fieldChangedClass('current_address'),
                      ]"
                      rows="2"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td class="w-48">លេខទូរស័ព្ទ</td>
                  <!-- <td v-if="!isEditing" >{{ $toKhmer( officer.people.mobile_phone ) }}</td> -->
                  <td
                    colspan="2"
                    v-if="isEditing"
                    :class="['pt-0', changedCellClass('mobile_phone')]"
                  >
                    <div class="inline-flex flex-wrap items-start gap-y-1">
                      <div class="flex min-w-0 flex-col">
                        <input
                          :ref="setValidationFieldRef('mobile_phone')"
                          v-model="editData.mobile_phone"
                          type="text"
                          inputmode="numeric"
                          placeholder="លេខទូរសព្ទ"
                          :class="[
                            'field-input mr-4 w-40 border rounded px-2 text-[13px] bg-white',
                            fieldInputClass('mobile_phone'),
                          ]"
                          @keydown="
                            handleRestrictedKeydown('mobile_phone', $event)
                          "
                          @beforeinput="
                            handleRestrictedBeforeInput('mobile_phone', $event)
                          "
                          @paste="handleRestrictedPaste('mobile_phone', $event)"
                          @input="handleRestrictedInput('mobile_phone', $event)"
                          @focus="handleFieldFocus('mobile_phone')"
                          @blur="handleFieldBlur('mobile_phone')"
                        />
                        <p
                          v-if="getFieldError('mobile_phone')"
                          class="mr-4 max-w-[16rem] pt-1 text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("mobile_phone") }}
                        </p>
                      </div>
                      <span class="self-center leading-8">អ៉ីម៉ែល</span>
                      <div class="flex min-w-0 flex-col">
                        <input
                          :ref="setValidationFieldRef('email')"
                          v-model="editData.email"
                          type="text"
                          placeholder="អ៉ីមែល"
                          :class="[
                            'field-input ml-4 w-60 border rounded px-2 text-[13px] bg-white',
                            fieldInputClass('email'),
                          ]"
                          @keydown="handleRestrictedKeydown('email', $event)"
                          @beforeinput="
                            handleRestrictedBeforeInput('email', $event)
                          "
                          @paste="handleRestrictedPaste('email', $event)"
                          @input="handleRestrictedInput('email', $event)"
                          @focus="handleFieldFocus('email')"
                          @blur="handleFieldBlur('email')"
                        />
                        <p
                          v-if="getFieldError('email')"
                          class="ml-4 max-w-[18rem] pt-1 text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("email") }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <!-- <td colspan="2" v-if="!isEditing" >អ៉ីមែល៖ {{ officer.people.email }}</td> -->
                  <!-- <td colspan="2" v-if="isEditing" :class="['p-1', changedCellClass('email')] + ' pl-4 ' ">
                                        
                                    </td> -->
                </tr>
                <tr>
                    <td class="w-48 " >អត្តលេខមន្ត្រីរាជការ</td>
                    <td colspan="3" v-if="!isEditing" >{{ $toKhmer( officer.code ) }}</td>
                    <td colspan="3" v-if="isEditing" :class="['p-1 pl-0', changedCellClass('code')]">
                        <input v-model="editData.code" type="text" placeholder="អត្តលេខមន្ត្រីរាជការ" class="field-input w-40 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                    </td>
                </tr>
                <tr>
                  <td class="w-48">លេខអត្ត.សញ្ជាតិខ្មែរ</td>
                  <!-- <td v-if="!isEditing">{{ officer.people.nid ? $toKhmer( officer.people.nid ) : '' }}</td> -->
                  <td
                    colspan="3"
                    v-if="isEditing"
                    :class="['p-0', changedCellClass('nid'), 'flex', 'items-start']"
                  >
                    <div class="mt-1 mr-5 w-40">
                      <div class="flex min-w-0 flex-col">
                        <input
                          :ref="setValidationFieldRef('nid')"
                          v-model="editData.nid"
                          type="text"
                          inputmode="text"
                          placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
                          :class="[
                            'field-input w-40 border rounded px-2 text-[13px] bg-white',
                            fieldInputClass('nid'),
                          ]"
                          @keydown="handleRestrictedKeydown('nid', $event)"
                          @beforeinput="
                            handleRestrictedBeforeInput('nid', $event)
                          "
                          @paste="handleRestrictedPaste('nid', $event)"
                          @input="handleRestrictedInput('nid', $event)"
                          @focus="handleFieldFocus('nid')"
                          @blur="handleFieldBlur('nid')"
                        />
                        <p
                          v-if="getFieldError('nid')"
                          class="pt-1 max-w-[16rem] text-left text-[11px] leading-snug text-red-600"
                        >
                          {{ getFieldError("nid") }}
                        </p>
                      </div>
                    </div>
                    <div class="flex leading-8 w-52 mr-6 mt-1">
                      <div class="w-40 mr-2">សុពលភាព ៖</div>
                      <officer-date-input
                        v-model="editData.nid_start_at"
                        wrapper-class="relative inline-block align-middle"
                        :input-class="[fieldChangedClass('nid_start_at')]"
                      />
                    </div>
                    <div class="flex leading-8 w-48 mt-1">
                      <div class="w-28">ដល់ថ្ងៃ ៖</div>
                      <officer-date-input
                        v-model="editData.nid_expired_at"
                        wrapper-class="relative inline-block align-middle"
                        :input-class="[fieldChangedClass('nid_expired_at')]"
                      />
                    </div>
                  </td>
                </tr>
                <!-- <tr v-if="officer.people.passports != null && officer.people.passports != undefined && officer.people.passports.length > 0" >
                                    <td class="w-48 " >លេខលិខិតឆ្លងដែន</td>
                                    <td>{{ $toKhmer( officer.people.passports[0].number ) }}</td>
                                    <td class="">សុពលភាព ៖ {{ $toKhmer( officer.people.passports[0].effective_date ) }}</td>
                                    <td class="">ដល់ថ្ងៃ ៖ {{ $toKhmer( officer.people.passports[0].expired_date ) }}</td>
                                </tr> -->
                <tr>
                  <td class="w-48">កាយសម្បទា</td>
                  <!-- <td v-if="!isEditing">
                                        <span class="flex items-center gap-4">
                                            <span class="text-[13px]">{{ parseInt( officer.people.body_condition ) == 0 ? 'គ្រប់គ្រាន់' : 'ពិការភាព' }}</span>
                                        </span>
                                    </td> -->
                  <td
                    v-if="isEditing"
                    :class="[
                      'p-1 flex h-9 ',
                      changedCellClass('body_condition'),
                    ]"
                  >
                    <span
                      :class="[
                        'flex items-center gap-4 w-60 rounded px-2',
                        fieldChangedClass('body_condition'),
                      ]"
                    >
                      <label
                        class="inline-flex items-center gap-1 cursor-pointer"
                      >
                        <input
                          v-model.number="editData.body_condition"
                          type="radio"
                          :value="0"
                          name="body_condition"
                          class="rounded-full border-[#D8DEE8]"
                        />
                        <span class="text-[13px]">គ្រប់គ្រាន់</span>
                      </label>
                      <label
                        class="inline-flex items-center gap-1 cursor-pointer"
                      >
                        <input
                          v-model.number="editData.body_condition"
                          type="radio"
                          :value="1"
                          name="body_condition"
                          class="rounded-full border-[#D8DEE8]"
                        />
                        <span class="text-[13px]">ពិការភាព</span>
                      </label>
                    </span>
                    <Transition name="fade">
                      <input
                        v-if="editData.body_condition == 1"
                        v-model="editData.body_condition_desp"
                        type="text"
                        placeholder="ប្រភេទពិការភាព"
                        :class="[
                          'field-input w-full border rounded px-2 text-[13px] bg-white',
                          fieldChangedClass('body_condition_desp'),
                        ]"
                      />
                    </Transition>
                  </td>
                  <!-- <td colspan="2" v-if="!isEditing">ប្រភេទពិការភាព ៖ {{ parseInt( officer.people.body_condition ) == 1 ? officer.people.body_condition_desp : '' }}</td> -->
                  <!-- <td colspan="2" v-if="isEditing" :class="['p-1', changedCellClass('body_condition_desp')]">
                                        <input v-model="editData.body_condition_desp" type="text" placeholder="ប្រភេទពិការភាព" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" :disabled="parseInt(editData.body_condition) != 1" />
                                    </td> -->
                </tr>
                <!-- Birth Certificate Section (career-history style) -->
                <tr>
                  <td colspan="5" class="pt-4">
                    <div class="w-full py-2">
                      <h3 class="text-[15px] font-semibold text-[#1E3A8A]">
                        សំបុត្រកំណើត / បញ្ជាក់កំណើត
                      </h3>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="w-48 p-1">លេខសំបុត្រ</td>
                  <td colspan="4" class="p-1">
                    <div
                      class="grid max-w-[36rem] grid-cols-[11rem_8rem_11rem] items-center gap-x-4"
                    >
                      <input
                        v-model="birthCertData.birth_number"
                        type="text"
                        placeholder="លេខសំបុត្រ"
                        :class="[
                          'field-input w-full border rounded px-2 text-[13px] bg-white',
                          fieldChangedClass('birth_number'),
                        ]"
                      />
                      <div class="whitespace-nowrap">លេខសៀវភៅ</div>
                      <input
                        v-model="birthCertData.book_number"
                        type="text"
                        placeholder="លេខសៀវភៅ"
                        :class="[
                          'field-input w-full border rounded px-2 text-[13px] bg-white',
                          fieldChangedClass('book_number'),
                        ]"
                      />
                    </div>
                  </td>
                  <!-- <td class="w-48 p-1">លេខសៀវភៅ</td>
                                        <td colspan="2" :class="['p-1', changedCellClass('book_number')]">
                                            <input v-model="birthCertData.book_number" type="text" placeholder="លេខសៀវភៅ" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                                        </td> -->
                </tr>
                <tr>
                  <td class="w-48 p-1">ថ្ងៃខែឆ្នាំ</td>
                  <td colspan="4" class="p-1">
                    <div
                      class="grid max-w-[36rem] grid-cols-[11rem_8rem_11rem] items-center gap-x-4"
                    >
                      <officer-date-input
                        v-model="birthCertYearForInput"
                        wrapper-class="relative inline-block align-middle w-full"
                        :input-class="['w-full', fieldChangedClass('year')]"
                      />
                      <div class="whitespace-nowrap">ថ្ងៃខែឆ្នាំចុះលេខ</div>
                      <officer-date-input
                        v-model="birthCertIssuedDateForInput"
                        wrapper-class="relative inline-block align-middle w-full"
                        :input-class="[
                          'w-full',
                          fieldChangedClass('issued_date'),
                        ]"
                      />
                    </div>
                  </td>
                  <!-- <td class="w-48 p-1">ថ្ងៃខែឆ្នាំចុះលេខ</td>
                                        <td colspan="2" :class="['p-1', changedCellClass('issued_date')]">
                                            <input v-model="birthCertIssuedDateForInput" type="date" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                                        </td> -->
                </tr>
                <tr>
                  <td class="w-48 p-1">ខេត្ត/ក្រុង</td>
                  <td colspan="4" class="p-1">
                    <div
                      class="grid max-w-[36rem] grid-cols-[11rem_8rem_11rem] items-center gap-x-4"
                    >
                      <div>
                        <n-select
                          v-model:value="birthCertData.province_id"
                          filterable
                          clearable
                          size="small"
                          class="w-full uniform-select"
                          placeholder="ខេត្ត ក្រុង"
                          :options="bcProvinceOptions"
                          @update:value="bcSetProvince"
                        />
                      </div>
                      <div class="leading-8 whitespace-nowrap">ស្រុក/ខណ្ឌ</div>
                      <div>
                        <n-select
                          v-model:value="birthCertData.district_id"
                          filterable
                          clearable
                          size="small"
                          class="w-full uniform-select"
                          placeholder="ស្រុក ខណ្ឌ"
                          :options="bcDistrictOptions"
                          @update:value="bcSetDistrict"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="w-48 p-1">ឃុំ/សង្កាត់</td>
                  <td colspan="4" class="p-1">
                    <div
                      class="grid max-w-[36rem] grid-cols-[11rem_8rem_11rem] items-center gap-x-4"
                    >
                      <div>
                        <n-select
                          v-model:value="birthCertData.commune_id"
                          filterable
                          clearable
                          size="small"
                          class="w-full uniform-select"
                          placeholder="ឃុំ សង្កាត់"
                          :options="bcCommuneOptions"
                        />
                      </div>
                      <div class="leading-8 whitespace-nowrap">
                        សំបុត្រកំណើត
                      </div>
                      <div class="flex items-center gap-2 flex-shrink-0">
                        <row-document-action-bar
                          input-id="profile-birth-cert-document"
                          :upload-pending="Boolean(birthCertFile)"
                          :preview-disabled="!canPreviewBirthCert"
                          :download-disabled="true"
                          :show-remove="false"
                          @select="onBirthCertToolbarSelect"
                          @preview="openBirthCertPdfPreview"
                          @download="() => false"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-40 flex-none">
            <div
              class="relative group ml-0"
              style="width: 3.2cm; height: 4.2cm"
            >
              <img
                :src="
                  previewImage ||
                  (officer.image != undefined && officer.image != null
                    ? officer.image
                    : ocmLogoUrl)
                "
                class="w-full h-full object-cover border border-gray-200"
              />
              <!-- Upload overlay -->
              <div
                class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                @click="triggerFileInput"
              >
                <svg
                  class="w-8 h-8 text-white mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h352a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                  />
                  <circle
                    cx="256"
                    cy="272"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    stroke-miterlimit="10"
                    stroke-width="32"
                  />
                </svg>
                <span class="text-white text-xs">ប្ដូររូបភាព</span>
              </div>
              <!-- Hidden file input -->
              <input
                type="file"
                ref="fileInput"
                accept="image/jpeg,image/png"
                class="hidden"
                @change="handleFileSelect"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="px-4 pb-4 min-h-[220px]">
        <update-officer-form
          ref="updateTabFormRef"
          :model="updateTabModel"
          :record="officer"
          :show="activeTab === 'two'"
          :embedded="true"
          :onClose="handleUpdateTabClose"
        />
        <div class="flex justify-end items-center gap-1 pt-3">
          <button
            type="button"
            class="w-24 bg-gray-50 py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 duration-500 hover:text-gray-700"
            @click="handleTabTwoCancel"
          >
            បោះបង់
          </button>
          <button
            type="button"
            class="w-28 bg-blue-50 py-2 px-4 border border-blue-400 rounded hover:bg-blue-100 duration-500 hover:text-blue-600"
            @click="handleTabTwoSave"
          >
            រក្សាទិន្នន័យ
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="officer == undefined"
      class="w-full p-8 text-center text-[#DC2626] text-[13px]"
    >
      សូមបញ្ជាកព័ត៌មានមន្ត្រីជាមុនសិន។
    </div>
    <pdf-preview
      v-model:model="model"
      v-model:record="selectedCertificate"
      v-bind:show="pdfToggle"
      :onClose="togglePdfModal"
    />
  </section>
</template>
<script>
import dateFormat from "dateformat";
import { ref, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import ocmLogoUrl from "@assets/logo.svg";
import PdfPreview from "./pdfpreview.vue";
import RowDocumentActionBar from "./row-document-action-bar.vue";
import UpdateOfficerForm from "./update.vue";

export default {
  name: "ProfileOfficer",
  emits: ["changed", "tab-changed"],
  props: {
    // ជាការប្រកាសអថេរ ពីសមាសធាតុ មេ និងកូន
    officer: {
      type: Object,
      default: undefined,
    },
  },
  components: {
    PdfPreview,
    RowDocumentActionBar,
    UpdateOfficerForm,
  },
  // Composition way
  setup(props, { emit }) {
    const store = useStore();
    const isEditing = ref(true);
    const activeTab = ref("profile");
    const updateTabFormRef = ref(null);
    const updateTabModel = reactive({
      name: "officer",
      title: "កែប្រែព័ត៌មានមន្ត្រី",
    });

    function handleUpdateTabClose() {
      activeTab.value = "profile";
    }

    async function handleTabTwoCancel() {
      if (typeof updateTabFormRef.value?.resetEmbeddedChanges === "function") {
        await updateTabFormRef.value.resetEmbeddedChanges();
      }
      handleUpdateTabClose();
    }

    function handleTabTwoSave() {
      if (typeof updateTabFormRef.value?.update === "function") {
        updateTabFormRef.value.update();
      }
    }

    watch(
    activeTab,
      (tabId) => {
        emit("tab-changed", tabId);
      },
      { immediate: true },
    );

    const notify = {
      warning: (opts) => {
        window.alert(opts?.content || opts?.title || "");
      },
      success: () => {},
      error: (opts) => {
        window.alert(opts?.content || opts?.title || "");
      },
    };

    // Profile picture upload refs
    const fileInput = ref(null);
    const selectedFile = ref(null);
    const previewImage = ref(null);
    const isUploading = ref(false);

    // Edit data reactive object
    const editData = reactive({
      id: null,
      people_id: null,
      code: "",
      lastname: "",
      firstname: "",
      enlastname: "",
      enfirstname: "",
      countesy_id: null,
      gender: 1,
      dob: null,
      national: "",
      nationality: "",
      pob: "",
      address: "",
      current_address: "",
      mobile_phone: "",
      email: "",
      body_condition: 0,
      body_condition_desp: "",
      nid: "",
      nid_expired_at: "",
      nid_start_at: "",
    });

    const genderOptions = [
      { label: "ប្រុស", value: 1 },
      { label: "ស្រី", value: 0 },
    ];

    const countesyRecords = computed(() => {
      const records = store.getters["countesy/getRecords"];
      return Array.isArray(records) ? records : [];
    });

    const countesyOptions = computed(() =>
      countesyRecords.value.map((record) => ({
        label: record.name,
        value: record.id,
      })),
    );

    function resolveCountesyRecord(value) {
      const countesyId = normalizeNullableNumber(value);
      if (countesyId === null || countesyId <= 0) return null;

      const record =
        countesyRecords.value.find((item) => item.id == countesyId) || null;
      if (record) return record;

      const option =
        countesyOptions.value.find((item) => item.value == countesyId) || null;
      return option ? { id: option.value, name: option.label } : null;
    }

    function ensureCountesiesLoaded() {
      if (countesyRecords.value.length > 0) return;

      store
        .dispatch("countesy/list", {
          search: "",
          page: 1,
          perPage: 1000,
        })
        .then((res) => {
          store.commit(
            "countesy/setRecords",
            Array.isArray(res?.data?.records) ? res.data.records : [],
          );
        })
        .catch((error) => {
          console.error("Unable to load countesies:", error);
        });
    }

    ensureCountesiesLoaded();

    const dobForInput = computed({
      get() {
        if (!editData.dob) return "";
        const d = new Date(editData.dob);
        return Number.isNaN(d.getTime()) ? "" : dateFormat(d, "yyyy-mm-dd");
      },
      set(v) {
        editData.dob = v ? new Date(v).getTime() : null;
      },
    });

    const personalFieldKeys = [
      "code",
      "lastname",
      "firstname",
      "enlastname",
      "enfirstname",
      "countesy_id",
      "gender",
      "dob",
      "national",
      "nationality",
      "pob",
      "address",
      "current_address",
      "mobile_phone",
      "email",
      "body_condition",
      "body_condition_desp",
      "nid",
      "nid_expired_at",
      "nid_start_at",
    ];
    const validationFieldOrder = [
      "lastname",
      "firstname",
      "enlastname",
      "enfirstname",
      "countesy_id",
      "dob",
      "national",
      "nationality",
      "mobile_phone",
      "email",
      "nid",
    ];
    const activeValidationField = ref("");
    const validationFieldRefs = reactive({});
    const lastValidFieldValues = reactive(
      validationFieldOrder.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    );
    const blockedFieldMessages = reactive(
      validationFieldOrder.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    );
    const birthCertFieldKeys = [
      "birth_number",
      "book_number",
      "year",
      "issued_date",
      "province_id",
      "district_id",
      "commune_id",
      "birth_cert_file",
    ];
    const trackedFieldKeys = [...personalFieldKeys, ...birthCertFieldKeys];
    const savedSnapshot = ref("{}");

    function toDateString(ms) {
      if (ms === null || ms === undefined || ms === "") return "";
      const d = new Date(ms);
      if (Number.isNaN(d.getTime())) return "";
      return dateFormat(d, "yyyy-mm-dd");
    }

    function normalizeString(value) {
      if (value === null || value === undefined) return "";
      return String(value);
    }

    function normalizeNumber(value, fallback = 0) {
      const parsed = parseInt(value, 10);
      return Number.isNaN(parsed) ? fallback : parsed;
    }

    function normalizeNullableNumber(value) {
      if (value === null || value === undefined || value === "") return null;
      const parsed = parseInt(value, 10);
      return Number.isNaN(parsed) ? null : parsed;
    }

    function toNullableInt(value) {
      if (value === null || value === undefined || value === "") return null;
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? null : parsed;
    }

    function trimValue(value) {
      if (value === null || value === undefined) return "";
      return String(value).trim();
    }

    function normalizeLatinNameForSave(value) {
      if (value === null || value === undefined) return "";
      return String(value).toUpperCase();
    }

    function hasFieldValue(field) {
      return trimValue(editData[field]) !== "";
    }

    function isKhmerOnly(value) {
      const normalized = trimValue(value);
      if (normalized === "") return true;
      return /^[\u1780-\u17FF\s]+$/u.test(normalized);
    }

    function isLatinOnly(value) {
      const normalized = trimValue(value);
      if (normalized === "") return true;
      return /^[A-Za-z\s.'-]+$/.test(normalized);
    }

    function isNumericOnly(value) {
      const normalized = trimValue(value);
      if (normalized === "") return true;
      return /^[0-9០-៩]+$/.test(normalized);
    }

    function isAllowedNidValue(value) {
      const normalized = trimValue(value);
      if (normalized === "") return true;
      return /^[0-9០-៩()!@#$%]+$/.test(normalized);
    }

    function isValidEmail(value) {
      const normalized = trimValue(value);
      if (normalized === "") return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    }

    function getFieldRestriction(field) {
      const restrictionMap = {
        lastname: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) =>
            String(value).replace(/[^\u1780-\u17FF\s]/gu, ""),
          message: "សូមប្តូរក្ដារចុចទៅជាភាសាខ្មែរ",
        },
        firstname: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) =>
            String(value).replace(/[^\u1780-\u17FF\s]/gu, ""),
          message: "សូមប្តូរក្ដារចុចទៅជាភាសាខ្មែរ",
        },
        national: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) =>
            String(value).replace(/[^\u1780-\u17FF\s]/gu, ""),
          message: "សូមបំពេញជនជាតិជាអក្សរខ្មែរ",
        },
        nationality: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) =>
            String(value).replace(/[^\u1780-\u17FF\s]/gu, ""),
          message: "សូមបំពេញសញ្ជាតិជាអក្សរខ្មែរ",
        },
        enlastname: {
          pattern: /^[A-Za-z\s.'-]+$/,
          sanitize: (value) => String(value).replace(/[^A-Za-z\s.'-]/g, ""),
          message: "សូមប្តូរក្ដារចុចទៅជាអក្សរឡាតាំង",
        },
        enfirstname: {
          pattern: /^[A-Za-z\s.'-]+$/,
          sanitize: (value) => String(value).replace(/[^A-Za-z\s.'-]/g, ""),
          message: "សូមប្តូរក្ដារចុចទៅជាអក្សរឡាតាំង",
        },
        mobile_phone: {
          pattern: /^[0-9០-៩]+$/,
          sanitize: (value) => String(value).replace(/[^0-9០-៩]/g, ""),
          message: "សូមបំពេញលេខទូរសព្ទជាតួលេខប៉ុណ្ណោះ",
        },
        nid: {
          pattern: /^[0-9០-៩()!@#$%]+$/,
          sanitize: (value) => String(value).replace(/[^0-9០-៩()!@#$%]/g, ""),
          message:
            "សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរ ដោយអាចប្រើលេខ និងសញ្ញា ()!@#$%",
        },
        email: {
          pattern: /^[A-Za-z0-9@._%+-]+$/,
          sanitize: (value) => String(value).replace(/[^A-Za-z0-9@._%+-]/g, ""),
          message: "សូមប្រើតែអក្សរឡាតាំង លេខ និងសញ្ញាអ៊ីមែល",
        },
      };

      return restrictionMap[field] || null;
    }

    function sanitizeFieldValue(field, value) {
      const rule = getFieldRestriction(field);
      if (!rule) return value ?? "";
      return rule.sanitize(value ?? "");
    }

    function rememberLastValidValue(field, value) {
      lastValidFieldValues[field] = sanitizeFieldValue(field, value);
    }

    function setBlockedFieldMessage(field, message) {
      blockedFieldMessages[field] = message;
      activeValidationField.value = field;
    }

    function clearBlockedFieldMessage(field) {
      blockedFieldMessages[field] = "";
    }

    function isControlKeyEvent(event) {
      if (!event) return false;
      if (event.ctrlKey || event.metaKey || event.altKey) return true;
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "Tab",
        "Enter",
        "Escape",
      ];
      return allowedKeys.includes(event.key);
    }

    function handleRestrictedKeydown(field, event) {
      const rule = getFieldRestriction(field);
      if (!rule || !event) return;

      if (isControlKeyEvent(event) || event.isComposing === true) {
        return;
      }

      if (typeof event.key !== "string" || event.key.length !== 1) return;

      if (rule.pattern.test(event.key)) {
        clearBlockedFieldMessage(field);
        return;
      }

      setBlockedFieldMessage(field, rule.message);
    }

    function handleRestrictedBeforeInput(field, event) {
      const rule = getFieldRestriction(field);
      if (!rule || event?.isComposing === true) return;

      const inputType = event?.inputType || "";
      if (inputType.startsWith("delete")) {
        return;
      }

      const insertedValue = event?.data ?? "";
      if (insertedValue === "") return;

      if (rule.pattern.test(insertedValue)) {
        clearBlockedFieldMessage(field);
        return;
      }

      setBlockedFieldMessage(field, rule.message);
    }

    function handleRestrictedPaste(field, event) {
      const rule = getFieldRestriction(field);
      if (!rule) return;

      const pastedText = event?.clipboardData?.getData("text") || "";
      if (pastedText === "") return;

      if (sanitizeFieldValue(field, pastedText) === pastedText) {
        clearBlockedFieldMessage(field);
        return;
      }

      setBlockedFieldMessage(field, rule.message);
    }

    function handleRestrictedInput(field, event) {
      const currentValue = event?.target?.value ?? editData[field];
      const sanitizedValue = sanitizeFieldValue(field, currentValue);

      if (sanitizedValue !== currentValue) {
        const rule = getFieldRestriction(field);
        if (rule?.message) {
          setBlockedFieldMessage(field, rule.message);
        }
      } else {
        clearBlockedFieldMessage(field);
      }

      rememberLastValidValue(field, currentValue);
    }

    function currentBirthCertFileSnapshot() {
      if (birthCertFile.value) {
        return `local:${birthCertFile.value.name}:${birthCertFile.value.size}:${birthCertFile.value.lastModified}`;
      }
      const storedPdf = props.officer?.people?.birth_certificate?.pdf;
      return `stored:${normalizeString(storedPdf)}`;
    }

    function createSnapshot() {
      return {
        code: normalizeString(editData.code),
        lastname: normalizeString(editData.lastname),
        firstname: normalizeString(editData.firstname),
        enlastname: normalizeString(editData.enlastname),
        enfirstname: normalizeString(editData.enfirstname),
        countesy_id: normalizeNullableNumber(editData.countesy_id),
        gender: normalizeNumber(editData.gender, 1),
        dob: toDateString(editData.dob),
        national: normalizeString(editData.national),
        nationality: normalizeString(editData.nationality),
        pob: normalizeString(editData.pob),
        address: normalizeString(editData.address),
        current_address: normalizeString(editData.current_address),
        mobile_phone: normalizeString(editData.mobile_phone),
        email: normalizeString(editData.email),
        body_condition: normalizeNumber(editData.body_condition, 0),
        body_condition_desp: normalizeString(editData.body_condition_desp),
        nid: normalizeString(editData.nid),
        nid_start_at: toDateString(editData.nid_start_at),
        nid_expired_at: toDateString(editData.nid_expired_at),
        birth_number: normalizeString(birthCertData.birth_number),
        book_number: normalizeString(birthCertData.book_number),
        year: toDateString(birthCertData.dob),
        issued_date: toDateString(birthCertData.issued_date),
        province_id: normalizeNullableNumber(birthCertData.province_id),
        district_id: normalizeNullableNumber(birthCertData.district_id),
        commune_id: normalizeNullableNumber(birthCertData.commune_id),
        birth_cert_file: currentBirthCertFileSnapshot(),
        pdf: birthCertData.pdf,
      };
    }

    function buildOfficerCodeUpdatePayload() {
      const currentJob = props.officer?.current_job || props.officer?.job || null;
      const currentRank = props.officer?.rank || null;

      return {
        // Information of the officer
        id: editData.id,
        code: editData.code,
        countesy_id: normalizeNullableNumber(editData.countesy_id) || 0,
        additional_officer_type: props.officer?.additional_officer_type || "",
        
        // These information of the officer ,but it is not need here
        salary_rank: props.officer?.salary_rank || "",
        officer_type: props.officer?.officer_type || "",
        official_date: props.officer?.official_date || null,
        unofficial_date: props.officer?.unofficial_date || null,

        // Information of the Officer Job ,But it is not need in this component
        // organization_structure_position_id:
        //   currentJob?.organization_structure_position_id ||
        //   currentJob?.organizationStructurePosition?.id ||
        //   0,
        // organization_id: props.officer?.organization_id || 0,
        // position_id: props.officer?.position_id || 0,
        // unofficial_position_id: toNullableInt(currentJob?.unofficial_position_id),
        
        // Information of the People
        passport: props.officer?.passport || "",
        email: props.officer?.email || "",
        phone: props.officer?.phone || "",
        
        // Information about the officer rank ,But it is not need in this component
        // ank: currentRank?.ank || "",
        // krobkhan: currentRank?.krobkhan || "",
        // rank: currentRank?.rank || "",
        // thnak: currentRank?.thnak || "",
      };
    }

    function currentOfficerCountesyId() {
      return normalizeNullableNumber(
        props.officer?.countesy_id || props.officer?.countesy?.id,
      );
    }

    function shouldSyncOfficerFields() {
      return (
        normalizeString(editData.code) !== normalizeString(props.officer?.code) ||
        normalizeNullableNumber(editData.countesy_id) !== currentOfficerCountesyId()
      );
    }

    function applyOfficerFieldUpdate(record = null) {
      const previousCountesyId = currentOfficerCountesyId();
      const responseCountesyId = normalizeNullableNumber(record?.countesy_id);
      const nextCountesyId =
        responseCountesyId !== null && responseCountesyId > 0
          ? responseCountesyId
          : normalizeNullableNumber(editData.countesy_id);
      const responseCode = normalizeString(record?.code);

      props.officer.code = responseCode !== "" ? responseCode : editData.code;
      props.officer.countesy_id = nextCountesyId;
      props.officer.countesy =
        record?.countesy ??
        (nextCountesyId === previousCountesyId
          ? props.officer.countesy || null
          : resolveCountesyRecord(nextCountesyId));
      editData.countesy_id = nextCountesyId;
    }

    const changedFields = computed(() => {
      let saved = {};
      try {
        saved = JSON.parse(savedSnapshot.value || "{}");
      } catch (err) {
        saved = {};
      }
      const current = createSnapshot();
      const flags = {};
      for (const key of trackedFieldKeys) {
        flags[key] =
          JSON.stringify(current[key]) !== JSON.stringify(saved[key]);
      }
      return flags;
    });

    const hasPendingPhotoUpload = computed(
      () => selectedFile.value instanceof File,
    );

    const hasUnsavedChanges = computed(
      () =>
        trackedFieldKeys.some((key) => changedFields.value[key] === true) ||
        hasPendingPhotoUpload.value === true,
    );

    const fieldErrors = computed(() => {
      const errors = {};

      if (!hasFieldValue("lastname")) {
        errors.lastname = "សូមបំពេញគោត្តនាមជាភាសាខ្មែរ";
      } else if (!isKhmerOnly(editData.lastname)) {
        errors.lastname = "សូមបំពេញគោត្តនាមជាអក្សរខ្មែរ";
      }

      if (!hasFieldValue("firstname")) {
        errors.firstname = "សូមបំពេញនាមខ្លួនជាភាសាខ្មែរ";
      } else if (!isKhmerOnly(editData.firstname)) {
        errors.firstname = "សូមបំពេញនាមខ្លួនជាអក្សរខ្មែរ";
      }

      if (!hasFieldValue("enlastname")) {
        errors.enlastname = "សូមបំពេញគោត្តនាមជាអក្សរឡាតាំង";
      } else if (!isLatinOnly(editData.enlastname)) {
        errors.enlastname = "សូមបំពេញគោត្តនាមជាអក្សរឡាតាំងប៉ុណ្ណោះ";
      }

      if (!hasFieldValue("enfirstname")) {
        errors.enfirstname = "សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំង";
      } else if (!isLatinOnly(editData.enfirstname)) {
        errors.enfirstname = "សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំងប៉ុណ្ណោះ";
      }

      if (!hasFieldValue("countesy_id")) {
        errors.countesy_id = "សូមជ្រើសរើសងារ";
      }

      if (!editData.dob) {
        errors.dob = "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត";
      }

      if (hasFieldValue("national") && !isKhmerOnly(editData.national)) {
        errors.national = "សូមបំពេញជនជាតិជាអក្សរខ្មែរ";
      }

      if (hasFieldValue("nationality") && !isKhmerOnly(editData.nationality)) {
        errors.nationality = "សូមបំពេញសញ្ជាតិជាអក្សរខ្មែរ";
      }

      if (
        hasFieldValue("mobile_phone") &&
        !isNumericOnly(editData.mobile_phone)
      ) {
        errors.mobile_phone = "សូមបំពេញលេខទូរសព្ទជាតួលេខប៉ុណ្ណោះ";
      }

      if (!hasFieldValue("nid")) {
        errors.nid = "សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរ";
      } else if (!isAllowedNidValue(editData.nid)) {
        errors.nid =
          "សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរ ដោយអាចប្រើលេខ និងសញ្ញា ()!@#$%";
      }

      if (hasFieldValue("email") && !isValidEmail(editData.email)) {
        errors.email = "សូមបំពេញអ៊ីមែលឱ្យបានត្រឹមត្រូវ ឧ. name@example.com";
      }

      return errors;
    });

    const firstInvalidField = computed(
      () =>
        validationFieldOrder.find((field) =>
          Boolean(fieldErrors.value[field]),
        ) || "",
    );

    function changedCellClass(keys) {
      const fieldList = Array.isArray(keys) ? keys : [keys];
      return fieldList.some((key) => changedFields.value[key] === true)
        ? "changed-cell"
        : "";
    }

    function fieldChangedClass(keys) {
      const fieldList = Array.isArray(keys) ? keys : [keys];
      return fieldList.some((key) => changedFields.value[key] === true)
        ? "changed-field"
        : "border-[#D8DEE8]";
    }

    function setValidationFieldRef(field) {
      return (element) => {
        if (element) {
          validationFieldRefs[field] = element;
          return;
        }
        delete validationFieldRefs[field];
      };
    }

    function handleFieldFocus(field) {
      activeValidationField.value = field;
    }

    function handleFieldBlur(field) {
      if (activeValidationField.value === field) {
        activeValidationField.value = "";
      }
    }

    function shouldHighlightFieldError(field) {
      return Boolean(fieldErrors.value[field]);
    }

    function getFieldError(field) {
      if (blockedFieldMessages[field]) {
        return blockedFieldMessages[field];
      }
      if (fieldErrors.value[field]) {
        return fieldErrors.value[field];
      }
      return "";
    }

    function fieldInputClass(field) {
      if (shouldHighlightFieldError(field)) {
        return "validation-input-invalid";
      }
      return changedFields.value[field] === true
        ? "changed-field"
        : "border-[#D8DEE8]";
    }

    function resetFieldValidationState() {
      activeValidationField.value = "";
      validationFieldOrder.forEach((field) => {
        rememberLastValidValue(field, editData[field] ?? "");
        clearBlockedFieldMessage(field);
      });
    }

    function focusFirstInvalidField() {
      const field = firstInvalidField.value;
      if (!field) return;

      window.setTimeout(() => {
        validationFieldRefs[field]?.focus?.();
      }, 0);
    }

    function markSaved() {
      savedSnapshot.value = JSON.stringify(createSnapshot());
      resetFieldValidationState();
      emit("changed", false);
    }

    // Initialize edit data from officer prop
    const initializeEditData = () => {
      if (props.officer && props.officer.people) {
        editData.id = props.officer.id;
        editData.people_id = props.officer.people.id;
        editData.code = props.officer.code || "";
        editData.lastname = props.officer.people.lastname || "";
        editData.firstname = props.officer.people.firstname || "";
        editData.enlastname = props.officer.people.enlastname || "";
        editData.enfirstname = props.officer.people.enfirstname || "";
        editData.countesy_id =
          props.officer.countesy_id || props.officer.countesy?.id || null;
        editData.gender = normalizeNumber(props.officer.people.gender, 1);
        editData.dob = props.officer.people.dob
          ? new Date(props.officer.people.dob).getTime()
          : null;
        editData.national = props.officer.people.national || "";
        editData.nationality = props.officer.people.nationality || "";
        editData.pob = props.officer.people.pob || "";
        editData.address = props.officer.people.address || "";
        editData.current_address = props.officer.people.current_address || "";
        editData.mobile_phone = props.officer.people.mobile_phone || "";
        editData.email = props.officer.people.email || "";
        editData.body_condition = props.officer.people.body_condition ?? 0;
        editData.body_condition_desp =
          props.officer.people.body_condition_desp || "";
        editData.nid = props.officer.people.nid || "";
        editData.nid_start_at = props.officer.people.nid_start_at || "";
        editData.nid_expired_at = props.officer.people.nid_expired_at || "";
        resetFieldValidationState();
      }
    };

    // Toggle edit mode
    const toggleEdit = () => {
      isEditing.value = true;
    };

    function validateRequiredFields({ silent = false } = {}) {
      if (Object.keys(fieldErrors.value).length > 0) {
        focusFirstInvalidField();
        return false;
      }

      return true;
    }

    // Cancel edit
    const cancelEdit = () => {
      initializeEditData();
      resetFieldValidationState();
    };

    // Save changes
    const createdOfficer = ref(null)
    const createdPeople = ref(null)
    const save = async ({
      silent = false,
      markSavedAfterSuccess = true,
    } = {}) => {
      try {
        if (!validateRequiredFields({ silent })) {
          return false;
        }

        const formattedDob = editData.dob
          ? dateFormat(new Date(editData.dob), "yyyy-mm-dd")
          : null;
        const normalizedEnlastname = normalizeLatinNameForSave(
          editData.enlastname,
        );
        const normalizedEnfirstname = normalizeLatinNameForSave(
          editData.enfirstname,
        );

        let peopleResponse = null;

        if (!editData.id || !editData.people_id) {
          const createPayload = {
            code: editData.code,
            countesy_id: normalizeNullableNumber(editData.countesy_id) || 0,
            firstname: editData.firstname,
            lastname: editData.lastname,
            enfirstname: normalizedEnfirstname,
            enlastname: normalizedEnlastname,
            gender: editData.gender,
            email: editData.email,
            dob: formattedDob,
            nid: editData.nid,
            nid_start_at: toDateString(editData.nid_start_at),
            nid_expired_at: toDateString(editData.nid_expired_at),
            mobile_phone: editData.mobile_phone,
            address: editData.address,
            current_address: editData.current_address,
            pob: editData.pob,
            body_condition: String(editData.body_condition),
            body_condition_desp: editData.body_condition_desp,
            nationality: editData.nationality,
            national: editData.national,
            marry_status: props.officer?.people?.marry_status || "single",
            additional_officer_type:
              props.officer?.additional_officer_type || "admin_official",
          };

          const createResponse = await store.dispatch(
            "officer/create",
            createPayload,
          );
          if (
            createResponse?.status === 200 &&
            createResponse?.data?.ok === true
          ) {
            createdOfficer.value = createResponse.data.record || {};
            createdPeople.value = createdOfficer.value.people || {};

            props.officer.id = createdOfficer.value.id || props.officer.id;
            props.officer.public_key =
              createdOfficer.value.public_key || props.officer.public_key;
            props.officer.code = createdOfficer.value.code || props.officer.code;
            props.officer.organization_id =
              createdOfficer.value.organization_id || props.officer.organization_id;
            props.officer.position_id =
              createdOfficer.value.position_id || props.officer.position_id;
            props.officer.rank_id =
              createdOfficer.value.rank_id || props.officer.rank_id;
            props.officer.user_id =
              createdOfficer.value.user_id || props.officer.user_id;
            props.officer.email = createdOfficer.value.email || props.officer.email;
            props.officer.phone = createdOfficer.value.phone || props.officer.phone;
            props.officer.passport =
              createdOfficer.value.passport || props.officer.passport;
            props.officer.salary_rank =
              createdOfficer.value.salary_rank || props.officer.salary_rank;
            props.officer.officer_type =
              createdOfficer.value.officer_type || props.officer.officer_type;
            props.officer.additional_officer_type =
              createdOfficer.value.additional_officer_type ||
              props.officer.additional_officer_type;
            props.officer.user = createdOfficer.value.user || props.officer.user;
            props.officer.organization =
              createdOfficer.value.organization || props.officer.organization;
            props.officer.position =
              createdOfficer.value.position || props.officer.position;
            props.officer.rank = createdOfficer.value.rank || props.officer.rank;
            props.officer.jobs = createdOfficer.value.jobs || props.officer.jobs;
            applyOfficerFieldUpdate(createdOfficer.value);

            if (!props.officer.people) props.officer.people = {};
            props.officer.people.id =
              createdPeople.value.id || props.officer.people.id;
            props.officer.people.firstname =
              createdPeople.value.firstname ?? editData.firstname;
            props.officer.people.lastname =
              createdPeople.value.lastname ?? editData.lastname;
            props.officer.people.enfirstname = normalizeLatinNameForSave(
              createdPeople.value.enfirstname ?? normalizedEnfirstname,
            );
            props.officer.people.enlastname = normalizeLatinNameForSave(
              createdPeople.value.enlastname ?? normalizedEnlastname,
            );
            props.officer.people.gender =
              createdPeople.value.gender ?? editData.gender;
            props.officer.people.email = createdPeople.value.email ?? editData.email;
            props.officer.people.dob = createdPeople.value.dob ?? formattedDob;
            props.officer.people.nid = createdPeople.value.nid ?? editData.nid;
            props.officer.people.nid_start_at =
              createdPeople.value.nid_start_at ?? editData.nid_start_at;
            props.officer.people.nid_expired_at =
              createdPeople.value.nid_expired_at ?? editData.nid_expired_at;
            props.officer.people.mobile_phone =
              createdPeople.value.mobile_phone ?? editData.mobile_phone;
            props.officer.people.address =
              createdPeople.value.address ?? editData.address;
            props.officer.people.current_address =
              createdPeople.value.current_address ?? editData.current_address;
            props.officer.people.pob = createdPeople.value.pob ?? editData.pob;
            props.officer.people.body_condition =
              createdPeople.value.body_condition ?? editData.body_condition;
            props.officer.people.body_condition_desp =
              createdPeople.value.body_condition_desp ?? editData.body_condition_desp;
            props.officer.people.nationality =
              createdPeople.value.nationality ?? editData.nationality;
            props.officer.people.national =
              createdPeople.value.national ?? editData.national;
            props.officer.people.marry_status =
              createdPeople.value.marry_status ?? props.officer.people.marry_status;

            editData.id = createdOfficer.value.id || editData.id;
            editData.people_id = createdPeople.value.id || editData.people_id;

            // In create flow, ensure officer code is persisted even if
            // the create endpoint ignores/overrides code.
            if (shouldSyncOfficerFields()) {
              const officerResponse = await store.dispatch(
                "officer/update",
                buildOfficerCodeUpdatePayload(),
              );
              if (
                officerResponse?.status !== 200 ||
                officerResponse?.data?.ok !== true
              ) {
                notify.error({
                  title: "មានបញ្ហា",
                  content:
                    officerResponse?.data?.message ||
                    "មានបញ្ហាក្នុងការរក្សាទុកអត្តលេខមន្ត្រី",
                  duration: 3000,
                });
                return false;
              }
              applyOfficerFieldUpdate(officerResponse?.data?.record || null);
            }

            peopleResponse = {
              status: 200,
              data: {
                ok: true,
                record: props.officer.people,
              },
            };
          } else {
            notify.error({
              title: "មានបញ្ហា",
              content:
                createResponse?.data?.message ||
                "មានបញ្ហាក្នុងការបង្កើតព័ត៌មានមន្ត្រី",
              duration: 3000,
            });
            return false;
          }
        } else {
          const payload = {
            id: editData.people_id,
            people: {
              firstname: editData.firstname,
              lastname: editData.lastname,
              enfirstname: normalizedEnfirstname,
              enlastname: normalizedEnlastname,
              gender: editData.gender,
              email: editData.email,
              dob: formattedDob,
              nid: editData.nid,
              nid_start_at: toDateString(editData.nid_start_at),
              nid_expired_at: toDateString(editData.nid_expired_at),
              mobile_phone: editData.mobile_phone,
              address: editData.address,
              current_address: editData.current_address,
              pob: editData.pob,
              body_condition: String(editData.body_condition),
              body_condition_desp: editData.body_condition_desp,
              nationality: editData.nationality,
              national: editData.national,
            },
          };

          peopleResponse = await store.dispatch("people/update", payload);

          if (shouldSyncOfficerFields()) {
            const officerResponse = await store.dispatch(
              "officer/update",
              buildOfficerCodeUpdatePayload(),
            );
            if (
              officerResponse?.status !== 200 ||
              officerResponse?.data?.ok !== true
            ) {
              notify.error({
                title: "មានបញ្ហា",
                content:
                  officerResponse?.data?.message ||
                  "មានបញ្ហាក្នុងការរក្សាទុកអត្តលេខមន្ត្រី",
                duration: 3000,
              });
              return false;
            }
            applyOfficerFieldUpdate(officerResponse?.data?.record || null);
          }
        }

        if (peopleResponse.status === 200 && peopleResponse.data.ok === true) {
          if (!silent) {
            notify.success({
              title: "រក្សារទុករួចរាល់",
              content: "បានរក្សារទុកព័ត៌មានផ្ទាល់ខ្លួនរួចរាល់។",
              duration: 2000,
            });
          }

          // Update the officer prop data
          const updatedPeople = {
            ...(peopleResponse.data.record || {}),
            enlastname: normalizeLatinNameForSave(
              peopleResponse.data.record?.enlastname ?? normalizedEnlastname,
            ),
            enfirstname: normalizeLatinNameForSave(
              peopleResponse.data.record?.enfirstname ?? normalizedEnfirstname,
            ),
          };
          if (props.officer.people) {
            Object.assign(props.officer.people, updatedPeople);
            // Force reactivity
            props.officer.people = { ...props.officer.people };
          }

          editData.enlastname = updatedPeople.enlastname;
          editData.enfirstname = updatedPeople.enfirstname;
          props.officer.code = editData.code;

          if (markSavedAfterSuccess) {
            markSaved();
          }
          return true;
        } else {
          notify.error({
            title: "មានបញ្ហា",
            content:
              peopleResponse.data.message || "មានបញ្ហាក្នុងការរក្សារទុកព័ត៌មាន",
            duration: 3000,
          });
          return false;
        }
      } catch (error) {
        console.error("Error saving profile:", error);
        notify.error({
          title: "មានបញ្ហា",
          content: "មានបញ្ហាក្នុងការរក្សារទុកព័ត៌មាន។ សូមព្យាយាមម្តងទៀត។",
          duration: 3000,
        });
        return false;
      }
    };

    function cancelChanges() {
      initializeEditData();
      initializeBirthCertData();
      clearBirthCertFile();
      cancelFileSelect();
      markSaved();
    }

    async function persistChanges() {
      const shouldSavePersonal = personalFieldKeys.some(
        (key) => changedFields.value[key] === true,
      );
      const shouldSaveBirthCert = birthCertFieldKeys.some(
        (key) => changedFields.value[key] === true,
      );
      const shouldUploadPhoto = selectedFile.value instanceof File;
      if (!shouldSavePersonal && !shouldSaveBirthCert && !shouldUploadPhoto)
        return true;

      if (shouldSavePersonal) {
        const personalSaved = await save({
          silent: true,
          markSavedAfterSuccess: false,
        });
        if (!personalSaved) return false;
      }

      if (shouldUploadPhoto) {
        const photoSaved = await uploadPhoto();
        if (photoSaved === false) return false;
      }

      if (shouldSaveBirthCert) {
        const birthCertSaved = await saveBirthCert({
          silent: true,
          markSavedAfterSuccess: false,
        });
        if (!birthCertSaved) return false;
      }

      markSaved();
      return true;
    }

    // Profile picture upload functions
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        notify.error({
          title: "ប្រភេទឯកសារមិនត្រឹមត្រូវ",
          content: "សូមជ្រើសរើសរូបភាពប្រភេទ JPG ឬ PNG។",
          duration: 3000,
        });
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        notify.error({
          title: "ទំហំឯកសារធំពេក",
          content: "ទំហំរូបភាពមិនអាចលើសពី ៥ មេកាបៃ។",
          duration: 3000,
        });
        return;
      }

      selectedFile.value = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const cancelFileSelect = () => {
      selectedFile.value = null;
      previewImage.value = null;
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };

    const uploadPhoto = async () => {
      if (!selectedFile.value || !props.officer) return;

      isUploading.value = true;

      try {
        // Special case: create-officer flow.
        // Never upload to the authenticated user's avatar endpoint here.
        // Ensure we have an officer id first, then upload to officers/upload.
        const officerIdBefore = parseInt(props.officer?.id || 0, 10) || 0;
        if (officerIdBefore <= 0) {
          const created = await save({
            silent: true,
            markSavedAfterSuccess: false,
          });
          if (!created) {
            notify.error({
              title: "មានបញ្ហា",
              content:
                "សូមរក្សាទុកព័ត៌មានផ្ទាល់ខ្លួន (ក. ព័ត៌មានផ្ទាល់ខ្លួន) ជាមុនសិន មុនពេលដាក់រូបភាព។",
              duration: 3000,
            });
            return;
          }
        }

        const officerId = parseInt(props.officer?.id || 0, 10) || 0;
        if (officerId <= 0) {
          notify.error({
            title: "មានបញ្ហា",
            content: "មិនអាចរកឃើញលេខសម្គាល់មន្ត្រីសម្រាប់ដាក់រូបភាពបានទេ។",
            duration: 3000,
          });
          return;
        }

        // Officer photos are stored on the linked user avatar endpoint.
        // Critical: never fall back to the authenticated user here.
        let targetUserId = props.officer?.user?.id || null;

        if (!targetUserId) {
          try {
            const refetch = await store.dispatch("officer/mybackground", {
              id: officerId,
            });
            const refreshed = refetch?.data?.record;
            if (refreshed?.user) {
              props.officer.user = refreshed.user;
            }
            if (refreshed?.image) {
              props.officer.image = refreshed.image;
            }
            targetUserId =
              props.officer?.user?.id || refreshed?.user?.id || null;
          } catch (e) {
            // ignore and handle below
          }
        }

        if (!targetUserId) {
          notify.error({
            title: "មានបញ្ហា",
            content:
              "មន្ត្រីថ្មីនេះមិនទាន់មានគណនីអ្នកប្រើប្រាស់ (user) សម្រាប់ដាក់រូបភាពទេ។ សូមរក្សាទុក/បង្កើតមន្ត្រីជាមុនសិន រួចសាកល្បងម្ដងទៀត។",
            duration: 3500,
          });
          return;
        }

        const formData = new FormData();
        formData.append("id", String(targetUserId));
        formData.append("files", selectedFile.value, selectedFile.value.name);

        const response = await store.dispatch(
          "user/uploadProfilePicture",
          formData,
        );

        const avatarUrl = response?.data?.record?.avatar_url || null;
        if (avatarUrl) {
          if (props.officer.user) {
            props.officer.user.avatar_url = avatarUrl;
          }
          props.officer.image = avatarUrl;
          if (props.officer.people) {
            props.officer.people.image = avatarUrl;
          }
          notify.success({
            title: "ជោគជ័យ",
            content: "បានផ្លាស់ប្ដូររូបភាពរួចរាល់។",
            duration: 2000,
          });
          cancelFileSelect();
          return;
        }

        notify.error({
          title: "មានបញ្ហា",
          content:
            response?.data?.message || "មានបញ្ហាក្នុងការផ្លាស់ប្ដូររូបភាព។",
          duration: 3000,
        });
      } catch (error) {
        console.error("Upload error:", error);
        notify.error({
          title: "មានបញ្ហា",
          content: "មានបញ្ហាក្នុងការផ្លាស់ប្ដូររូបភាព។ សូមព្យាយាមម្តងទៀត។",
          duration: 3000,
        });
      } finally {
        isUploading.value = false;
      }
    };

    // ============ Birth Certificate Editing ============
    const bcSelectedProvince = ref(null);
    const bcSelectedDistrict = ref(null);
    const birthCertFile = ref(null);

    function onBirthCertToolbarSelect(file) {
      if (!file) return;
      birthCertFile.value = file;
    }

    function clearBirthCertFile() {
      birthCertFile.value = null;
    }

    // Birth certificate data
    const birthCertData = reactive({
      id: null,
      people_id: null,
      birth_number: "",
      book_number: "",
      dob: null,
      issued_date: null,
      province_id: null,
      district_id: null,
      commune_id: null,
      pdf: null,
    });

    const birthCertYearForInput = computed({
      get() {
        if (!birthCertData.dob) return "";
        const d = new Date(birthCertData.dob);
        return Number.isNaN(d.getTime()) ? "" : dateFormat(d, "yyyy-mm-dd");
      },
      set(v) {
        birthCertData.dob = v ? new Date(v).getTime() : null;
      },
    });

    const birthCertIssuedDateForInput = computed({
      get() {
        if (!birthCertData.issued_date) return "";
        const d = new Date(birthCertData.issued_date);
        return Number.isNaN(d.getTime()) ? "" : dateFormat(d, "yyyy-mm-dd");
      },
      set(v) {
        birthCertData.issued_date = v ? new Date(v).getTime() : null;
      },
    });

    function getProvinceRecords() {
      return store.getters["province/records"]?.all || [];
    }

    function getDistrictRecords() {
      return store.getters["district/records"]?.all || [];
    }

    function getCommuneRecords() {
      return store.getters["commune/records"]?.all || [];
    }

    function getVillageRecords() {
      return store.getters["village/records"]?.all || [];
    }

    function getOfficerBirthCertificateRecord() {
      // const directBirthCert = props.officer?.people?.birth_certificate;
      const directBirthCert = props.officer?.people?.selfBirthCertificates?.length > 0 ? props.officer?.people?.selfBirthCertificates[0] : undefined ;
      if (directBirthCert && typeof directBirthCert === "object") {
        return directBirthCert;
      }

      const birthCertificates = props.officer?.people?.birth_certificates;
      if (Array.isArray(birthCertificates) && birthCertificates.length > 0) {
        return birthCertificates[birthCertificates.length - 1];
      }

      if (birthCertificates && typeof birthCertificates === "object") {
        return birthCertificates;
      }

      return null;
    }

    function syncOfficerBirthCertificateRecord(record) {
      if (!props.officer?.people || !record) return;

      props.officer.people.birth_certificate = {
        ...(props.officer.people.birth_certificate || {}),
        ...record,
      };

      if (Array.isArray(props.officer.people.birth_certificates)) {
        if (props.officer.people.birth_certificates.length === 0) {
          props.officer.people.birth_certificates = [
            props.officer.people.birth_certificate,
          ];
        } else {
          props.officer.people.birth_certificates.splice(
            props.officer.people.birth_certificates.length - 1,
            1,
            props.officer.people.birth_certificate,
          );
        }
      } else {
        props.officer.people.birth_certificates = [
          props.officer.people.birth_certificate,
        ];
      }
    }

    function syncBirthCertLocationSelection() {
      const provinces = getProvinceRecords();
      const districts = getDistrictRecords();
      const communes = getCommuneRecords();

      bcSelectedProvince.value =
        provinces.find((p) => p.id == birthCertData.province_id) || null;
      bcSelectedDistrict.value =
        districts.find((d) => d.id == birthCertData.district_id) || null;

      if (
        birthCertData.district_id &&
        bcSelectedProvince.value &&
        bcSelectedDistrict.value &&
        bcSelectedDistrict.value.province_id != bcSelectedProvince.value.id
      ) {
        birthCertData.district_id = null;
        birthCertData.commune_id = null;
        bcSelectedDistrict.value = null;
      }

      if (
        birthCertData.commune_id &&
        bcSelectedDistrict.value &&
        !communes.some(
          (c) =>
            c.id == birthCertData.commune_id &&
            c.district_id == bcSelectedDistrict.value.id,
        )
      ) {
        birthCertData.commune_id = null;
      }
    }

    const selectedProvinceId = computed(
      () => parseInt(birthCertData.province_id || 0, 10) || 0,
    );
    const selectedDistrictId = computed(
      () => parseInt(birthCertData.district_id || 0, 10) || 0,
    );

    // Province options for birth certificate
    const bcProvinceOptions = computed(() => {
      const provinces = getProvinceRecords();
      if (provinces.length > 0) {
        return provinces.map((p) => ({ label: p.name_kh, value: p.id }));
      }
      return [];
    });

    // District options filtered by selected province
    const bcDistrictOptions = computed(() => {
      const districts = getDistrictRecords();
      if (selectedProvinceId.value > 0) {
        return districts
          .filter((d) => d.province_id == selectedProvinceId.value)
          .map((d) => ({ label: d.name_kh, value: d.id }));
      }
      return [{ label: "សូមជ្រើសរើស ខេត្ត ឬ ក្រុង ជាមុនសិន", value: null }];
    });

    // Commune options filtered by selected district
    const bcCommuneOptions = computed(() => {
      const communes = getCommuneRecords();
      if (selectedDistrictId.value > 0) {
        return communes
          .filter((c) => c.district_id == selectedDistrictId.value)
          .map((c) => ({ label: c.name_kh, value: c.id }));
      }
      return [{ label: "សូមជ្រើសរើស ស្រុក ឬ ខណ្ឌ ជាមុនសិន", value: null }];
    });

    // Initialize birth certificate data
    const initializeBirthCertData = () => {
      if (props.officer && props.officer.people) {
        const bc = getOfficerBirthCertificateRecord();
        birthCertFile.value = null;
        birthCertData.people_id = props.officer.people.id;
        if (bc) {
          birthCertData.id = bc.id;
          birthCertData.birth_number = bc.birth_number || "";
          birthCertData.book_number = bc.book_number || "";
          birthCertData.dob = bc.year ? new Date(bc.year).getTime() : null;
          birthCertData.issued_date = bc.issued_date
            ? new Date(bc.issued_date).getTime()
            : null;
          birthCertData.province_id = bc.province_id || null;
          birthCertData.district_id = bc.district_id || null;
          birthCertData.commune_id = bc.commune_id || null;
          birthCertData.pdf = bc.pdf || null;
        } else {
          birthCertData.id = null;
          birthCertData.birth_number = "";
          birthCertData.book_number = "";
          birthCertData.dob = null;
          birthCertData.issued_date = null;
          birthCertData.province_id = null;
          birthCertData.district_id = null;
          birthCertData.commune_id = null;
          birthCertData.pdf = null;
          bcSelectedProvince.value = null;
          bcSelectedDistrict.value = null;
        }
      }
      syncBirthCertLocationSelection();
    };

    // Set province and reset district/commune
    const bcSetProvince = () => {
      bcSelectedProvince.value =
        getProvinceRecords().find((p) => p.id == birthCertData.province_id) ||
        null;
      bcSelectedDistrict.value = null;
      birthCertData.district_id = null;
      birthCertData.commune_id = null;
    };

    // Set district and reset commune
    const bcSetDistrict = () => {
      bcSelectedDistrict.value =
        getDistrictRecords().find((d) => d.id == birthCertData.district_id) ||
        null;
      birthCertData.commune_id = null;
    };

    watch(
      () => props.officer,
      (newOfficer) => {
        if (newOfficer && newOfficer.people) {
          initializeEditData();
          initializeBirthCertData();
          markSaved();
        }
      },
      { immediate: true },
    );

    watch(
      hasUnsavedChanges,
      (changed) => {
        emit("changed", changed === true);
      },
      { immediate: true },
    );

    watch(
      () => [
        getProvinceRecords().length,
        getDistrictRecords().length,
        getCommuneRecords().length,
        getVillageRecords().length,
      ],
      () => {
        syncBirthCertLocationSelection();
      },
    );

    // Save birth certificate
    const saveBirthCert = async ({
      silent = false,
      markSavedAfterSuccess = true,
    } = {}) => {
      try {
        const peopleId = parseInt(birthCertData.people_id) > 0
          ? birthCertData.people_id
          : (
            createdOfficer.value != undefined && createdOfficer.value.people != undefined && createdOfficer.value.people.id > 0
              ? createdOfficer.value.people.id
              : false
          );
        if (peopleId === false) {
          notify.error({
            title: "ព័ត៌មានមន្ត្រី",
            content:
              "រក្សាទុកព័ត៌មានមិនបាន សូមព្យាយាមភ្ជាប់ឯកសារម្តងទៀត។",
            duration: 3000,
          });
          return false;
        }
        const payload = {
          people_id: peopleId ,
          birth_number: birthCertData.birth_number,
          book_number: birthCertData.book_number,
          year: birthCertData.dob
            ? dateFormat(new Date(birthCertData.dob), "yyyy-mm-dd")
            : null,
          issued_date: birthCertData.issued_date
            ? dateFormat(new Date(birthCertData.issued_date), "yyyy-mm-dd")
            : null,
          province_id: birthCertData.province_id,
          district_id: birthCertData.district_id,
          commune_id: birthCertData.commune_id,
          pdf: birthCertData.pdf,
          wedding_certificate_id: null, // Officer's own birth cert, not child's
        };

        let response;
        if (birthCertData.id) {
          // Update existing
          payload.id = birthCertData.id;
          response = await store.dispatch("birthcertificate/update", payload);
        } else {
          // Create new
          response = await store.dispatch("birthcertificate/create", payload);
        }

        if (response.data && response.data.ok) {
          const record = response.data.record;
          birthCertData.id = record.id || birthCertData.id;
          birthCertData.people_id = record.people_id || birthCertData.people_id;
          birthCertData.birth_number = record.birth_number || "";
          birthCertData.book_number = record.book_number || "";
          birthCertData.dob = record.year ? new Date(record.year).getTime() : null;
          birthCertData.issued_date = record.issued_date
            ? new Date(record.issued_date).getTime()
            : null;
          birthCertData.province_id = record.province_id || null;
          birthCertData.district_id = record.district_id || null;
          birthCertData.commune_id = record.commune_id || null;
          birthCertData.pdf = record.pdf || null;

          const provinces = store.getters["province/records"];
          const districts = store.getters["district/records"];
          const communes = store.getters["commune/records"];
          const syncedRecord = {
            ...record,
            province:
              provinces && provinces.all
                ? provinces.all.find((p) => p.id == record.province_id) || null
                : null,
            district:
              districts && districts.all
                ? districts.all.find((d) => d.id == record.district_id) || null
                : null,
            commune:
              communes && communes.all
                ? communes.all.find((c) => c.id == record.commune_id) || null
                : null,
          };
          syncOfficerBirthCertificateRecord(syncedRecord);
          console.log( record )
          // return false
          // Upload attached birth certificate file if selected
          if (birthCertFile.value) {
            try {
              const formData = new FormData();
              formData.append("id", record.id);
              formData.append(
                "file",
                birthCertFile.value,
                birthCertFile.value.name,
              );
              const uploadRes = await store.dispatch(
                "birthcertificate/upload",
                formData,
              );
              if (
                uploadRes.data &&
                uploadRes.data.record &&
                uploadRes.data.record.pdf
              ) {
                birthCertData.pdf = uploadRes.data.record.pdf;
                syncOfficerBirthCertificateRecord({
                  ...syncedRecord,
                  pdf: uploadRes.data.record.pdf,
                });
              }
              clearBirthCertFile();
            } catch (uploadErr) {
              console.error("Birth certificate upload error:", uploadErr);
              notify.error({
                title: "ឯកសារភ្ជាប់",
                content:
                  "រក្សាទុកព័ត៌មានបាន តែមានបញ្ហាក្នុងការផ្ទុកឯកសារ។ សូមព្យាយាមភ្ជាប់ឯកសារម្តងទៀត។",
                duration: 3000,
              });
            }
          }

          if (!silent) {
            notify.success({
              title: "ជោគជ័យ",
              content: "បានរក្សាទុកព័ត៌មានសំបុត្រកំណើតរួចរាល់។",
              duration: 2000,
            });
          }

          if (markSavedAfterSuccess) {
            markSaved();
          }
          return true;
        } else {
          notify.error({
            title: "មានបញ្ហា",
            content:
              response.data?.message || "មានបញ្ហាក្នុងការរក្សាទុកព័ត៌មាន។",
            duration: 3000,
          });
          return false;
        }
      } catch (error) {
        console.error("Save birth certificate error:", error);
        notify.error({
          title: "មានបញ្ហា",
          content: "មានបញ្ហាក្នុងការរក្សាទុកព័ត៌មាន។ សូមព្យាយាមម្តងទៀត។",
          duration: 3000,
        });
        return false;
      }
    };

    /**
     * Upload functions
     */
    /**
     * File upload
     */
    const model = reactive({
      name: "birthcertificate",
      module: "birthcertificates",
      title: "អត្រានុកុលដ្ឋានកូន",
    });
    const certificates = computed(() => {
      return store.getters[model.name + "/getRecords"];
    });

    const selectedCertificate = ref(null);
    const pdfToggle = ref(false);
    function togglePdfModal(cert) {
      selectedCertificate.value =
        cert == undefined || cert == null ? null : cert;
      pdfToggle.value = !pdfToggle.value;
    }
    const uploadHelper = ref(false);
    function uploadToggler(certificate) {
      uploadHelper.value = !uploadHelper.value;
      if (certificate == null || certificate == undefined) {
      } else {
        selectedCertificate.value = certificate;
      }
    }

    const pdfs = ref([]);
    /**
     * On change
     */
    function fileChange(event) {
      for (const file of event.target.files) {
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [
          /**
           * Image mime type
           */
          // 'image/jpeg', 'image/png'
          /**
           * Application file mime type
           */
          "application/pdf",
        ];

        // allowed max size in MB
        let allowed_size_mb = 25;

        // Validate file type
        if (allowed_mime_types.indexOf(file.type) == -1) {
          notify.error({
            title: "ឯកសារយោង",
            description:
              "ឯកសារនេះជាប្រភេទ៖ " +
              file.type +
              "។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។",
            duration: 3000,
          });
          return;
        }

        // Validate file size
        if (file.size > allowed_size_mb * 1024 * 1024) {
          notify.error({
            title: "ឯកសារយោង",
            description:
              "ទំហំនៃឯកសារគឺ៖ " +
              (file.size / 1024 / 1024).toFixed(2) +
              " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។",
            duration: 3000,
          });
          return;
        }

        let reader = new FileReader();
        reader.onerror = function (e) {
          console.log("On error");
        };
        reader.onprogress = function (e) {
          console.log("On progress");
        };
        reader.onabort = function (e) {
          console.log("On abort");
        };
        reader.onloadstart = function (e) {
          console.log("On load start");
        };
        reader.onload = function (e) {
          // Ensure that the progress bar displays 100% at the end.
          console.log("On load");
          /**
           * Read binary string from 'e.target.result' and convert to base64
           */
          pdfs.value.push(btoa(e.target.result));
          // formData.append('files', btoa( e.target.result ) )
        };
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // props.record.pdfs.push( window.URL.createObjectURL( file ) )
        pdfs.value.push(file);
      }
    }
    /**
     * On click file upload
     */
    function clickUpload() {
      document.getElementById("referenceDocument").click();
    }
    function uploadFiles() {
      let formData = new FormData();
      formData.append("id", selectedCertificate.value.id);
      formData.append("file", pdfs.value[0]);
      notify.info({
        title: "រក្សារទុកព័ត៌មាន",
        description: "កំពុងបញ្ចូលឯកសារយោង។",
        duration: 3000,
      });
      store
        .dispatch(model.name + "/upload", formData)
        .then((res) => {
          notify.success({
            title: "រក្សារទុកព័ត៌មាន",
            description: "បានបញ្ចូលឯកសារយោងរួចរាល់។",
            duration: 3000,
          });
          pdfs.value = [];
          getCertificates();
        })
        .catch((err) => {
          console.log(err);
          notify.error({
            title: "រក្សារទុកព័ត៌មាន",
            description: "មានបញ្ហាពេលបញ្ចូលឯកសារយោង។",
            duration: 3000,
          });
        });
      uploadHelper.value = false;
    }
    // End Upload

    const birthCertStoredRecord = computed(() => {
      if (birthCertData.id && birthCertData.pdf) {
        return {
          id: birthCertData.id,
          pdf: birthCertData.pdf,
        };
      }

      const directBirthCert = props.officer?.people?.birth_certificate;
      if (directBirthCert?.id && directBirthCert?.pdf) {
        return directBirthCert;
      }

      const birthCertificates = props.officer?.people?.birth_certificates;
      if (Array.isArray(birthCertificates) && birthCertificates.length > 0) {
        const latestBirthCert = birthCertificates[birthCertificates.length - 1];
        if (latestBirthCert?.id && latestBirthCert?.pdf) {
          return latestBirthCert;
        }
      }

      return null;
    });

    const canPreviewBirthCert = computed(
      () =>
        birthCertFile.value instanceof File ||
        birthCertStoredRecord.value != null,
    );
    const canDownloadBirthCert = computed(
      () => birthCertFile.value instanceof File || canPreviewBirthCert.value,
    );

    function openBirthCertPdfPreview() {
      if (!canPreviewBirthCert.value) return;
      let cert = birthCertStoredRecord.value || birthCertData;
      if (birthCertFile.value instanceof File) {
        cert = {
          ...birthCertData,
          __localPdfFile: birthCertFile.value,
          pdf: birthCertData.pdf || birthCertFile.value.name,
        };
      }
      togglePdfModal(cert);
    }

    function triggerBrowserDownload(url, filename) {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    async function downloadBirthCert() {
      try {
        if (birthCertFile.value instanceof File) {
          const objectUrl = window.URL.createObjectURL(birthCertFile.value);
          triggerBrowserDownload(
            objectUrl,
            birthCertFile.value.name || "birth-certificate",
          );
          window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
          return;
        }

        const record = birthCertStoredRecord.value;
        if (!record?.id || !record?.pdf) {
          notify.warning({
            title: "Birth Certificate",
            content: "No attachment is available to download.",
            duration: 3000,
          });
          return;
        }

        const res = await store.dispatch(`${model.name}/pdf`, {
          id: record.id,
        });
        const fileUrl = res?.data?.pdf;
        if (!fileUrl) {
          throw new Error("Birth certificate file URL is missing");
        }

        triggerBrowserDownload(
          fileUrl,
          res?.data?.filename || `birth-certificate-${record.id}.pdf`,
        );
      } catch (error) {
        console.error("Birth certificate download error:", error);
        notify.error({
          title: "Birth Certificate",
          content: "Unable to download the attachment.",
          duration: 3000,
        });
      }
    }

    return {
      model,
      pdfToggle,
      togglePdfModal,
      selectedCertificate,
      birthCertStoredRecord,
      canPreviewBirthCert,
      canDownloadBirthCert,
      downloadBirthCert,

      dateFormat,
      activeTab,
      updateTabFormRef,
      updateTabModel,
      handleUpdateTabClose,
      handleTabTwoCancel,
      handleTabTwoSave,
      isEditing,
      editData,
      countesyOptions,
      genderOptions,
      dobForInput,
      birthCertYearForInput,
      birthCertIssuedDateForInput,
      changedCellClass,
      fieldChangedClass,
      fieldInputClass,
      hasUnsavedChanges,
      toggleEdit,
      cancelEdit,
      save,
      cancelChanges,
      persistChanges,
      validateRequiredFields,
      markSaved,
      setValidationFieldRef,
      handleRestrictedKeydown,
      handleRestrictedBeforeInput,
      handleRestrictedPaste,
      handleRestrictedInput,
      handleFieldFocus,
      handleFieldBlur,
      getFieldError,
      ocmLogoUrl,
      // Profile picture upload
      fileInput,
      selectedFile,
      previewImage,
      isUploading,
      triggerFileInput,
      handleFileSelect,
      cancelFileSelect,
      uploadPhoto,
      // Birth certificate
      birthCertData,
      bcProvinceOptions,
      bcDistrictOptions,
      bcCommuneOptions,
      bcSetProvince,
      bcSetDistrict,
      saveBirthCert,
      birthCertFile,
      onBirthCertToolbarSelect,
      openBirthCertPdfPreview,
      clearBirthCertFile,
    };
  },
};
</script>
<style scoped>
.field-input {
  height: 32px;
  box-sizing: border-box;
  text-align: left;
}

.field-input-textarea {
  min-height: 72px;
  height: auto;
  resize: vertical;
}

.changed-cell {
  background: transparent;
  box-shadow: none;
}

.validation-input-invalid {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

.changed-field {
  border-color: #d8dee8 !important;
  box-shadow: none;
}

:deep(.changed-field .n-base-selection) {
  border-color: #d8dee8 !important;
  box-shadow: none;
}

:deep(.uniform-select .n-base-selection) {
  min-height: 32px !important;
  height: 32px !important;
  box-sizing: border-box;
  background-color: #fff !important;
}

:deep(.uniform-select .n-base-selection-label) {
  height: 100%;
  background-color: #fff !important;
}
.tbl-profile tr td {
  @apply text-left;
}
</style>
