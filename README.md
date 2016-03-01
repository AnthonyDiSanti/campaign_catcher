# Campaign Catcher
==================

Campaign Catcher captures all URL parameters, storing them in cookies.  The most recent values of all historical URL parameters are avialable via the `cc.params` object.

## Primary Use Case

The motivation for this project was the tracking of advertising campaigns.  The most common paradigm for campaign tracking is the five parameters used by Google Analytics (utm_campaign, utm_medium, utm_source, utm_content, and utm_term).  These parameters are automatically captured in Google Analytics, which is perfect for websites where the conversion occurs online.

However, for businesses that begin with lead capture and then later see revenue-driving conversions, passing the campaigns to the CRM or other back-office system is necessary to track a true Cost Per Acquisition (CPA) and eventual Lifetime Value of Customer (LTV).  This project facilitates that integration by storing the campaigns across multiple page views and visits, then simplifying the population of those campaigns into hidden inputs on the lead capture form.

## Sample Code
--------------

    <script type="text/javasctipt" src="http://code.jquery.com/jquery-2.2.1.min.js"></script>
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
