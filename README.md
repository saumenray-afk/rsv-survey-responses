# RSV Club House Survey - Progressive Web App (PWA)

A mobile-friendly Progressive Web App for collecting resident preferences for RSV Club House facilities.

## 📱 Features

- ✅ **Mobile-Optimized**: Beautiful, responsive design for all devices
- ✅ **Installable**: Can be installed on home screen like a native app
- ✅ **Offline Capable**: Works even without internet connection
- ✅ **GitHub Storage**: Responses automatically saved to GitHub repository
- ✅ **Local Backup**: Data saved locally if internet fails
- ✅ **16 Choice Sets**: Complete CBC survey for MNL estimation
- ✅ **Resident Info**: Captures Villa number, name, and phone number

## 🚀 Setup Instructions

### Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click "+" → "New repository"
3. Name it: `rsv-survey-responses`
4. Set to **Private** (to protect resident data)
5. Initialize with README
6. Click "Create repository"

### Step 2: Generate GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Note: `RSV Survey App`
4. Expiration: Select appropriate duration
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)

### Step 3: Create Repository Structure

In your `rsv-survey-responses` repository:

1. Click "Add file" → "Create new file"
2. Type: `responses/.gitkeep`
3. Commit the file

This creates the `responses` folder where survey data will be stored.

### Step 4: Configure the App

Edit `app.js` and replace these values:

```javascript
const GITHUB_CONFIG = {
    owner: 'YOUR_GITHUB_USERNAME',     // Your GitHub username
    repo: 'rsv-survey-responses',      // Your repository name
    token: 'YOUR_GITHUB_TOKEN',        // Token from Step 2
    branch: 'main'                     // Default branch
};
```

**Example:**
```javascript
const GITHUB_CONFIG = {
    owner: 'john-doe',
    repo: 'rsv-survey-responses',
    token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    branch: 'main'
};
```

⚠️ **SECURITY NOTE**: Never commit the token to public repositories. This app is meant to be hosted privately.

### Step 5: Host the App

#### Option A: GitHub Pages (Free, Simple)

1. Create a NEW public repository: `rsv-survey-app`
2. Upload all files EXCEPT `app.js` first
3. Edit `app.js` in a text editor with your credentials
4. In GitHub repo settings → Pages:
   - Source: Deploy from branch
   - Branch: main
   - Folder: / (root)
5. Save and wait 2-3 minutes
6. Your app URL: `https://YOUR_USERNAME.github.io/rsv-survey-app/`

⚠️ **Security**: Since this is public, consider:
- Using environment variables
- Or hosting on a private server
- Token has access only to `rsv-survey-responses` repo

#### Option B: Netlify (Free, Easy)

1. Go to https://netlify.com
2. Sign up/Login
3. Drag and drop your survey folder
4. Site deploys in seconds
5. Custom domain available

#### Option C: Vercel (Free, Fast)

1. Go to https://vercel.com
2. Sign up/Login
3. Import your project
4. Deploy in one click

#### Option D: Local Testing

1. Install Python (if not installed)
2. Open terminal in the survey folder
3. Run: `python -m http.server 8000`
4. Open browser: `http://localhost:8000`

### Step 6: Test the App

1. Open the app URL on your mobile phone
2. Click "Install" if prompted (adds to home screen)
3. Fill in sample data:
   - Villa: A-101
   - Name: Test User
   - Phone: 9876543210
4. Complete all 16 choice sets
5. Submit
6. Check your GitHub repository → responses folder
7. You should see: `response_A101_timestamp_random.json`

## 📊 Accessing Survey Data

### View All Responses

1. Go to your GitHub repository
2. Navigate to `responses` folder
3. Each file is one response in JSON format

### Download All Data

```bash
git clone https://github.com/YOUR_USERNAME/rsv-survey-responses.git
cd rsv-survey-responses/responses
```

### Convert to CSV for Analysis

Create a Python script `convert_to_csv.py`:

```python
import json
import csv
import glob
import os

# Get all JSON files
json_files = glob.glob('responses/*.json')

# Prepare CSV
csv_file = 'survey_responses.csv'
csv_data = []

for file_path in json_files:
    with open(file_path, 'r') as f:
        data = json.load(f)
        
        # Extract resident info
        villa = data['residentInfo']['villaNo']
        name = data['residentInfo']['residentName']
        phone = data['residentInfo']['phoneNo']
        timestamp = data['submittedAt']
        
        # Extract responses
        for response in data['responses']:
            choice_set = response['choiceSet']
            selected = response['selectedOption']
            
            csv_data.append({
                'VillaNo': villa,
                'Name': name,
                'Phone': phone,
                'Timestamp': timestamp,
                'ChoiceSet': choice_set,
                'SelectedOption': selected
            })

# Write CSV
with open(csv_file, 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['VillaNo', 'Name', 'Phone', 'Timestamp', 'ChoiceSet', 'SelectedOption'])
    writer.writeheader()
    writer.writerows(csv_data)

print(f"Converted {len(json_files)} responses to {csv_file}")
```

Run: `python convert_to_csv.py`

## 📱 Distributing to Residents

### Method 1: QR Code

1. Generate QR code for your app URL using: https://qr-code-generator.com
2. Print and display in common areas
3. Share in WhatsApp groups

### Method 2: Direct Link

Share the URL via:
- WhatsApp
- Email
- SMS
- Notice boards

### Method 3: Install Instructions

Share with residents:

```
📱 RSV Club House Survey

1. Open this link on your phone: [YOUR_APP_URL]
2. Click "Install" when prompted
3. App will be added to your home screen
4. Open and complete the survey
5. Takes only 5-10 minutes!

Your feedback will help us design the perfect club house.
```

## 🔧 Customization

### Change Colors

Edit CSS variables in `index.html`:

```css
:root {
    --primary: #2563eb;      /* Main blue color */
    --primary-dark: #1e40af; /* Darker blue */
    --success: #10b981;      /* Green for success */
}
```

### Modify Survey Questions

Edit `survey-data.js` to change choice sets, add/remove options.

### Add More Fields

In `index.html`, add new fields in the "Resident Information" section:

```html
<div class="form-group">
    <label for="email">Email (Optional)</label>
    <input type="email" id="email" placeholder="your@email.com">
</div>
```

Update `app.js` to capture the new field:

```javascript
residentInfo = {
    villaNo,
    residentName,
    phoneNo,
    email: document.getElementById('email').value,
    timestamp: new Date().toISOString()
};
```

## 🔒 Security Best Practices

1. **Never commit tokens** to public repositories
2. **Use environment variables** for production
3. **Keep response repo private**
4. **Limit token scope** to only necessary permissions
5. **Rotate tokens** periodically
6. **Use HTTPS** always (GitHub Pages/Netlify/Vercel provide this)

## 📊 Data Structure

Each response is saved as JSON:

```json
{
  "residentInfo": {
    "villaNo": "A-101",
    "residentName": "John Doe",
    "phoneNo": "9876543210",
    "timestamp": "2025-01-15T10:30:00.000Z"
  },
  "responses": [
    {
      "choiceSet": 1,
      "selectedOption": "B"
    },
    {
      "choiceSet": 2,
      "selectedOption": "A"
    }
    // ... 16 choice sets total
  ],
  "submittedAt": "2025-01-15T10:35:00.000Z"
}
```

## 📈 Analyzing Results

Once you have responses:

1. Download all JSON files
2. Convert to CSV using the script above
3. Import to Excel/Google Sheets
4. Or use R/Python for MNL estimation
5. Refer to `MNL_Estimation_Guide.txt` for analysis

## 🆘 Troubleshooting

### Issue: Responses not saving to GitHub

**Solution:**
- Check internet connection
- Verify GitHub token is correct
- Check token hasn't expired
- Ensure `responses` folder exists in repo
- Responses saved locally as backup

### Issue: App not installing on phone

**Solution:**
- Make sure using HTTPS (not HTTP)
- Try on different browser (Chrome recommended)
- Clear browser cache and retry

### Issue: Can't see responses in GitHub

**Solution:**
- Check correct repository name
- Verify you have access to repo
- Look in `responses` folder specifically
- Check if repo is private (need to be logged in)

## 📞 Support

For technical issues or questions, contact the survey administrator.

## 📝 License

This is a private survey tool for RSV residents only.

---

**Built with ❤️ for RSV Community**
