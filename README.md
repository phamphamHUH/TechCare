# TechCare: CLOUD-BASED INTEGRATED INFORMATION SYSTEM FOR REYNA G. DIAGNOSTIC MEDICAL CLINIC
Group Members:
- Dela Cruz, Marc Jodel
- De Guzman, Mike Cleo
- Geronga, Laurence Anthony
- Juan, Randy Jr.
- Matangob, Jiano Freo

A full-stack clinic management system: patient records, front-desk queueing, lab requests, billing, and admin/user management, split into role-based dashboards (Admin, Doctor, Front Desk, Lab Staff, Patient).

**Live site:** https://techcare-1.onrender.com/

## Features

| Role | Features |
|------|----------|
| Front Desk | Patient registration · Patient records · Queue management (consultation & lab) · Billing |
| Laboratory Staff | Lab test requests · Lab results |
| Admin | User management · Service & pricing management · Activity monitoring |
| Doctor | Consultation dashboard |
| Public | Live queue tracking display |
| Auth | Role-based login with JWT, per-role dashboards |
## Environment Variables

### Backend (`backend/.env`, not committed)

Same shape in all 4 deployment scenarios below — only `CORS_ORIGIN` needs to change per scenario.

```
PORT=5000
MODE=development

DATABASE_URL=your_neon_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CORS_ORIGIN=<see table below>
IS_PRODUCTION=false or true
```

### Frontend (`frontend/.env` or `frontend/.env.local`)

|  | Scenario | `frontend/.env(.local)` | backend `CORS_ORIGIN` |
|---|---|---|---|
| 1 | Local monolithic | `VITE_IS_DEVELOPMENT=true` | `http://localhost:5000` |
| 2 | Prod monolithic | `VITE_IS_DEVELOPMENT=false` | `https://techcare-1.onrender.com` |
| 3 | Local distributed | `VITE_IS_DEVELOPMENT=true` | `http://localhost:5173` |
| 4 | Prod distributed | `VITE_IS_DEVELOPMENT=false`<br>`VITE_API_BASE_URL=https://techcare-hui6.onrender.com` | `https://your-frontend-static-site.onrender.com` |



# for sharing on port forwardng
VITE_API_BASE_URL=devtunnelIP

# for local development 
VITE_API_BASE_URL=http://localhost:5000

# for deployment
#VITE_API_BASE_URL=https://techcare-hui6.onrender.com

VITE_IS_DEVELOPMENT=false