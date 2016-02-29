(function($, undefined) {

function CampaignCatcher() {
  var thisCC = this;

  this.params = {};



  function _read() {
    var cookies = Cookies.get();
    
    for (var cookie in cookies) {
      if (cookie.substr(0, 3) === 'cc_') {
        thisCC.params[cookie.substr(3)] = cookies[cookie];
      }
    }
  }



  function _write() {
    for (var param in thisCC.params) {
      Cookies.set('cc_' + param, thisCC.params[param]);
    }
  }



  function _processParameters() {
    $.each(document.location.search.substr(1).split('&'), function(i, param) {
      if (param.length === 0) {
        return;
      }

      param = param.toLowerCase();

      var separator = param.indexOf('=');
      switch (separator) {
        // No value, just a name
        case -1:
          thisCC.params[param] = "";
          break;

        // Malformed parameter missing the name
        case 0:
          return;

        // Standard parameter with name and value
        default:
          thisCC.params[param.substr(0, separator)] = 
            param.substr(separator + 1);
          break;
      }
    });
  }



  this.set = function set(param, value) {
    thisCC.params[param.toLowerCase()] = value.toLowerCase();
    _write();
  };



  this.remove = function remove(param) {
    delete thisCC.params[param];
    Cookies.remove('cc_' + param);
  };



  this.reset = function reset() {
    for (var param in thisCC.params) {
      thisCC.remove(param);
    }
  };



  // Constructor Logic
  _read();
  _processParameters();
  _write();
}



// Export campaign catcher into the global variable, cc
window.cc = new CampaignCatcher;

})(jQuery);
