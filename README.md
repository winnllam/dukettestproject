# Duket

## Design

### Frontend

The UI would need to have an input for email and credit card information. Upon submission, the API from Django would be called to process the payment. The email and card info will be securely sent.

### Backend

Django would need to integrate Stripe to send payments backwards. Only one pay method would be needed. The method should check if the user already exists via email to update the right entries on Stripe by account.

## Installation

```bash
cd duckettestproject
cd backend
pip install -r requirements.txt

cd ../frontend
npm install
```

Add a `/env` file in `/backend/dukettestproject`:

```bash
STRIPE_SECRET_KEY=secret key here
```

Add a `/env` file in `/frontend`:

```bash
VITE_STRIPE_PUBLIC_KEY=public key here
```

## Run

```bash
cd backend
python manage.py runserver

cd ../frontend
npm run dev
```
