(function($, undefined) {

function CampaignCatcher() {
  var thisCC = this;

  this.params = {};
  this.formMaps = {};



  function _sanitizeParams() {
    for (var param in thisCC.params) {
      thisCC.params[param] = thisCC.sanitize(thisCC.params[param]);
    }
  }



  this.sanitize = function sanitize(value) {
    return value.toString().toLowerCase();
  };



  function _read() {
    var cookie = Cookies.get('campaign_catcher');
    if (cookie !== undefined) {
      thisCC.params = JSON.parse(cookie);
      _sanitizeParams();
    } else {
      thisCC.params = {};
    }
  }



  function _write() {
    _sanitizeParams();
    Cookies.set('campaign_catcher', JSON.stringify(thisCC.params), {
      expires: 365 * 10,
      path: '/'
    });
  }



  function _processParameters() {
    $.each(document.location.search.substr(1).split('&'), function(i, param) {
      if (param.length === 0) {
        return;
      }

      param = thisCC.sanitize(param);

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
    thisCC.params[thisCC.sanitize(param)] = thisCC.sanitize(value);
    _write();

    return thisCC.params;
  };



  this.remove = function remove(param) {
    delete thisCC.params[param];
    _write();

    return thisCC.params;
  };



  this.reset = function reset() {
    thisCC.params = {};
    _write();

    return thisCC.params;
  };



  this.addForm = function addForm(selector, formMap) {
    if ((typeof selector !== 'string') ||  (typeof formMap !== 'object')) {
      return false;
    }

    for (var input in formMap) {
      if ((typeof formMap[input] !== 'string')
          && (typeof formMap[input] !== 'function')) {
        return false;
      }
    }
    
    thisCC.formMaps[selector] = formMap;
    $(_processForms);

    return true;
  };



  function _processForms() {
    for (var selector in thisCC.formMaps) {
      $(selector).each(function(i, form) {
        _setInputValues($(form), thisCC.formMaps[selector]);
      });
    }
  }



  function _setInputValues(form, formMap) {
    if (!form.is('form')) {
      return;
    }

    for (var input in formMap) {
      var value = undefined;

      switch (typeof formMap[input]) {
        case 'string':
          value = thisCC.params[formMap[input]];
          break;

        case 'function':
          value = formMap[input].call(this, thisCC.params);
          break;
      }

      if (value === undefined) {
        continue;
      }

      var inputElement = form.find('input[name=' + input + ']');
      if (inputElement.length === 0) {
        inputElement = $('<input name="' + input + '" type="hidden">');
        form.append(inputElement);
      }

      inputElement.val(value);
    }
  }



  // Constructor Logic
  _read();
  _processParameters();
  _write();
}



// Export campaign catcher into the global variable cc
window.cc = new CampaignCatcher;

})(jQuery);
