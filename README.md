# Campaign Catcher

Campaign Catcher captures all URL parameters, storing them in cookies.  The most recent values of all historical URL parameters are avialable via the `cc.params` object.

## Basic Example

Campaign Catcher can be used simply to capture URL parameters for use in your own scripts.  This example shows a basic implementation with a custom script.

```html
<!-- Supporting Libraries -->
<script type="text/javasctipt" src="http://code.jquery.com/jquery-2.2.1.min.js"></script>
<script type="text/javascript" src="path/to/js.cookie.js"></script>

<!-- JSON Polyfill -->
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>

<!-- Campaign Catcher -->
<script type="text/javasctipt" src="path/to/campaigncatcher.js"></script>

<script type="text/javascript">
  if (typeof cc.params.utm_campaign === 'string') {
    alert('utm_campaign: ' + cc.params.utm_campaign);
  } else {
    alert('No utm_campaign present nor stored');
  }
</script>
```

1. Open sample.html
2. Add a utm_campaign parameter (sample.html?utm_campaign=testcampaign) and the campaign will be shown in an alert box
3. Remove the utm_campaign parameter and the campaign captured previously will be displayed in the alert box

## Form Example

Campaign Catcher also includes integration directly into forms.  You can map fields on the form directly to URL parameters or to functions that will be passed the full list of captured parameters as shown below.

```html
<!-- Supporting Libraries -->
<script type="text/javascript" src="http://code.jquery.com/jquery-2.2.1.min.js"></script>
<script type="text/javascript" src="lib/js-cookie/src/js.cookie.js"></script>

<!-- JSON Polyfill -->
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>

<!-- Campaign Catcher -->
<script type="text/javascript" src="campaigncatcher.js"></script>

<form id="test-form">
  <label for="campaign">utm_campaign</label>
  <input name="campaign" id="campaign" type="text" /><br />
  <label for="calc">2 + 3 = </label>
  <input name="calc" id="calc" type="text" />
</form>
<script type="text/javascript">
  $(function() {
    cc.addForm('#test-form', {
      campaign: 'utm_campaign',
      calc: function(params) {
        console.log(params)
        return 2+3;
      }
    });
  });
</script>
```

1. Open form_example.html
2. Add a utm_campaign parameter (form_example.html?utm_campaign=testcampaign) and the campaign will be shown on the form
3. Remove the utm_campaign parameter and the campaign captured previously will still be displayed on the form

Note that the calculated field of "2 + 3 =" is dynamically calculated via a function value in the form map.  This function also logs the captured URL parameters that are passed to all mapped function values.
