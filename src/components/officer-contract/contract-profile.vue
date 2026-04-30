<template>
  <div class="birth-information">
    <Transition name="slide-fade">
      <div
        v-if="officer != null"
        class="absolute left-0 right-0 bottom-0 top-0 flex overflow-hidden"
      >
        <div
          class="flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden border border-gray-400 rounded p-4 m-4 w-full"
          @pointerdown.capture="markFormInteraction"
          @keydown.capture="markFormInteraction"
          @input.capture="markFormInteraction"
          @change.capture="markFormInteraction"
        >
          <div
            class="flex title-bar border-b border-gray-200 bg-white items-center w-full mb-4 flex-shrink-0"
          >
            <div class="w-full font-moul pb-2 text-lg">
              ប្រវត្តិរូបសង្ខេបមន្ត្រីជាប់កិច្ចសន្យា
            </div>
            <div class="flex flex-1 justify-end items-center gap-1 pb-2">
              <router-link
                to="/officer-contract"
                class="w-24 bg-blue-50 py-2 px-6 border border-blue-400 rounded hover:bg-blue-100 duration-500 hover:text-blue-600"
              >
                បញ្ជីមន្ត្រី
              </router-link>
              <!-- <a
                v-if="officer"
                href="#"
                class="w-24 bg-blue-50 py-2 px-6 border border-blue-400 rounded hover:bg-blue-100 duration-500 hover:text-blue-600"
                @click.prevent="openPrintProfile"
              >បោះពុម្ព</a> -->
              <a
                v-if="officer != undefined"
                href="#"
                class="w-32 bg-emerald-50 py-2 px-6 border border-emerald-500 rounded hover:bg-emerald-100 duration-500 hover:text-emerald-700"
                @click.prevent="openContractPrintProfile(officer)"
                >បោះពុម្ភ</a
              >
            </div>
          </div>

          <div class="flex-1 min-h-0 flex flex-col min-w-0 pb-8">
            <n-scrollbar class="flex-1 min-h-0">
              <div :class="['body', hasFormChanges ? 'pb-24' : 'pb-8']">
                <!-- ក — match profile-component layout -->
                <section class="w-full">
                  <div class="form-panel bg-white shadow w-full">
                    <div class="w-full">
                      <div class="flex items-center justify-between pb-2">
                        <h3 class="font-moul text-lg text-[#1E3A8A]">
                          ក. ព័ត៌មានផ្ទាល់ខ្លួន
                        </h3>
                      </div>
                      <div class="px-4 pb-4">
                        <div class="flex flex-nowrap gap-4 overflow-x-auto">
                          <div class="min-w-max">
                            <table
                              class="tbl-profile w-full min-w-max border-collapse"
                              style="border-spacing: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td class="w-48">ឈ្មោះជាភាសាខ្មែរ</td>
                                  <td
                                    colspan="4"
                                    :class="[
                                      'p-1',
                                      changedCellClass([
                                        'lastname',
                                        'firstname',
                                        'gender',
                                        'national',
                                      ]),
                                    ]"
                                  >
                                    <div
                                      class="flex flex-wrap items-start justify-start gap-x-4 gap-y-2"
                                    >
                                      <div
                                        class="flex min-w-0 flex-nowrap items-start leading-8 gap-1"
                                      >
                                        <div class="w-32 shrink-0 pt-0.5">
                                          គោត្តនាម ៖
                                        </div>
                                        <div class="flex min-w-0 flex-col">
                                          <input
                                            v-model="form.lastname"
                                            type="text"
                                            placeholder="គោត្តនាម"
                                            :ref="
                                              setValidationFieldRef('lastname')
                                            "
                                            :class="[
                                              'field-input w-24 border rounded px-2 text-[13px] bg-white',
                                              fieldInputClass('lastname'),
                                            ]"
                                          />
                                          <p
                                            v-if="getFieldError('lastname')"
                                            class="pt-1 text-left text-[11px] text-red-600"
                                          >
                                            {{ getFieldError("lastname") }}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        class="flex min-w-0 flex-nowrap items-start leading-8 gap-1"
                                      >
                                        <div class="w-28 shrink-0 pt-0.5">
                                          នាមខ្លួន ៖
                                        </div>
                                        <div class="flex min-w-0 flex-col">
                                          <input
                                            v-model="form.firstname"
                                            type="text"
                                            placeholder="នាមខ្លួន"
                                            :ref="
                                              setValidationFieldRef('firstname')
                                            "
                                            :class="[
                                              'field-input w-36 border rounded px-2 text-[13px] bg-white',
                                              fieldInputClass('firstname'),
                                            ]"
                                          />
                                          <p
                                            v-if="getFieldError('firstname')"
                                            class="pt-1 text-left text-[11px] text-red-600"
                                          >
                                            {{ getFieldError("firstname") }}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        class="inline-flex items-center gap-2 flex-nowrap min-w-0"
                                      >
                                        <div
                                          class="text-[13px] whitespace-nowrap"
                                        >
                                          ភេទ ៖
                                        </div>
                                        <n-select
                                          v-model:value="form.gender"
                                          :options="genderOptions"
                                          size="small"
                                          :class="[
                                            'w-36 uniform-select shrink-0',
                                            fieldChangedClass('gender'),
                                          ]"
                                          placeholder="ជ្រើសរើសភេទ"
                                        />
                                        <div
                                          class="text-[13px] whitespace-nowrap ml-1"
                                        >
                                          សញ្ជាតិ ៖
                                        </div>
                                        <input
                                          v-model="form.national"
                                          type="text"
                                          placeholder="សញ្ជាតិ"
                                          :class="[
                                            'field-input w-28 min-h-[32px] box-border border rounded px-2 text-[13px] bg-white',
                                            fieldInputClass('national'),
                                          ]"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="w-48">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                                  <td
                                    :class="[
                                      'p-1',
                                      changedCellClass([
                                        'enlastname',
                                        'enfirstname',
                                      ]),
                                    ]"
                                  >
                                    <div
                                      class="flex flex-wrap items-start justify-start gap-x-4 gap-y-2"
                                    >
                                      <div
                                        class="flex min-w-0 flex-nowrap items-start leading-8 gap-1"
                                      >
                                        <div class="w-32 shrink-0 pt-0.5">
                                          គោត្តនាមជាឡាតាំង ៖
                                        </div>
                                        <div class="flex min-w-0 flex-col">
                                          <input
                                            v-model="form.enlastname"
                                            type="text"
                                            placeholder="Last Name"
                                            :ref="
                                              setValidationFieldRef(
                                                'enlastname',
                                              )
                                            "
                                            :class="[
                                              'field-input w-24 border rounded px-2 text-[13px] bg-white',
                                              fieldInputClass('enlastname'),
                                            ]"
                                          />
                                          <p
                                            v-if="getFieldError('enlastname')"
                                            class="pt-1 text-left text-[11px] text-red-600"
                                          >
                                            {{ getFieldError("enlastname") }}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        class="flex min-w-0 flex-nowrap items-start leading-8 gap-1"
                                      >
                                        <div class="w-28 shrink-0 pt-0.5">
                                          នាមខ្លួនជាឡាតាំង ៖
                                        </div>
                                        <div class="flex min-w-0 flex-col">
                                          <input
                                            v-model="form.enfirstname"
                                            type="text"
                                            placeholder="First Name"
                                            :ref="
                                              setValidationFieldRef(
                                                'enfirstname',
                                              )
                                            "
                                            :class="[
                                              'field-input w-36 border rounded px-2 text-[13px] bg-white',
                                              fieldInputClass('enfirstname'),
                                            ]"
                                          />
                                          <p
                                            v-if="getFieldError('enfirstname')"
                                            class="pt-1 text-left text-[11px] text-red-600"
                                          >
                                            {{ getFieldError("enfirstname") }}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="w-48">ថ្ងៃខែឆ្នាំកំណើត</td>
                                  <td
                                    colspan="2"
                                    :class="['p-1', changedCellClass('dob')]"
                                  >
                                    <div
                                      class="mr-6 flex w-40 min-w-0 flex-col"
                                    >
                                      <officer-date-input
                                        :ref="setValidationFieldRef('dob')"
                                        v-model="dobForInput"
                                        wrapper-class="relative inline-block w-full align-middle"
                                        :input-class="dobInputClass"
                                      />
                                      <p
                                        v-if="getFieldError('dob')"
                                        class="pt-1 text-left text-[11px] text-red-600"
                                      >
                                        {{ getFieldError("dob") }}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="w-48">ទីកន្លែងកំណើត</td>
                                  <!-- <td
                                    colspan="3"
                                    :class="['pt-1', changedCellClass('pob')]"
                                  >
                                    <textarea
                                      v-model="form.pob"
                                      placeholder="ទីកន្លែងកំណើត"
                                      :class="[
                                        'field-input field-input-textarea w-4/5 border rounded px-2 py-1.5 text-[13px] bg-white resize-y',
                                        fieldChangedClass('pob'),
                                      ]"
                                      rows="2"
                                    />
                                  </td> -->
                                  <td
                                    colspan="3"
                                    :class="['pt-0', changedCellClass('pob')]"
                                  >
                                    <textarea
                                      v-model="form.pob"
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
                                  <td class="w-48">កម្រិតវប្បធម៌</td>
                                  <td
                                    colspan="3"
                                    :class="[
                                      'pt-0 p-1',
                                      changedCellClass('education_level'),
                                    ]"
                                  >
                                    <n-select
                                      v-model:value="form.education_level"
                                      filterable
                                      clearable
                                      :options="optionEducationLevels"
                                      placeholder="ជ្រើសរើសកម្រិតវប្បធម៌"
                                      :class="[
                                        'w-4/5 uniform-select',
                                        fieldInputClass('education_level'),
                                      ]"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td class="w-48">ឯកសារកំណត់អត្តសញ្ញាណ</td>
                                  <td
                                    colspan="3"
                                    :class="[
                                      'p-1',
                                      changedCellClass(['nid', 'passport']),
                                    ]"
                                  >
                                    <div
                                      class="flex flex-wrap items-start gap-x-3 gap-y-2 leading-8"
                                    >
                                      <div
                                        class="flex min-w-0 flex-nowrap items-start leading-8 gap-2"
                                      >
                                        <div class="w-32 shrink-0 pt-0.5">
                                          លេខអត្តសញ្ញាណប័ណ្ណ ៖
                                        </div>
                                        <div class="flex min-w-0 flex-col">
                                          <input
                                            v-model="form.nid"
                                            type="text"
                                            :ref="setValidationFieldRef('nid')"
                                            :class="[
                                              'field-input w-48 min-h-[32px] box-border border rounded px-2 text-[13px] bg-white',
                                              fieldInputClass('nid'),
                                            ]"
                                            placeholder="លេខអត្តសញ្ញាណប័ណ្ណ"
                                          />
                                          <p
                                            v-if="getFieldError('nid')"
                                            class="pt-1 text-left text-[11px] text-red-600"
                                          >
                                            {{ getFieldError("nid") }}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        class="flex min-w-0 flex-nowrap items-start leading-8 gap-2"
                                      >
                                        <div class="w-32 shrink-0 pt-0.5">
                                          លិខិតឆ្លងដែន ៖
                                        </div>
                                        <div class="flex min-w-0 flex-col">
                                          <input
                                            v-model="form.passport"
                                            type="text"
                                            :class="[
                                              'field-input w-48 min-h-[32px] box-border border rounded px-2 text-[13px] bg-white',
                                              fieldInputClass('passport'),
                                            ]"
                                            placeholder="លេខលិខិតឆ្លងដែន (បើមាន)"
                                          />
                                          <p
                                            v-if="getFieldError('passport')"
                                            class="pt-1 text-left text-[11px] text-red-600"
                                          >
                                            {{ getFieldError("passport") }}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="w-48">
                                    អង្គភាព/ទីកន្លែងបំពេញការងារ
                                  </td>
                                  <td
                                    colspan="3"
                                    :class="[
                                      'pt-0 p-1',
                                      changedCellClass('workplace'),
                                    ]"
                                  >
                                    <div
                                      class="flex w-4/5 min-w-0 max-w-full flex-col"
                                    >
                                      <n-select
                                        v-model:value="form.workplace"
                                        :options="organizationOptions"
                                        :loading="organizationLoading"
                                        filterable
                                        clearable
                                        placeholder="ជ្រើសរើសអង្គភាព/ទីកន្លែងបំពេញការងារ"
                                        :ref="
                                          setValidationFieldRef('workplace')
                                        "
                                        :class="[
                                          'w-full uniform-select',
                                          fieldInputClass('workplace'),
                                        ]"
                                      />
                                      <p
                                        v-if="getFieldError('workplace')"
                                        class="pt-1 text-left text-[11px] text-red-600"
                                      >
                                        {{ getFieldError("workplace") }}
                                      </p>
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
                                  previewImage || officer?.image || ocmLogoUrl
                                "
                                class="w-full h-full object-cover border border-gray-200"
                              />
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
                                <span class="text-white text-xs"
                                  >ប្ដូររូបភាព</span
                                >
                              </div>
                              <input
                                ref="fileInput"
                                type="file"
                                accept="image/jpeg,image/png"
                                class="hidden"
                                @change="handleFileSelect"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- ខ — match profile form-panel + title strip -->
                <section class="w-full">
                  <div class="form-panel bg-white shadow w-full">
                    <div class="w-full">
                      <div class="flex flex-row items-center gap-4 pt-[2%]">
                        <div
                          class="font-moul text-[#1E3A8A] text-lg leading-tight whitespace-nowrap"
                        >
                          ខ. ព័ត៌មានទំនាក់ទំនង
                        </div>
                      </div>
                      <div class="px-4 pb-4">
                        <div class="flex flex-nowrap gap-4 overflow-x-auto">
                          <div class="min-w-max">
                            <table
                              class="tbl-profile w-full min-w-max border-collapse"
                              style="border-spacing: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td class="w-48">អាសយដ្ឋានបច្ចុប្បន្ន</td>
                                  <td
                                    colspan="3"
                                    :class="[
                                      'pt-1',
                                      changedCellClass('address'),
                                    ]"
                                  >
                                    <textarea
                                      v-model="form.address"
                                      placeholder="អាសយដ្ឋានបច្ចុប្បន្ន"
                                      :class="[
                                        'field-input field-input-textarea w-[100%] border rounded px-2 py-1.5 text-[13px] bg-white resize-y',
                                        fieldChangedClass('address'),
                                      ]"
                                      rows="2"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td class="w-48">លេខទូរស័ព្ទ</td>
                                  <td
                                    colspan="2"
                                    :class="[
                                      'pt-0 p-1',
                                      changedCellClass([
                                        'mobile_phone',
                                        'email',
                                      ]),
                                    ]"
                                  >
                                    <input
                                      v-model="form.mobile_phone"
                                      type="text"
                                      inputmode="numeric"
                                      placeholder="លេខទូរសព្ទ"
                                      :class="[
                                        'field-input w-40 min-h-[32px] box-border border rounded px-2 text-[13px] bg-white mr-4 align-middle',
                                        fieldInputClass('mobile_phone'),
                                      ]"
                                    />
                                    អ៉ីម៉ែល
                                    <input
                                      v-model="form.email"
                                      type="text"
                                      placeholder="អ៉ីមែល"
                                      :class="[
                                        'field-input w-60 min-h-[32px] box-border border rounded px-2 text-[13px] bg-white ml-4 align-middle',
                                        fieldInputClass('email'),
                                      ]"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div class="w-full relative mt-8 min-h-[18rem]">
                  <div class="absolute left-0 top-0 w-80" />
                  <div
                    ref="printDateErrorAnchorRef"
                    class="absolute right-0 top-0 w-full overflow-visible"
                  >
                    <div class="w-full leading-6 text-center">
                      ខ្ញុំសូមធានាទទួលខុសត្រូវចំពោះមុខច្បាប់ថា
                      ព័ត៌មានបានបំពេញក្នុងជីវប្រវត្តិមន្ត្រីរាជការនេះ
                      ពិតជាត្រឹមត្រូវប្រាកដមែន។
                    </div>
                    <div
                      class="signature-date-lines-wrap w-[480px] absolute right-0 top-10"
                    >
                      <p class="text-center leading-6">
                        <span class="text-red-500 mr-1">*</span>
                        ថ្ងៃ
                        <input
                          v-model="signatureWeekday"
                          class="signature-date-input signature-date-weekday"
                          type="text"
                          maxlength="20"
                        />
                        ទី
                        <input
                          v-model="signatureDateDay"
                          class="signature-date-input"
                          type="text"
                          maxlength="20"
                        />
                        ខែ
                        <input
                          v-model="signatureDateMonth"
                          class="signature-date-input signature-date-month"
                          type="text"
                          maxlength="15"
                        />
                        ឆ្នាំ
                        <input
                          v-model="signatureDateYear"
                          class="signature-date-input signature-date-year"
                          type="text"
                          maxlength="15"
                        />
                        ព.ស. {{ $toKhmer(String(today.getFullYear() + 543)) }}
                      </p>
                      <p class="text-center leading-6">
                        <span class="text-red-500 mr-1">*</span>
                        <input
                          v-model="signatureDatePlace"
                          class="signature-date-input signature-date-place"
                          type="text"
                          maxlength="50"
                        />
                        ថ្ងៃទី
                        <input
                          v-model="signatureDateDay2"
                          class="signature-date-input"
                          type="text"
                          maxlength="2"
                        />
                        ខែ
                        <input
                          v-model="signatureDateMonth2"
                          class="signature-date-input signature-date-month"
                          type="text"
                          maxlength="15"
                        />
                        ឆ្នាំ {{ $toKhmer(signatureDateYear2) }}
                      </p>
                      <p
                        v-if="printDateError"
                        class="text-center text-red-500 text-xs leading-4 mt-1"
                      >
                        {{ printDateError }}
                      </p>
                      <p class="text-center mt-10 pt-16">
                        <span class="font-moul"
                          >{{ form.lastname }} {{ form.firstname }}</span
                        >
                      </p>
                    </div>
                  </div>
                </div>

                <career-save-footer-component
                  :visible="hasFormChanges"
                  :changed-count="hasFormChanges ? 1 : 0"
                  :can-navigate="hasFormChanges && !saving"
                  :show-navigation="false"
                  @cancel-all="cancelAllChanges"
                  @save-all="save"
                />
              </div>
            </n-scrollbar>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="slide-fade">
      <div
        v-if="loading"
        class="table-loading fixed flex h-screen left-0 top-10 right-0 bottom-0 bg-white bg-opacity-90 z-10"
      >
        <div class="flex mx-auto items-center">
          <div class="spinner text-center">
            <svg
              class="animate-spin w-16 mx-auto text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z"
                fill="currentColor"
              />
            </svg>
            <br /><br />កំពុងអាន...
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div
        v-if="!loading && officer == null"
        class="p-8 text-center text-gray-600"
      >
        មិនអាចផ្ទុកព័ត៌មានមន្ត្រីបានទេ។
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useMessage } from "naive-ui";
import dateFormat from "dateformat";
import { getKhmerDateParts } from "@utils/khmerLunar";
import { getMonth, parseNumber } from "@utils/khmer";
import ocmLogoUrl from "@assets/logo.svg";
import CareerSaveFooterComponent from "../officer/widgets/backgroundchilds/career-save-footer.vue";

const route = useRoute();
const store = useStore();
const message = useMessage();

const loading = ref(true);
const saving = ref(false);
const officer = ref(null);
const savedFormSnapshot = ref("");

const today = ref(new Date());
const signatureWeekday = ref("");
const signatureDateDay = ref("");
const signatureDateMonth = ref("");
const signatureDateYear = ref("");
const signatureDateDay2 = ref("");
const signatureDateYear2 = ref(String(new Date().getFullYear()));
const signatureDateMonth2 = ref("");
const signatureDatePlace = ref("");
const printDateError = ref("");
const printDateErrorAnchorRef = ref(null);
const fileInput = ref(null);
const selectedFile = ref(null);
const previewImage = ref(null);
const isUploading = ref(false);
const organizationOptions = ref([]);
const organizationLoading = ref(false);

const genderOptions = [
  { label: "ប្រុស", value: 1 },
  { label: "ស្រី", value: 0 },
];

function normalizeEducationLevelLabel(value) {
  if (typeof value !== "string") return "";
  const normalizedValue = value.trim();
  if (
    normalizedValue.startsWith("កម្រិតវប្បធម") &&
    normalizedValue.includes(" - ")
  ) {
    return normalizedValue.split(" - ").pop().trim();
  }
  return normalizedValue;
}

function formatEducationLevelOptionLabel(record) {
  const primaryLabel = normalizeEducationLevelLabel(record?.name);
  if (primaryLabel !== "") return primaryLabel;
  const fallbackLabel = [record?.education_level, record?.name]
    .filter((value) => typeof value === "string" && value.trim() !== "")
    .map((value) => value.trim())
    .join(" - ");
  if (
    fallbackLabel.startsWith("កម្រិតវប្បធម") &&
    fallbackLabel.includes(" - ")
  ) {
    return fallbackLabel.split(" - ").pop().trim();
  }
  return fallbackLabel;
}

function getEducationLevelOptionOrder(label) {
  const normalizedLabel = String(label || "").trim();
  if (normalizedLabel === "ផ្សេងៗ") return 2;
  if (normalizedLabel.includes("វិញ្ញាប")) return 1;
  return 0;
}

const optionEducationLevels = computed(() => {
  const educationLevels =
    Array.isArray(store.getters["certificate/getGroups"]) &&
    store.getters["certificate/getGroups"].length > 0
      ? store.getters["certificate/getGroups"]
      : [];
  const labelSet = new Set();
  const options = [];
  for (const educationLevel of educationLevels) {
    const label = formatEducationLevelOptionLabel(educationLevel);
    if (label === "" || labelSet.has(label)) continue;
    labelSet.add(label);
    options.push({ label, value: label });
  }
  const currentValue = normalizeEducationLevelLabel(form.education_level);
  if (currentValue !== "" && !labelSet.has(currentValue)) {
    options.push({ label: currentValue, value: currentValue });
  }
  return options.sort(
    (left, right) =>
      getEducationLevelOptionOrder(left.label) -
      getEducationLevelOptionOrder(right.label),
  );
});

function getEducationLevelIdByLabel(label) {
  const normalizedTarget = normalizeEducationLevelLabel(label);
  if (normalizedTarget === "") return null;
  const groups = Array.isArray(store.getters["certificate/getGroups"])
    ? store.getters["certificate/getGroups"]
    : [];
  const matched = groups.find(
    (record) =>
      normalizeEducationLevelLabel(formatEducationLevelOptionLabel(record)) ===
      normalizedTarget,
  );
  return matched?.id ?? null;
}

function getEducationLevelLabelById(id) {
  const normalizedId = Number(id);
  if (!Number.isFinite(normalizedId) || normalizedId <= 0) return "";
  const groups = Array.isArray(store.getters["certificate/getGroups"])
    ? store.getters["certificate/getGroups"]
    : [];
  const matched = groups.find((record) => Number(record?.id) === normalizedId);
  return normalizeEducationLevelLabel(formatEducationLevelOptionLabel(matched));
}

function getEducationLevelStorageKey() {
  const officerId = String(route.params.id || "").trim();
  return officerId === "" ? "" : `contract-profile:education-level:${officerId}`;
}

function saveEducationLevelToLocal(value) {
  const key = getEducationLevelStorageKey();
  if (key === "" || typeof window === "undefined") return;
  try {
    const normalizedValue = normalizeEducationLevelLabel(value);
    if (normalizedValue === "") {
      window.localStorage.removeItem(key);
      return;
    }
    window.localStorage.setItem(key, normalizedValue);
  } catch (error) {
    console.error("Persist education level locally failed:", error);
  }
}

function loadEducationLevelFromLocal() {
  const key = getEducationLevelStorageKey();
  if (key === "" || typeof window === "undefined") return "";
  try {
    return normalizeEducationLevelLabel(window.localStorage.getItem(key) || "");
  } catch (error) {
    console.error("Read education level local cache failed:", error);
    return "";
  }
}

const form = reactive({
  lastname: "",
  firstname: "",
  gender: 1,
  national: "",
  enlastname: "",
  enfirstname: "",
  dob: null,
  pob: "",
  education_level: "",
  nid: "",
  passport: "",
  workplace: "",
  address: "",
  mobile_phone: "",
  email: "",
});

const TRACKED_FIELD_KEYS = [
  "lastname",
  "firstname",
  "gender",
  "national",
  "enlastname",
  "enfirstname",
  "dob",
  "pob",
  "education_level",
  "nid",
  "passport",
  "workplace",
  "address",
  "mobile_phone",
  "email",
];

function serializeForm() {
  return JSON.stringify({
    lastname: form.lastname,
    firstname: form.firstname,
    gender: form.gender,
    national: form.national,
    enlastname: form.enlastname,
    enfirstname: form.enfirstname,
    dob: form.dob,
    pob: form.pob,
    education_level: form.education_level,
    nid: form.nid,
    passport: form.passport,
    workplace: form.workplace,
    address: form.address,
    mobile_phone: form.mobile_phone,
    email: form.email,
  });
}

const changedFields = computed(() => {
  let saved = {};
  try {
    saved = JSON.parse(savedFormSnapshot.value || "{}");
  } catch {
    saved = {};
  }
  let current = {};
  try {
    current = JSON.parse(serializeForm());
  } catch {
    current = {};
  }
  const flags = {};
  for (const key of TRACKED_FIELD_KEYS) {
    flags[key] = JSON.stringify(current[key]) !== JSON.stringify(saved[key]);
  }
  return flags;
});

function changedCellClass(keys) {
  const fieldList = Array.isArray(keys) ? keys : [keys];
  return fieldList.some((key) => changedFields.value[key] === true)
    ? "changed-cell"
    : "";
}

function fieldChangedClass(key) {
  const keys = Array.isArray(key) ? key : [key];
  return keys.some((k) => changedFields.value[k] === true)
    ? "changed-field"
    : "border-[#D8DEE8]";
}

const validationFieldOrder = [
  "lastname",
  "firstname",
  "enlastname",
  "enfirstname",
  "dob",
  "nid",
  "passport",
  "workplace",
];
const validationFieldRefs = {};

function setValidationFieldRef(field) {
  return (el) => {
    if (el) {
      validationFieldRefs[field] = el;
    } else {
      delete validationFieldRefs[field];
    }
  };
}

function trimValue(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function hasFieldValue(field) {
  return trimValue(form[field]) !== "";
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

function isAllowedNidValue(value) {
  const normalized = trimValue(value);
  if (normalized === "") return true;
  return /^[0-9០-៩()!@#$%]+$/.test(normalized);
}

function isValidPassportId(value) {
  const normalized = trimValue(value);
  if (normalized === "") return true;
  return /^[A-Za-z0-9\u17E0-\u17E9\s\-.]+$/.test(normalized);
}

const fieldErrors = computed(() => {
  const errors = {};

  if (!hasFieldValue("lastname")) {
    errors.lastname = "សូមបំពេញគោត្តនាមជាភាសាខ្មែរ";
  } else if (!isKhmerOnly(form.lastname)) {
    errors.lastname = "សូមបំពេញគោត្តនាមជាអក្សរខ្មែរ";
  }

  if (!hasFieldValue("firstname")) {
    errors.firstname = "សូមបំពេញនាមខ្លួនជាភាសាខ្មែរ";
  } else if (!isKhmerOnly(form.firstname)) {
    errors.firstname = "សូមបំពេញនាមខ្លួនជាអក្សរខ្មែរ";
  }

  if (!hasFieldValue("enlastname")) {
    errors.enlastname = "សូមបំពេញគោត្តនាមជាអក្សរឡាតាំង";
  } else if (!isLatinOnly(form.enlastname)) {
    errors.enlastname = "សូមបំពេញគោត្តនាមជាអក្សរឡាតាំងប៉ុណ្ណោះ";
  }

  if (!hasFieldValue("enfirstname")) {
    errors.enfirstname = "សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំង";
  } else if (!isLatinOnly(form.enfirstname)) {
    errors.enfirstname = "សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំងប៉ុណ្ណោះ";
  }

  if (!form.dob) {
    errors.dob = "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត";
  }

  const hasNid = hasFieldValue("nid");
  const hasPassport = hasFieldValue("passport");

  if (!hasNid && !hasPassport) {
    const requireEitherMessage = "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណ ឬ លិខិតឆ្លងដែន";
    errors.nid = requireEitherMessage;
    errors.passport = requireEitherMessage;
  } else {
    if (hasNid && !isAllowedNidValue(form.nid)) {
      errors.nid = "សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរ ដោយអាចប្រើលេខ និងសញ្ញា ()!@#$%";
    }

    if (hasPassport && !isValidPassportId(form.passport)) {
      errors.passport = "សូមបំពេញលិខិតឆ្លងដែនឱ្យបានត្រឹមត្រូវ";
    }
  }

  if (!hasFieldValue("workplace")) {
    errors.workplace = "សូមបំពេញអង្គភាព/ទីកន្លែងបំពេញការងារ";
  }

  return errors;
});

const firstInvalidField = computed(
  () =>
    validationFieldOrder.find((field) => Boolean(fieldErrors.value[field])) ||
    "",
);

function shouldHighlightFieldError(field) {
  return Boolean(fieldErrors.value[field]);
}

function getFieldError(field) {
  return fieldErrors.value[field] || "";
}

function fieldInputClass(field) {
  if (shouldHighlightFieldError(field)) {
    return "validation-input-invalid";
  }
  return changedFields.value[field] === true
    ? "changed-field"
    : "border-[#D8DEE8]";
}

const dobInputClass = computed(() => {
  if (fieldErrors.value.dob) {
    return "validation-input-invalid";
  }
  return changedFields.value.dob ? "changed-field" : "";
});

function focusFirstInvalidField() {
  const field = firstInvalidField.value;
  if (!field) return;
  window.setTimeout(() => {
    const el = validationFieldRefs[field];
    if (!el) return;
    const dom = el.$el ?? el;
    const input = dom?.querySelector?.("input, textarea");
    if (input && typeof input.focus === "function") {
      input.focus();
    } else if (typeof dom?.focus === "function") {
      dom.focus();
    }
  }, 0);
}

const hasFormChanges = computed(() => {
  if (!officer.value || !savedFormSnapshot.value) return false;
  return (
    serializeForm() !== savedFormSnapshot.value ||
    Boolean(selectedFile.value)
  );
});

function markFormInteraction() {}

function triggerFileInput() {
  if (fileInput.value) fileInput.value.click();
}

function handleFileSelect(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    message.error("សូមជ្រើសរើសរូបភាពប្រភេទ JPG ឬ PNG។");
    return;
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    message.error("ទំហំរូបភាពមិនអាចលើសពី ៥ មេកាបៃ។");
    return;
  }

  selectedFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e?.target?.result || null;
  };
  reader.readAsDataURL(file);
}

function cancelFileSelect() {
  selectedFile.value = null;
  previewImage.value = null;
  if (fileInput.value) fileInput.value.value = "";
}

function ensureWorkplaceOptionExists(value) {
  const normalized = String(value || "").trim();
  if (!normalized) return;
  const exists = organizationOptions.value.some(
    (option) => String(option.value) === normalized,
  );
  if (!exists) {
    organizationOptions.value = [
      ...organizationOptions.value,
      { label: normalized, value: normalized },
    ];
  }
}

function mapOrganizationsToOptions(rawItems) {
  const seenValues = new Set();
  const options = [];

  for (const item of rawItems) {
    const label = String(
      item?.name_kh ||
        item?.name ||
        item?.title ||
        item?.organization_name ||
        "",
    ).trim();
    const value = String(item?.name_kh || item?.name || label).trim();
    if (!value || seenValues.has(value)) continue;
    seenValues.add(value);
    options.push({ label: label || value, value });
  }

  return options;
}

async function loadOrganizationOptions() {
  organizationLoading.value = true;
  try {
    const res = await store.dispatch(
      "organization/listorganizationbygeneraldepartment",
    );
    const records =
      res?.data?.records ||
      res?.data?.record ||
      res?.data?.data ||
      res?.data ||
      [];
    const items = Array.isArray(records) ? records : [];
    organizationOptions.value = mapOrganizationsToOptions(items);
    ensureWorkplaceOptionExists(form.workplace);
  } catch (error) {
    console.error("Load organization options error:", error);
    organizationOptions.value = [];
    ensureWorkplaceOptionExists(form.workplace);
  } finally {
    organizationLoading.value = false;
  }
}

function hasCertificateRecords() {
  return (
    Array.isArray(store.getters["certificate/getGroups"]) &&
    store.getters["certificate/getGroups"].length > 0
  );
}

async function getCertificates() {
  if (hasCertificateRecords()) return;
  try {
    const res = await store.dispatch("certificate/group", {
      page: 1,
      perPage: 1000,
      search: "",
    });
    store.commit("certificate/setGroups", res.data.records);
    if (officer.value) {
      hydrateFromOfficer(officer.value);
    }
  } catch (error) {
    console.error("Load education levels error:", error);
  }
}

async function uploadPhoto(options = {}) {
  if (!selectedFile.value || !officer.value) return false;

  const targetUserId = officer.value.user?.id;
  if (!targetUserId) {
    message.error("រកមិនឃើញគណនីអ្នកប្រើប្រាស់សម្រាប់ដាក់រូបភាព។");
    return false;
  }

  isUploading.value = true;
  try {
    const formData = new FormData();
    formData.append("id", targetUserId);
    formData.append("files", selectedFile.value, selectedFile.value.name);

    const response = await store.dispatch(
      "user/uploadProfilePicture",
      formData,
    );
    const avatarUrl = response?.data?.record?.avatar_url || null;
    if (!avatarUrl) {
      message.error(
        response?.data?.message || "មានបញ្ហាក្នុងការផ្លាស់ប្ដូររូបភាព។",
      );
      return false;
    }

    if (officer.value.user) {
      officer.value.user.avatar_url = avatarUrl;
    }
    officer.value.image = avatarUrl;
    if (!options.silentSuccess) {
      message.success("បានផ្លាស់ប្ដូររូបភាពរួចរាល់។");
    }
    cancelFileSelect();
    return true;
  } catch (error) {
    console.error("Upload error:", error);
    message.error("មានបញ្ហាក្នុងការផ្លាស់ប្ដូររូបភាព។ សូមព្យាយាមម្តងទៀត។");
    return false;
  } finally {
    isUploading.value = false;
  }
}

// function getPrintProfileUrl () {
//   return `${window.location.origin}/#/officer/print/profile/${route.params.id}`
// }

function getContractPrintCardUrl(record) {
  return (
    window.location.origin + "/#/officercontract/printprofile/" + record.id
  );
}

// function openPrintProfile () {
//   if (!officer.value) return
//   const requiredFields = [
//     signatureDateDay.value,
//     signatureDateMonth.value,
//     signatureDateYear.value,
//     signatureDatePlace.value,
//     signatureDateDay2.value,
//     signatureDateMonth2.value
//   ]
//   const isMissing = requiredFields.some((v) => String(v ?? '').trim().length === 0)
//   if (isMissing) {
//     printDateError.value = 'សូមបំពេញ ថ្ងៃ ខែ ឆ្នាំ ខាងស្ដាំ មុនបោះពុម្ព'
//     nextTick(() => {
//       if (printDateErrorAnchorRef.value && typeof printDateErrorAnchorRef.value.scrollIntoView === 'function') {
//         printDateErrorAnchorRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     })
//     return
//   }
//   const payload = {
//     weekday: signatureWeekday.value,
//     day: signatureDateDay.value,
//     month: signatureDateMonth.value,
//     year: signatureDateYear.value,
//     place: signatureDatePlace.value,
//     day2: signatureDateDay2.value,
//     month2: signatureDateMonth2.value,
//     year2: signatureDateYear2.value
//   }
//   try {
//     localStorage.setItem('officerPrintSignatureDates', JSON.stringify(payload))
//   } catch (e) {}
//   window.open(getPrintProfileUrl(), '_blank')
// }
// --------start----
function openContractPrintProfile(record) {
  const requiredFields = [
    signatureDateDay.value,
    signatureDateMonth.value,
    signatureDateYear.value,
    signatureDatePlace.value,
    signatureDateDay2.value,
    signatureDateMonth2.value,
  ];
  const isMissing = requiredFields.some(
    (v) => String(v ?? "").trim().length === 0,
  );
  if (isMissing) {
    printDateError.value = "សូមបំពេញ ថ្ងៃ ខែ ឆ្នាំ ខាងស្ដាំ មុនបោះពុម្ភ";
    nextTick(() => {
      if (
        printDateErrorAnchorRef.value &&
        typeof printDateErrorAnchorRef.value.scrollIntoView === "function"
      ) {
        printDateErrorAnchorRef.value.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
    return;
  }
  const payload = {
    weekday: signatureWeekday.value,
    day: signatureDateDay.value,
    month: signatureDateMonth.value,
    year: signatureDateYear.value,
    place: signatureDatePlace.value,
    day2: signatureDateDay2.value,
    month2: signatureDateMonth2.value,
    year2: signatureDateYear2.value,
  };
  try {
    localStorage.setItem("officerPrintSignatureDates", JSON.stringify(payload));
  } catch (e) {}
  window.open(getContractPrintCardUrl(record), "_blank");
}
// -----end-----
watch(
  [
    signatureDateDay,
    signatureDateMonth,
    signatureDateYear,
    signatureDatePlace,
    signatureDateDay2,
    signatureDateMonth2,
  ],
  () => {
    if (!printDateError.value) return;
    const requiredFields = [
      signatureDateDay.value,
      signatureDateMonth.value,
      signatureDateYear.value,
      signatureDatePlace.value,
      signatureDateDay2.value,
      signatureDateMonth2.value,
    ];
    const isMissing = requiredFields.some(
      (v) => String(v ?? "").trim().length === 0,
    );
    if (!isMissing) printDateError.value = "";
  },
);

onMounted(() => {
  const kh = getKhmerDateParts(today.value);
  if (!signatureWeekday.value) signatureWeekday.value = kh.weekday;
  if (!signatureDateDay.value) signatureDateDay.value = kh.day;
  if (!signatureDateMonth.value) signatureDateMonth.value = kh.month;
  if (!signatureDateYear.value) signatureDateYear.value = kh.year;
  if (!signatureDatePlace.value) signatureDatePlace.value = "រាជធានីភ្នំពេញ";
  if (!signatureDateDay2.value)
    signatureDateDay2.value = parseNumber(dateFormat(today.value, "dd"));
  if (!signatureDateMonth2.value)
    signatureDateMonth2.value = getMonth(dateFormat(today.value, "mm"));
  if (!signatureDateYear2.value)
    signatureDateYear2.value = parseNumber(String(today.value.getFullYear()));

  loadOrganizationOptions();
  getCertificates();
});

const dobForInput = computed({
  get() {
    if (!form.dob) return "";
    const d = new Date(form.dob);
    return Number.isNaN(d.getTime()) ? "" : dateFormat(d, "yyyy-mm-dd");
  },
  set(v) {
    form.dob = v ? new Date(v).getTime() : null;
  },
});

function hydrateFromOfficer(rec) {
  if (!rec?.people) return;
  const p = rec.people;
  const educationLevelLabelFromText = normalizeEducationLevelLabel(
    p.education_level ||
      p.educatoin_level ||
      rec.education_level ||
      rec.educatoin_level ||
      "",
  );
  const educationLevelIdCandidate =
    p.education_level_id ||
    p.educatoin_level_id ||
    rec.education_level_id ||
    rec.educatoin_level_id ||
    null;
  const educationLevelLabelFromId = getEducationLevelLabelById(educationLevelIdCandidate);
  form.lastname = p.lastname || "";
  form.firstname = p.firstname || "";
  form.gender = p.gender === 0 || p.gender === 1 ? p.gender : 1;
  form.national = p.national || "";
  form.enlastname = p.enlastname || "";
  form.enfirstname = p.enfirstname || "";
  form.dob = p.dob ? new Date(p.dob).getTime() : null;
  form.pob = p.pob || "";
  form.education_level =
    educationLevelLabelFromText !== ""
      ? educationLevelLabelFromText
      : educationLevelLabelFromId;
  if (form.education_level === "") {
    form.education_level = loadEducationLevelFromLocal();
  } else {
    saveEducationLevelToLocal(form.education_level);
  }
  form.workplace = p.office_phone || "";
  form.address = p.address || "";
  form.mobile_phone = p.mobile_phone || "";
  form.email = p.email || "";
  ensureWorkplaceOptionExists(form.workplace);

  form.nid = (p.nid || "").trim();
  form.passport = (p.passport || rec.passport || "").trim();

  savedFormSnapshot.value = serializeForm();
}

function cancelAllChanges() {
  cancelFileSelect();
  if (officer.value) hydrateFromOfficer(officer.value);
}

watch(
  () => route.params.id,
  () => {
    loadOfficer();
  },
);

async function loadOfficer() {
  cancelFileSelect();
  loading.value = true;
  officer.value = null;
  try {
    const res = await store.dispatch("officer/mybackground", {
      id: route.params.id,
    });
    if (res?.data?.ok === true) {
      officer.value = res.data.record;
      hydrateFromOfficer(officer.value);
    } else {
      officer.value = null;
    }
  } catch (e) {
    console.error(e);
    officer.value = null;
  } finally {
    loading.value = false;
  }
}

function toDateString(ts) {
  if (!ts) return dateFormat(new Date(), "yyyy-mm-dd");
  const d = new Date(ts);
  return Number.isNaN(d.getTime())
    ? dateFormat(new Date(), "yyyy-mm-dd")
    : dateFormat(d, "yyyy-mm-dd");
}

async function save() {
  if (!officer.value?.people?.id) {
    message.error("មិនមានព័ត៌មានអ្នកប្រើប្រាស់សម្រាប់រក្សាទុក");
    return;
  }
  if (Object.keys(fieldErrors.value).length > 0) {
    message.warning("សូមបំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវ ឬពេញលេញ");
    nextTick(() => {
      focusFirstInvalidField();
    });
    return;
  }
  saving.value = true;
  try {
    const payload = JSON.parse(JSON.stringify(officer.value));
    const p = payload.people;
    const educationLevelValue = normalizeEducationLevelLabel(form.education_level);
    const educationLevelId = getEducationLevelIdByLabel(educationLevelValue);
    const nidValue = String(form.nid || "").trim();
    const passportValue = String(form.passport || "").trim();
    p.lastname = form.lastname;
    p.firstname = form.firstname;
    p.gender = form.gender;
    p.national = form.national;
    p.enlastname = form.enlastname;
    p.enfirstname = form.enfirstname;
    p.dob = toDateString(form.dob);
    p.pob = form.pob;
    p.education_level = educationLevelValue;
    p.educatoin_level = educationLevelValue;
    p.education_level_id = educationLevelId;
    p.educatoin_level_id = educationLevelId;
    p.office_phone = form.workplace;
    p.address = form.address;
    p.mobile_phone = form.mobile_phone;
    p.email = form.email;
    p.nid = nidValue === "" ? null : nidValue;
    p.passport = passportValue === "" ? null : passportValue;
    payload.nid = nidValue === "" ? null : nidValue;
    payload.passport = passportValue === "" ? null : passportValue;
    payload.education_level = educationLevelValue;
    payload.educatoin_level = educationLevelValue;
    payload.education_level_id = educationLevelId;
    payload.educatoin_level_id = educationLevelId;

    const res = await store.dispatch("officer/update", payload);
    if (res?.data?.ok === false && res?.data?.message) {
      message.error(res.data.message);
      return;
    }
    const peoplePayload = {
      id: officer.value.people.id,
      people: {
        firstname: form.firstname,
        lastname: form.lastname,
        enfirstname: form.enfirstname,
        enlastname: form.enlastname,
        gender: form.gender,
        email: form.email,
        dob: toDateString(form.dob),
        nid: nidValue === "" ? null : nidValue,
        mobile_phone: form.mobile_phone,
        address: form.address,
        current_address: form.address,
        pob: form.pob,
        national: form.national,
        passport: passportValue === "" ? null : passportValue,
        education_level: educationLevelValue,
        educatoin_level: educationLevelValue,
        education_level_id: educationLevelId,
        educatoin_level_id: educationLevelId,
      },
    };
    const peopleRes = await store.dispatch("people/update", peoplePayload);
    if (peopleRes?.data?.ok === false && peopleRes?.data?.message) {
      message.error(peopleRes.data.message);
      return;
    }
    if (selectedFile.value) {
      const uploaded = await uploadPhoto({ silentSuccess: true });
      if (!uploaded) {
        return;
      }
    }

    const reload = await store.dispatch("officer/mybackground", {
      id: route.params.id,
    });
    if (reload?.data?.ok === true) {
      officer.value = reload.data.record;
      hydrateFromOfficer(officer.value);
      // Keep UI consistent with other fields even if backend response omits this key.
      if (String(form.education_level || "").trim() === "" && educationLevelValue !== "") {
        form.education_level = educationLevelValue;
        if (officer.value?.people) {
          officer.value.people.education_level = educationLevelValue;
          officer.value.people.educatoin_level = educationLevelValue;
        }
      }
      savedFormSnapshot.value = serializeForm();
    }
    saveEducationLevelToLocal(educationLevelValue);
    message.success("បានរក្សាទុករួចរាល់");
  } catch (err) {
    console.error(err);
    message.error("មានបញ្ហាក្នុងការរក្សាទុក");
  } finally {
    saving.value = false;
  }
}

loadOfficer();
</script>

<style scoped>
.tbl-profile tr td {
  @apply text-left;
}

.changed-cell {
  background: transparent;
  box-shadow: none;
}

/* Match backgroundchilds/profile.vue: edited fields stay neutral; red only for validation */
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

:deep(.validation-input-invalid .n-base-selection) {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

.signature-date-input {
  width: 5em;
  border: none;
  border-bottom: 1px dotted #333;
  text-align: center;
  font-size: inherit;
  background: transparent;
  padding: 0 2px;
}

.signature-date-input.signature-date-weekday {
  width: 7em;
  min-width: 7em;
}

.signature-date-input.signature-date-month {
  width: 5em;
  min-width: 3.5em;
}

.signature-date-input.signature-date-year {
  width: 7em;
}

.signature-date-input.signature-date-place {
  width: 12em;
  min-width: 10em;
}

.signature-date-lines-wrap {
  min-width: 26rem;
  margin-left: -6rem;
}
</style>
