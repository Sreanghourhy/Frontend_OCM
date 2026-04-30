import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "officers" ,
    title: "មន្ត្រី" 
  },
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState }, params) {
    const query = {
      search: params.search,
      perPage: params.perPage,
      page: params.page,
      wild_search: params.wild_search == true ? 1 : 0,
      positions: params.positions,
      organizations: params.organizations,
      education_levels: params.educatoin_levels,
      unofficial_position_ids: params.unofficial_position_ids,
      rank_ids: params.ranks,
      ids: params.ids,
      gender: params.gender,
      officer_types: params.officer_types,
      dob: params.dob,
      unofficial_date: params.unofficial_date,
      official_date: params.official_date,
    };
    if (
      params.dob_range &&
      typeof params.dob_range === "string" &&
      params.dob_range.indexOf(",") > 0
    ) {
      query.dob_range = params.dob_range;
    }
    return await crud.list(
      import.meta.env.VITE_API_SERVER + "/" + state.model.name + "?" + new URLSearchParams(query).toString(),
    );
  },
  async officersunderorganization ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/reports/officersunderorganization?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        positions: params.positions ,
        organizations: params.organizations ,
        ids: params.ids ,
        
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/read')
  },
  async mybackground ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/mybackground')
  },
  async publicphoto({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/publicphoto')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/create",params)
  },
  async createNonOfficer ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/createnonofficer",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update",params)
  },
  async updateWorkHistory ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update_work_history",params)
  },
  async updateOrganizationCode ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update_organization_code",params)
  },
  async activate({state, commit, rootState}, params){
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/activate",params)
  },
  async upload({ state, commit, rootState },formData) {    
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload",formData)
  },
  async setDocumentFocal ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/setfocaldocument",params)
  },

  //Update Officer profile:
  async updateprofiles ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/updateprofile",params)
  },
  async updatebirthcert ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/updatebirthcert",params)
  },
  async updateweddingcert ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/updateweddingcert",params)
  },
  async updateparentinfo ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/updateparentinfo",params)
  },
  async updateemmergency ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/updateemmergency",params)
  },
  
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
