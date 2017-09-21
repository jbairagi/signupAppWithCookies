var customValidators = {
  customValidators: {
    isDateValid: function(dateString) {
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if(!dateString.match(regEx)) return false;
      var d = new Date(dateString);
      if(!d.getTime()) return false;
      return d.toISOString().slice(0,10) === dateString;
    },

    isBeginningValid: function(dateString) {
      var v = new Date(dateString);
      var d = new Date();
      if(d.getFullYear() <= v.getFullYear()){
        if((d.getMonth()+1) <= (v.getMonth()+1)){
          if(d.getDate() <= v.getDate()){
            return true;
          }
        }
      }
      return false;
    },

    isDueDateValid: function(dateString, beginningDate) {
      var v = new Date(dateString);
      var d = new Date(beginningDate);
      if(d.getFullYear() <= v.getFullYear()){
        if((d.getMonth()+1) <= (v.getMonth()+1)){
          if(d.getDate() <= v.getDate()){
            return true;
          }
        }
      }
      return false;
    }
  }
}

module.exports = customValidators;
