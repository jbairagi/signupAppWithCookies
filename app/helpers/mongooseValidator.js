exports.emailValidator = {
  validator: function(v) {
    return /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(v);
  },
message: '{VALUE} is not a valid email id!'
}

exports.beginningDateValidator = {
  validator: function(v){
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
  message: '{VALUE} is less than todays date, so invalid!'
}

exports.dueDateValidator = {
  validator: function(v){
    var d = this.beginningDate;
    if(d.getFullYear() <= v.getFullYear()){
      if((d.getMonth()+1) <= (v.getMonth()+1)){
        if(d.getDate() <= v.getDate()){
          return true;
        }
      }
    }
    return false;
  },
  message: '{VALUE} is less than beginning date, so invalid!'
}
