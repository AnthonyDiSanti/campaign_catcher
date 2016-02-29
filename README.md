# Campaign Catcher

Campaign Catcher captures all URL parameters, storing them in cookies.  The most recent values of all historical URL parameters are avialable via the `cc.params` object.

## Sample Code

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

1. Open sample.html
2. Add a utm_campaign parameter (sample.html?utm_campaign=testcampaign) and the campaign will be shown in an alert box
3. Remove the utm_campaign parameter and the campaign captured previously will be displayed in the alert box
