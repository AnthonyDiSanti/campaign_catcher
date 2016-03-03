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
    Cookies.set('campaign_catcher', JSON.stringify(thisCC.params));
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
    var formProcessing = new $.Deferred;

    if ((typeof selector !== 'string') ||  (typeof formMap !== 'object')) {
      formProcessing.reject();
    } else {
      for (var input in formMap) {
        if ((typeof formMap[input] !== 'string')
            && (typeof formMap[input] !== 'function')) {
          formProcessing.reject();
        }
      }
    }
    
    if (formProcessing.state() === 'pending') {
      thisCC.formMaps[selector] = formMap;
      $(function() {
        $(selector).each(function(i, form) {
          _setInputValues($(form), formMap);
        });
        formProcessing.resolve();
      });
    }

    return formProcessing;
  };



  function _setInputValues(form, formMap) {
    if (!form.is('form')) {
      return;
    }

    for (var input in formMap) {
      var inputElement = form.find('input[name=' + input + ']');
      if (inputElement.length === 0) {
        inputElement = $('<input name="' + input + '" type="hidden">');
        form.append(inputElement);
      }

      switch (typeof formMap[input]) {
        case 'string':
          var value = thisCC.params[formMap[input]];
          if (value !== undefined) {
            inputElement.val(value);
          }
          break;

        case 'function':
          inputElement.val(formMap[input].call(this, thisCC.params));
          break;
      }
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
