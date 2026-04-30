<template>
  <section class="mb-10 bg-white pt-[2%] transition-all duration-300">

    <!-- HEADER -->
    <div class="flex items-center justify-between mb-2 pb-2 pl-0 ">

      <div
          class="w-full text-left font-moul text-lg text-[#1E3A8A] leading-tight"
        >
          ង. ភាសាបរទេស (សូមបំពេញនូវកម្រិតចំណេះដឹងភាសាបរទេស ពីល្អ មធ្យម ខ្សោយ)
      </div>

      <button
          type="button"
          class="inline-flex items-center gap-1 rounded-md bg-[#1E3A8A] px-3 py-1.5 text-[13px] text-white font-sr hover:bg-[#162E6B] duration-200 flex-shrink-0"
          @click="addRow"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z"
              clip-rule="evenodd"
            />
          </svg>
          <span>បន្ថែម</span>
        </button>

    </div>


    <!-- TABLE -->
    <div v-if="officer" class="">
      <div class="bg-white border border-[#D8DEE8] rounded-sm">
        <table class="w-full border-collapse min-w-[980px]">

        <thead>
          <tr>

          <th class="th">ភាសាបរទេស</th>
            <th
            v-for="col in columns"
            :key="col.key"
            class="th"
            >
            {{ col.label }}
            </th>

          <th class="th w-16 text-center">សកម្មភាព</th>

          </tr>
        </thead>


        <tbody>

          <tr
            v-for="(row,index) in rows"
            :key="row._key"
            :ref="(el) => setRowRef(el, row._key)"
            :class="rowEdited(row) ? 'bg-[#FEE2E2]' : 'bg-white'"
          >
            <!-- Language name -->
            <td class="td">
              <input
                :ref="(el) => setFieldRef(el, row._key, 'name')"
                v-model="row.name"
                class="input text-center"
              />
            </td>

            <!-- Reading Speaking Writing -->
            <td
              v-for="col in columns"
              :key="col.key"
              class="td"
            >
              <select
                :ref="(el) => setFieldRef(el, row._key, col.key)"
                v-model="row[col.key]"
                class="input text-center"
              >
              <option value="">ជ្រើសរើស</option>
              <option
                v-for="level in levels"
                :key="level"
                :value="level"
              >
                {{ level }}
              </option>
              </select>
            </td>
            <!-- DELETE -->
            <td class="td text-center">
              <delete-confirm-button-component @confirm="removeRow(index)" />
            </td>
          </tr>
          <tr v-if="rows.length===0">
            <td colspan="5" class="text-center text-gray-500 p-4 ">
              មិនទាន់មានទិន្នន័យ
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>


    <div v-else class="w-full p-8 text-center text-red-500">
      សូមបញ្ជាក់ព័ត៌មានមន្ត្រីជាមុនសិន។
    </div>

  </section>
</template>



<script>
import { nextTick, ref, watch } from "vue"
import { useNotification } from "naive-ui"
import { useStore } from "vuex"
import DeleteConfirmButtonComponent from "./delete-confirm-button.vue"

export default {

emits:["changed"],
components:{
DeleteConfirmButtonComponent
},

props:{
officer:Object
},

setup(props,{emit}){

const store = useStore()
const notify = useNotification()

/* --------------------------------
STATE
-------------------------------- */

const rows = ref([])
const savedSnapshot = ref("[]")
const savedRowsByKey = ref({})
const deletedIds = ref([])
const rowRefs = ref({})
const fieldRefs = ref({})
const lastInvalidTarget = ref(null)

let seed = 0


/* --------------------------------
CONFIG
-------------------------------- */

const columns = [
{ key:"reading" , label:"ការអាន" },
{ key:"speaking" , label:"ការសន្ទនា" },
{ key:"writing" , label:"ការសរសេរ" }
]

const levels = ["ល្អ","មធ្យម","ខ្សោយ"]
const REQUIRED_LANGUAGE_FIELDS = ["name","reading","speaking","writing"]
const LANGUAGE_FIELD_ORDER = ["name","reading","speaking","writing"]
const LANGUAGE_FIELD_LABELS = {
name: "ភាសាបរទេស",
reading: "ការអាន",
speaking: "ការសន្ទនា",
writing: "ការសរសេរ"
}
const khmerDigits = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"]


/* --------------------------------
UTIL
-------------------------------- */

const newKey = () => `language-${++seed}`
const khmerNumber = (numberValue) => {
return String(numberValue)
.split("")
.map((digit) => khmerDigits[Number(digit)] ?? digit)
.join("")
}

const toText = (value) => String(value ?? "").trim()

const newRow = () => ({
id:null,
people_id:parseInt(props.officer?.people?.id || props.officer?.people_id || 0) || null,
_key:newKey(),
name:"",
reading:"",
speaking:"",
writing:""
})

const normalizeRow = (row) => {
return {
id:parseInt(row?.id || 0) || null,
people_id:parseInt(row?.people_id || props.officer?.people?.id || props.officer?.people_id || 0) || null,
name:toText(row?.name),
reading:toText(row?.reading),
speaking:toText(row?.speaking),
writing:toText(row?.writing)
}
}

function isEmptyLanguageRow(row){
return REQUIRED_LANGUAGE_FIELDS.every((field) => toText(row?.[field]) === "")
}

function setRowRef(el, key){
if (el) {
rowRefs.value[key] = el
return
}
delete rowRefs.value[key]
}

function setFieldRef(el, key, field){
const refKey = `${key}:${field}`
if (el) {
fieldRefs.value[refKey] = el
return
}
delete fieldRefs.value[refKey]
}

function getFirstInvalidField(missingFields = []){
return LANGUAGE_FIELD_ORDER.find((field) => missingFields.includes(field)) || "name"
}

async function focusInvalidField(target = lastInvalidTarget.value){
if (!target) return false

await nextTick()

const row = rows.value[target.rowIndex]
if (!row?._key) return false

const rowEl = rowRefs.value[row._key]
if (typeof rowEl?.scrollIntoView === "function") {
rowEl.scrollIntoView({ behavior:"smooth", block:"center" })
}

window.setTimeout(() => {
const fieldRef = fieldRefs.value[`${row._key}:${target.field}`]
if (typeof fieldRef?.focus === "function") {
fieldRef.focus()
return
}
fieldRef?.$el?.focus?.()
}, 180)

return true
}

function focusFirstInvalidField(){
return focusInvalidField()
}

function buildLanguagePayload(peopleId){
const records = []
const errors = []

rows.value.forEach((row, rowIndex) => {
const normalized = normalizeRow(row)
if (!rowEdited(row)) return

const missingFields = REQUIRED_LANGUAGE_FIELDS.filter((field) => toText(normalized[field]) === "")
if (missingFields.length > 0) {
errors.push({
rowIndex,
missingFields
})
return
}

records.push({
rowRef: row,
id: parseInt(row?.id || 0) > 0 ? parseInt(row.id) : null,
people_id: peopleId,
name: normalized.name,
reading: normalized.reading,
speaking: normalized.speaking,
writing: normalized.writing
})
})

return {
records,
errors,
valid: errors.length === 0
}
}

function notifyValidationErrors(errors = []){
const firstError = errors[0]
if (!firstError) return

const rowLabel = khmerNumber((firstError.rowIndex || 0) + 1)
const missingLabels = firstError.missingFields
.map((field) => LANGUAGE_FIELD_LABELS[field] || field)
.join(", ")
lastInvalidTarget.value = {
rowIndex: Math.max(firstError.rowIndex || 0, 0),
field: getFirstInvalidField(firstError.missingFields || [])
}

notify.error({
title: "ភាសាបរទេស",
description: `សូមបំពេញទិន្នន័យឱ្យគ្រប់ជាមុនសិន នៅជួរទី ${rowLabel}: ${missingLabels}។`,
duration: 3500
})

focusInvalidField(lastInvalidTarget.value)
}


/* --------------------------------
LOAD DATA
-------------------------------- */

function hydrateRows(){

const source = props.officer?.people?.languages || []

rows.value = source.map(l => ({
id:parseInt(l?.id || 0) || null,
people_id:parseInt(l?.people_id || props.officer?.people?.id || props.officer?.people_id || 0) || null,
_key:newKey(),
name:l.name || "",
reading:l.reading || "",
speaking:l.speaking || "",
writing:l.writing || ""
}))

markSaved()

}


/* --------------------------------
ROW ACTIONS
-------------------------------- */

function addRow(){
const row = newRow()
rows.value.unshift(row)
notifyDirty()
nextTick(() => {
fieldRefs.value[`${row._key}:name`]?.focus?.()
})
}

function addLanguage(){
addRow()
}

function removeRow(index){
const row = rows.value[index]
if (parseInt(row?.id || 0) > 0) {
deletedIds.value.push(parseInt(row.id))
}
rows.value.splice(index,1)
notifyDirty()
}

/* --------------------------------
PAYLOAD
-------------------------------- */

function toPayload(){
return rows.value.map((row) => normalizeRow(row))
}


/* --------------------------------
SNAPSHOT
-------------------------------- */

function markSaved(){
const payload = toPayload()
savedSnapshot.value = JSON.stringify(payload)
const mapped = {}
rows.value.forEach((row) => {
mapped[row._key] = JSON.stringify(normalizeRow(row))
})
savedRowsByKey.value = mapped
deletedIds.value = []
emit("changed",false)
}


/* --------------------------------
EDIT CHECK
-------------------------------- */

function rowEdited(row){
const snapshotRow = savedRowsByKey.value[row._key]
if (snapshotRow === undefined) return true
return JSON.stringify(normalizeRow(row)) !== snapshotRow
}


/* --------------------------------
DIRTY CHECK
-------------------------------- */

function notifyDirty(){
emit("changed", JSON.stringify(toPayload()) !== savedSnapshot.value)
}

function cancelChanges(){
hydrateRows()
}

async function persistChanges(){
const peopleId = parseInt(props.officer?.people?.id || props.officer?.people_id || 0)
if (peopleId <= 0) return false

const validationResult = buildLanguagePayload(peopleId)
if (validationResult.valid !== true) {
notifyValidationErrors(validationResult.errors)
return false
}

if (validationResult.records.length <= 0 && deletedIds.value.length <= 0) {
markSaved()
return true
}

try {
for (const id of deletedIds.value) {
await store.dispatch('spokenlanguage/delete', { id })
}

for (const { rowRef, id, ...payload } of validationResult.records) {
if (id != null) {
await store.dispatch('spokenlanguage/update', {
id,
...payload
})
} else {
const res = await store.dispatch('spokenlanguage/create', payload)
rowRef.id = parseInt(res?.data?.record?.id || res?.data?.id || 0) || null
rowRef.people_id = peopleId
}
}

markSaved()
return true
} catch (error) {
console.log(error)
notify.error({
title: "ភាសាបរទេស",
description: "មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យផ្នែកនេះ។",
duration: 3500
})
return false
}
}


/* --------------------------------
WATCH
-------------------------------- */

watch(()=>props.officer?.people?.languages,hydrateRows,{immediate:true,deep:true})
watch(rows,notifyDirty,{deep:true})


return{
rows,
columns,
levels,
addRow,
addLanguage,
removeRow,
rowEdited,
cancelChanges,
persistChanges,
markSaved,
setRowRef,
setFieldRef,
focusFirstInvalidField
}

}

}
</script>



<style scoped>

.th{
background:#E5EAF2;
padding:8px;
font-size:13px;
font-weight:600;
border-bottom:1px solid #D8DEE8;
}

.td{
padding:8px;
border-bottom:1px solid #E5E7EB;
}

.input{
width:100%;
border:1px solid #D8DEE8;
padding:6px;
border-radius:4px;
font-size:13px;
background:white;
}

</style>
