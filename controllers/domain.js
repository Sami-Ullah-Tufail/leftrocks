const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const UserDomain = require('../models/userDomain');

router.post('/create', async (req, res) => {
  try {
    const { email, name, region = 'us-east-1' } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const domain = await resend.domains.create({ name });
    console.log("456789765467890876546789",domain)
    const userDomain = new UserDomain({
      domain: name,
      domainId: domain.data.id,
      email,
    });

    await userDomain.save();

    res.json(domain);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Error creating domain:', error.errors);
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Error creating domain:', error);
      res.status(500).json({ error: 'Failed to create domain' });
    }
  }
});

router.get('/get', async (req, res) => {
  try {
    const { email, domain } = req.body;

    // Find the user domain object with matching email and domain
    const userDomain = await UserDomain.findOne({ email, domain });
    if (!userDomain) {
      return res.status(403).json({ error: 'You are not authorized to access this domain' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const domainData = await resend.domains.get(userDomain.domainId);

    res.json(domainData);
  } catch (error) {
    console.error('Error retrieving domain:', error);
    res.status(500).json({ error: 'Failed to retrieve domain' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { email, domain } = req.body;

    // Find the user domain object with matching email and domain
    const userDomain = await UserDomain.findOne({ email, domain });
    if (!userDomain) {
      return res.status(404).json({ error: 'Domain not found for the provided email and domain' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const verifiedDomain = await resend.domains.verify(userDomain.domainId);

    res.json(verifiedDomain);
  } catch (error) {
    console.error('Error verifying domain:', error);
    res.status(500).json({ error: 'Failed to verify domain' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const { email, domain, updateOptions } = req.body;

    // Find the user domain object with matching email and domain
    const userDomain = await UserDomain.findOne({ email, domain });
    if (!userDomain) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const updatedDomain = await resend.domains.update({
      id: userDomain.domainId,
      ...updateOptions
    });

    res.json(updatedDomain);
  } catch (error) {
    console.error('Error updating domain:', error);
    res.status(500).json({ error: 'Failed to update domain' });
  }
});


router.get('/list', async (req, res) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const domains = await resend.domains.list();

    res.json(domains);
  } catch (error) {
    console.error('Error listing domains:', error);
    res.status(500).json({ error: 'Failed to list domains' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { email, domain } = req.body;

    // Find the user domain object with matching email and domain
    const userDomain = await UserDomain.findOne({ email, domain });
    if (!userDomain) {
      return res.status(404).json({ error: 'Domain not found for the provided email and domain' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const deletedDomain = await resend.domains.remove(userDomain.domainId);

    res.json(deletedDomain);
  } catch (error) {
    console.error('Error deleting domain:', error);
    res.status(500).json({ error: 'Failed to delete domain' });
  }
});

module.exports = router;
