const moment = require('moment')


module.exports={
	formatDate: function(date, format){
		return moment(date).format(format)
	},

	truncat: function (str, len) {
    if (str.length > len) {
      let new_str = str.substr(0, len)
      return new_str + '...'
    }
    return str
  },

	stripTags: function(input){
	return input.replace(/<(?:.|\n)*?>/gm,'')
	},



  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      )
  },
}
