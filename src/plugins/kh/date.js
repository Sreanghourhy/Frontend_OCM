var numbers = {
  khmer : ['១','២','៣','៤','៥','៦','៧','៨','៩','០'] ,
  latin : ['1','2','3','4','5','6','7','8','9','0']
};
var khmer = {
  months : {
    1 : "មករា",2 : "កុម្ភៈ",3 : "មីនា",4 : "មេសា",5 : "ឧសភា",6 : "មិថុនា",7 : "កក្កដា",8 : "សីហា",9 : "កញ្ញា",10 : "តុលា",11 : "វិច្ឆិកា",12 : "ធ្នូ",
  },
  days : {
    0 : "អាទិត្យ",1 : "ច័ន្ទ",2 : "អង្គារ៍",3 : "ពុធ",4 : "ព្រហស្បត៍",5 : "សុក្រ",6 : "សៅរ៍"
  },
  current: {
    today: new Date()
  }
};
export default {
  install(app, options = {}) {
    app.config.globalProperties.$toKhmer = (str) => {
      str = str != null && str != undefined ? str.toString().trim() : ''
      if( str.length > 0 ){
        for(let i in numbers.latin){
          str = str.replaceAll( numbers.latin[i] , numbers.khmer[i] )
        }
      }
      return str
    }
    app.config.globalProperties.$getKhMonth = ( month )=>{   
      return parseInt( month ) >= 1 && parseInt( month ) <= 12 ? khmer.months[ parseInt( month ) ] : khmer.months[ khmer.current.today.getMonth() + 1 ]
    }
    app.config.globalProperties.$getKhDay = ( day )=>{
      return parseInt( day ) >= 0 && parseInt( day ) <= 6 ? khmer.days[ parseInt( day ) ] : khmer.days[ khmer.current.today.getDay() ]
    }
    app.config.globalProperties.$getKhDate = (date) => {
      date = new Date( date )
      return app.config.globalProperties.$toKhmer( date.getDate() + '-' + khmer.months[ date.getMonth() + 1 ] + '-' + date.getFullYear() )
    }
    
  }
}