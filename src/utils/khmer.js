import dateFormat from 'dateformat'
var khmer = {
  months : {
    1 : "មករា",2 : "កុម្ភៈ",3 : "មីនា",4 : "មេសា",5 : "ឧសភា",6 : "មិថុនា",7 : "កក្កដា",8 : "សីហា",9 : "កញ្ញា",10 : "តុលា",11 : "វិច្ឆិកា",12 : "ធ្នូ",
  },
  days : {
    0 : "អាទិត្យ",1 : "ច័ន្ទ",2 : "អង្គារ៍",3 : "ពុធ",4 : "ព្រហស្បត៍",5 : "សុក្រ",6 : "សៅរ៍"
  },
  numbers : {
    khmer : ['១','២','៣','៤','៥','៦','៧','៨','៩','០'] ,
    latin : ['1','2','3','4','5','6','7','8','9','0']
  }
};

export const getDay = ( day ) => {
  try {
    return parseInt( day ) >= 0 && parseInt( day ) <= 6 ? khmer.days[ parseInt( day ) ] : '' 
  } catch (error) {
    console.log(error)
  }
}

export const getMonth = (month) => {
  try {
    return parseInt( month ) >= 0 && parseInt( month ) <= 12 ? khmer.months[ parseInt( month ) ] : '' 
  } catch (error) {
    console.log(error)
  }
}

export const parseNumber = ( str ) => {
  try {
    str = str != null && str != undefined ? str.toString().trim() : ''
      if( str.length > 0 ){
        for(let i in khmer.numbers.latin){
          str = str.replaceAll( khmer.numbers.latin[i] , khmer.numbers.khmer[i] )
        }
      }
    return str
  } catch (error) {
    console.log(error)
  }
}

export const getDate = (stringDate) => {
  try {
    let date = dateFormat( new Date( stringDate )  , 'dd mm yyyy' )
    let month = dateFormat( new Date( stringDate )  , 'mm' )
    return parseNumber( dateFormat( new Date( stringDate )  , 'dd' ) + ' ' + getMonth( month ) + ' ' + dateFormat( new Date( stringDate )  , 'yyyy' ) )
  } catch (error) {
    console.log(error)
  }
}

export const toLatinDigits = (value) => {
  try {
    if (value == null) return ''
    return String(value)
      .replace(/១/g, '1')
      .replace(/២/g, '2')
      .replace(/៣/g, '3')
      .replace(/៤/g, '4')
      .replace(/៥/g, '5')
      .replace(/៦/g, '6')
      .replace(/៧/g, '7')
      .replace(/៨/g, '8')
      .replace(/៩/g, '9')
      .replace(/០/g, '0')
      .trim()
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const normalizeKhmerNumber = (value) => {
  try {
    const raw = toLatinDigits(value)
    if (!raw) return ''
    return parseNumber(raw)
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const normalizeKhmerMonth = (value) => {
  try {
    const raw = toLatinDigits(value)
    if (!raw) return ''
    if (/^\d+$/.test(raw)) {
      const m = parseInt(raw, 10)
      return getMonth(m) || ''
    }
    const key = raw.toLowerCase()
    const enMonthMap = {
      jan: 1, january: 1,
      feb: 2, february: 2,
      mar: 3, march: 3,
      apr: 4, april: 4,
      may: 5,
      jun: 6, june: 6,
      jul: 7, july: 7,
      aug: 8, august: 8,
      sep: 9, sept: 9, september: 9,
      oct: 10, october: 10,
      nov: 11, november: 11,
      dec: 12, december: 12
    }
    if (enMonthMap[key] != null) return getMonth(enMonthMap[key]) || ''
    return String(value).trim()
  } catch (error) {
    console.log(error)
    return ''
  }
}

/** ថ្ងៃទី 05 ខែ (date to khmer month) មករា ឆ្នាំ 1990*/
export const formatKhmerDateWithMonthName = (value, useBirthDayPrefix = false) => {
  if (value == null || value === '') return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  try {
    const day = dateFormat(d, 'dd')
    const month = getMonth(dateFormat(d, 'mm'))
    const year = dateFormat(d, 'yyyy')
    const dayLabel = useBirthDayPrefix ? 'កើតថ្ងៃទី' : 'ថ្ងៃទី'
    return `${dayLabel} ${day} ខែ ${month} ឆ្នាំ ${year}`
  } catch (e) {
    return ''
  }
}

/** dd/khmerMonthName/yyyy  */
export const formatKhmerSlashDateMonthName = (value) => {
  if (value == null || value === '') return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  try {
    const day = dateFormat(d, 'dd')
    const month = getMonth(dateFormat(d, 'mm'))
    const year = dateFormat(d, 'yyyy')
    return `${day}/${month}/${year}`
  } catch (e) {
    return ''
  }
}

/** convert total months to Khmer year/month text, e.g. 18 -> ១ឆ្នាំ ៦ ខែ */
export const formatKhmerMonthDuration = (value) => {
  try {
    if (value == null || String(value).trim() === '') return ''

    const raw = toLatinDigits(value)
    if (!raw) return ''

    const totalMonthsValue = Number(raw)
    if (!Number.isFinite(totalMonthsValue)) return String(value).trim()

    const totalMonths = Math.max(0, Math.trunc(totalMonthsValue))
    const years = Math.floor(totalMonths / 12)
    const months = totalMonths % 12
    const parts = []

    if (years > 0) {
      parts.push(`${parseNumber(years)}ឆ្នាំ`)
    }

    if (months > 0 || years <= 0) {
      parts.push(`${parseNumber(months)} ខែ`)
    }

    return parts.join(' ').trim()
  } catch (error) {
    console.log(error)
    return ''
  }
}
