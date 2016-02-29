# Campaign Catcher
==================

Campaign Catcher captures all URL parameters, storing them in cookies.  The most recent values of all historical URL parameters are avialable via the `cc.params` object.

## Sample Code
--------------

    <script type="text/javasctipt" src="http://code.jquery.com/jquery-2.2.1.min.js"></script>
    <script type="text/javasctipt" src="path/to/campaigncatcher.js"></script>

    alert(cc.params.utm_campaign);

Visit your test page with a utm_campaign parameter (path/to/testpage.html?utm_campaign=testcampaign) and the campaign will be shown in an alert box.  Then visit the page without the utm_campaign parameter and the campaign captured previously will be displayed in the alert box.
