# Contact Form - Google Sheets Integration Setup

## Overview
This document contains the complete setup instructions for connecting the contact form to Google Sheets so you can receive and view form submissions.

## Prerequisites
- A deployed website with a public URL (domain)
- Google account
- Basic knowledge of Google Sheets and Apps Script

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `Contact Form Responses`
4. Set up headers in row 1:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Message`

## Step 2: Set Up Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Replace the default code with this script:

```javascript
function doPost(e) {
  try {
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add timestamp and form data to sheet
    sheet.appendRow([
      new Date(), // Timestamp
      data.name,
      data.email,
      data.message
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the script (Ctrl+S or Cmd+S)

## Step 3: Deploy the Script
1. Click **Deploy** → **New deployment**
2. Choose **Web app**
3. Set **Execute as**: "Me" (your Google account)
4. Set **Who has access**: "Anyone"
5. Click **Deploy**
6. **Copy the Web App URL** - it will look like: `https://script.google.com/macros/s/AKfycbz.../exec`
7. Save this URL - you'll need it for the form

## Step 4: Update Contact Form HTML
In `contact.html`, add the Google Apps Script URL to the form:

```html
<form class="contact-form fade-in" autocomplete="off" 
      action="YOUR_GOOGLE_APPS_SCRIPT_URL_HERE" 
      method="POST" 
      style="display: flex; flex-direction: column; gap: 1.1rem; min-width: 380px; max-width: 520px; width: 100%;">
```

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL from Step 3.

## Step 5: Update JavaScript Form Handling
In `script.js`, replace the current form submission logic in the `setupContactForm()` method:

```javascript
setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = contactForm.querySelector('input[name="name"]');
            var email = contactForm.querySelector('input[name="email"]');
            var message = contactForm.querySelector('textarea[name="message"]');
            var valid = true;
            
            // Remove previous error styles and messages
            [name, email].forEach(function(input) {
                input.style.border = '';
            });
            
            // Remove existing error message
            var existingError = contactForm.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Check if name is filled
            if (!name.value.trim()) {
                name.style.border = '2px solid #ff4444';
                valid = false;
            }
            
            // Check if email is filled and valid
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                email.style.border = '2px solid #ff4444';
                valid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                email.style.border = '2px solid #ff4444';
                valid = false;
            }
            
            if (!valid) {
                var errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'color: #ff4444; font-size: 0.9rem; margin-top: 0.5rem; text-align: center;';
                
                if (!name.value.trim() && !email.value.trim()) {
                    errorMsg.textContent = 'Please fill in both name and email fields.';
                } else if (!name.value.trim()) {
                    errorMsg.textContent = 'Please enter your name.';
                } else if (!email.value.trim()) {
                    errorMsg.textContent = 'Please enter your email address.';
                } else if (!emailRegex.test(email.value.trim())) {
                    errorMsg.textContent = 'Please enter a valid email address.';
                }
                
                contactForm.appendChild(errorMsg);
            } else {
                // Form is valid - send to Google Sheets
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: message.value.trim()
                };
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Send to Google Sheets
                fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Show success animation
                        showSuccessAnimation();
                        contactForm.reset();
                    } else {
                        throw new Error('Submission failed');
                    }
                })
                .catch(error => {
                    // Show error message
                    var errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: #ff4444; font-size: 0.9rem; margin-top: 0.5rem; text-align: center;';
                    errorMsg.textContent = 'Failed to send message. Please try again.';
                    contactForm.appendChild(errorMsg);
                })
                .finally(() => {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            }
        });
    }
}

// Success animation function
function showSuccessAnimation() {
    var successOverlay = document.createElement('div');
    successOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.92);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    var successContent = document.createElement('div');
    successContent.style.cssText = `
        text-align: center;
        color: white;
        transform: translateY(20px);
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    successContent.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0; transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s; color: #ffffff;">
            <i class="fas fa-check-circle"></i>
        </div>
        <div style="font-size: 1.5rem; font-weight: 500; margin-bottom: 0.5rem; opacity: 0; transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s; color: #ffffff;">
            Message Sent
        </div>
        <div style="font-size: 1rem; opacity: 0.8; opacity: 0; transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s; color: #cccccc;">
            Thank you for reaching out!
        </div>
    `;
    
    successOverlay.appendChild(successContent);
    document.body.appendChild(successOverlay);
    
    // Animate in
    setTimeout(() => {
        successOverlay.style.opacity = '1';
        successContent.style.transform = 'translateY(0)';
        
        // Animate in the icon and text elements
        setTimeout(() => {
            successContent.querySelectorAll('div').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                }, index * 200);
            });
        }, 300);
    }, 50);
    
    // Animate out after 2.5 seconds
    setTimeout(() => {
        successOverlay.style.opacity = '0';
        successContent.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(successOverlay);
        }, 600);
    }, 2500);
}
```

## Step 6: Test the Integration
1. Deploy your website with the updated code
2. Fill out the contact form
3. Submit the form
4. Check your Google Sheet to see if the data appears
5. Verify all fields are captured correctly

## Troubleshooting
- **CORS errors**: Make sure your domain is properly configured
- **Script not found**: Double-check the Google Apps Script URL
- **Data not appearing**: Check the Apps Script logs for errors
- **Form not submitting**: Verify the form action URL is correct

## Security Notes
- The Google Apps Script URL will be visible in your HTML
- Consider adding rate limiting or CAPTCHA for production use
- Monitor your Google Sheets for spam submissions

## Optional Enhancements
- Add email notifications when new submissions arrive
- Set up automatic backups of the Google Sheet
- Add data validation and sanitization
- Implement spam filtering

## Files to Update
- `contact.html` - Add form action URL
- `script.js` - Replace form handling logic
- `README_form_response.md` - This file (for reference) 