// const { DefaultAzureCredential } = require("@azure/identity");
// const axios = require("axios");
// const express = require("express");

// // Configuration - Replace these with your values
// // Load environment variables
// require('dotenv').config();

// const subscriptionId = process.env.SUBSCRIPTION_ID 
// const emailServiceName = process.env.EMAIL_SERVICE_NAME ;
// const resourceGroupName = process.env.RESOURCE_GROUP_NAME;


// // Initialize credentials
// const credential = new DefaultAzureCredential();

// // Function to list existing domains
// async function listDomains() {
//   try {
//     console.log("Retrieving existing domains...");
//     const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Communication/emailServices/${emailServiceName}/domains?api-version=2023-04-01`;

//     const token = await credential.getToken("https://management.azure.com/.default");
//     if (!token || !token.token) {
//       throw new Error("Failed to obtain access token. Ensure Azure CLI login (az login) or environment variables are set.");
//     }

//     const response = await axios.get(url, {
//       headers: {
//         "Authorization": `Bearer ${token.token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error listing domains:", error.response?.data?.error?.message || error.message);
//     throw error;
//   }
// }

// // Function to get a specific domain
// async function getDomain(domainName) {
//   try {
//     console.log(`Retrieving domain: ${domainName}...`);
//     const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Communication/emailServices/${emailServiceName}/domains/${domainName}?api-version=2023-04-01`;

//     const token = await credential.getToken("https://management.azure.com/.default");
//     if (!token || !token.token) {
//       throw new Error("Failed to obtain access token. Ensure Azure CLI login (az login) or environment variables are set.");
//     }

//     const response = await axios.get(url, {
//       headers: {
//         "Authorization": `Bearer ${token.token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error getting domain:", error.response?.data?.error?.message || error.message);
//     throw error;
//   }
// }

// // Function to create or update a domain and get its DNS records
// async function createOrUpdateDomain(domainName) {
//   try {
//     console.log(`Creating or updating domain: ${domainName}...`);
//     const resourceId = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Communication/emailServices/${emailServiceName}/domains/${domainName}`;
//     const url = `https://management.azure.com${resourceId}?api-version=2023-04-01`;
//     const domainParameters = {
//       location: "global",
//       properties: {
//         domainManagement: "CustomerManaged"
//       }
//     };

//     const token = await credential.getToken("https://management.azure.com/.default");
//     if (!token || !token.token) {
//       throw new Error("Failed to obtain access token. Ensure Azure CLI login (az login) or environment variables are set.");
//     }

//     const response = await axios.put(url, domainParameters, {
//       headers: {
//         "Authorization": `Bearer ${token.token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error creating/updating domain:", error.response?.data?.error?.message || error.message);
//     throw error;
//   }
// }

// // Function to update an existing domain
// async function updateDomain(domainName, updateParameters) {
//   try {
//     console.log(`Updating domain: ${domainName}...`);
//     const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Communication/emailServices/${emailServiceName}/domains/${domainName}?api-version=2023-04-01`;

//     const token = await credential.getToken("https://management.azure.com/.default");
//     if (!token || !token.token) {
//       throw new Error("Failed to obtain access token. Ensure Azure CLI login (az login) or environment variables are set.");
//     }

//     const response = await axios.patch(url, updateParameters, {
//       headers: {
//         "Authorization": `Bearer ${token.token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error updating domain:", error.response?.data?.error?.message || error.message);
//     throw error;
//   }
// }

// // Function to initiate domain verification
// async function initiateDomainVerification(domainName) {
//   try {
//     console.log(`Initiating verification for domain: ${domainName}...`);
//     const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Communication/emailServices/${emailServiceName}/domains/${domainName}/initiateVerification?api-version=2023-04-01`;

//     const token = await credential.getToken("https://management.azure.com/.default");
//     if (!token || !token.token) {
//       throw new Error("Failed to obtain access token. Ensure Azure CLI login (az login) or environment variables are set.");
//     }

//     const response = await axios.post(url, {}, {
//       headers: {
//         "Authorization": `Bearer ${token.token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error initiating domain verification:", error.response?.data?.error?.message || error.message);
//     throw error;
//   }
// }

// // Initialize Express app
// const app = express();
// app.use(express.json());

// // API endpoint to list domains
// app.get('/api/domains', async (req, res) => {
//   try {
//     const domains = await listDomains();
//     res.json(domains);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API endpoint to get a specific domain
// app.get('/api/domains/:domainName', async (req, res) => {
//   try {
//     const domainName = req.params.domainName;
//     const domain = await getDomain(domainName);
//     res.json(domain);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API endpoint to create or update a domain
// app.put('/api/domains/:domainName', async (req, res) => {
//   try {
//     const domainName = req.params.domainName;
//     const result = await createOrUpdateDomain(domainName);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API endpoint to update a domain
// app.patch('/api/domains/:domainName', async (req, res) => {
//   try {
//     const domainName = req.params.domainName;
//     const updateParameters = req.body;
//     const result = await updateDomain(domainName, updateParameters);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // API endpoint to initiate domain verification
// app.post('/api/domains/:domainName/verify', async (req, res) => {
//   try {
//     const domainName = req.params.domainName;
//     const result = await initiateDomainVerification(domainName);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });