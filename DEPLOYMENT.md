# Backend Deployment Guide - Render.com

## Quick Deployment Steps

### 1. Render Setup
1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Use the following configuration:

### 2. Environment Variables
Set these environment variables in Render:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Port for Render | `10000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |

### 3. Build & Start Commands
- **Build Command**: `npm run render-build`
- **Start Command**: `npm run render-start`

### 4. Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm run seed         # Seed test data

# Production
npm run build        # Build command placeholder
npm run prod         # Production mode locally
npm run render-build # Render build command
npm run render-start # Render start command
```

### 5. MongoDB Setup
1. Create MongoDB Atlas cluster (free tier available)
2. Get connection string
3. Add IP whitelist for Render (0.0.0.0/0 for testing)
4. Update `MONGODB_URI` in Render environment variables

### 6. File Uploads
- PDF uploads will be stored in `/uploads` directory
- Files are accessible via `/uploads/filename.pdf`
- Consider using cloud storage (AWS S3) for production

### 7. Testing the Deployment
After deployment, test these endpoints:
- `GET /api/tests` - Should return test templates
- `POST /api/patients` - Should create patient report
- `GET /uploads/` - Should list uploaded files

### 8. Troubleshooting
- Check Render logs for any startup issues
- Ensure MongoDB connection string is correct
- Verify environment variables are set
- Check if port 10000 is being used