# QA Automation Challenge – User Profile Form

## 🧪 Objective

This project is part of a technical QA challenge that involves automating the validation of a web form used to create a user profile. The tests are implemented using [Playwright](https://playwright.dev/) and follow modern QA best practices using the Page Object Model (POM).

Target application: [https://qa-assessment.pages.dev/](https://qa-assessment.pages.dev/)

---

## 🚀 Project Structure

aq-automatio/
├── pages/ # Page Object Models
│ └── FormPage.ts
├── tests/ # Automated test cases
│ └── form.spec.ts
├── playwright.config.ts # Playwright configuration
├── README.md # Instructions and documentation
└── playwright-report/ # Automatically generated reports


---

## ✅ Features Implemented

- ✔️ TC01 - Submit form with valid mandatory fields (First Name, Last Name, Email, Password, Confirm Password)

More test cases are planned and will be incrementally added (TC02 to TC30).

---

## 🛠️ Technologies Used

- Playwright (JavaScript)
- Node.js
- Page Object Model (POM)
- HTML5 field validation

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/qa-automation-challenge.git
cd qa-automation-challenge

# Install dependencies
npm install

Running Tests

# Run all tests
npx playwright test

# Show HTML test report
npx playwright show-report


Make sure playwright.config.ts contains:

reporter: [['html']]


📚 Next Steps (planned)
Add full coverage of all required and optional fields (TC02 → TC30).

Improve assertion granularity for field-level errors.

Cross-browser testing: Chromium, Firefox, WebKit.


👤 
HOTIO HEN VICKY DE PICARD – QA Engineer
Date: June 2025
Challenge link: https://qa-assessment.pages.dev/


---