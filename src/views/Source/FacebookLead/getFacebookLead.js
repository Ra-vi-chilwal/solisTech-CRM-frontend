import React from 'react'
import axios from 'axios'
function getFacebookLead() {
    const accessToken ="EAACpYBZBKtO0BO3nY1oyByy1sCZABD4os1dZBAJnsfLoFZAq0ZAAADdY1M1ku0TmnKqvumX9TW7scJcSnr8tZCwgzLohmkakgCfCoNcp6SOw2aMiKdSIfSS2pyRnMWJUCsLbZChRz6fBctIT36p0HX1ZBMMUAZCAcih1djmInZBfAmAeH3zHU56czN29p3cXBI33sQwhnpApXi"
    const campaignId = '23855431021060462'
    const params = {
        access_token: accessToken,
  
      };
    const endpoint = `https://graph.facebook.com/v17.0/${campaignId}/leads`;
    axios.get(endpoint, { params })
  .then(response => {
    const data = response.data;
    if (data.data && data.data.length > 0) {
      const leads = data.data;
      leads.forEach(lead => {
        // Process lead data here
        console.log(lead);
      });
    } else {
      console.log('No leads found.');
    }
  })
  .catch(error => {
    console.error('Error fetching leads:', error);
  });
    return (
    <div>getFacebookLead</div>
  )
}
export default getFacebookLead
// // Your access token with necessary permissions
// const accessToken = 'YOUR_ACCESS_TOKEN';

// // The campaign ID you want to retrieve leads from
// const campaignId = 'CAMPAIGN_ID';
// API endpoint for retrieving leads from a campaign
// Parameters for the API request
// Send GET request to the API endpoint
