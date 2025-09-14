# Deployment Guide - Google Cloud Platform

This guide will help you deploy Liquid UI to Google Cloud Platform with the domain `liquid-ui.strayeye.com`.

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Domain ownership** of `strayeye.com`
3. **GitHub repository** access
4. **gcloud CLI** installed locally (for initial setup)

## Step 1: Google Cloud Project Setup

### Create and Configure Project
```bash
# Create new project (or use existing)
gcloud projects create liquid-ui-prod --name="Liquid UI Production"

# Set as default project
gcloud config set project liquid-ui-prod

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable domains.googleapis.com
```

### Create Service Account for GitHub Actions
```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --description="Service account for GitHub Actions deployment" \
    --display-name="GitHub Actions"

# Grant necessary permissions
gcloud projects add-iam-policy-binding liquid-ui-prod \
    --member="serviceAccount:github-actions@liquid-ui-prod.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding liquid-ui-prod \
    --member="serviceAccount:github-actions@liquid-ui-prod.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding liquid-ui-prod \
    --member="serviceAccount:github-actions@liquid-ui-prod.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Create and download service account key
gcloud iam service-accounts keys create ~/github-actions-key.json \
    --iam-account=github-actions@liquid-ui-prod.iam.gserviceaccount.com
```

## Step 2: Domain Configuration

### Set up Custom Domain in Cloud Run
```bash
# Add domain mapping (this will be automated in GitHub Actions)
gcloud run domain-mappings create \
    --service=liquid-ui \
    --domain=liquid-ui.strayeye.com \
    --region=us-central1 \
    --platform=managed
```

### Configure DNS Records
Add these DNS records to your `strayeye.com` domain:

```
Type: CNAME
Name: liquid-ui
Value: ghs.googlehosted.com
TTL: 3600
```

## Step 3: GitHub Secrets Configuration

Add these secrets to your GitHub repository:

### Required Secrets
```bash
# In GitHub repo: Settings > Secrets and Variables > Actions

GCP_PROJECT_ID = "liquid-ui-prod"
GCP_SA_KEY = "contents of ~/github-actions-key.json"
```

### Optional Secrets (for notifications)
```bash
SLACK_WEBHOOK_URL = "your-slack-webhook-url"
CODECOV_TOKEN = "your-codecov-token"
NPM_TOKEN = "your-npm-token"
```

## Step 4: Initial Deployment

### Manual First Deployment (Optional)
```bash
# Build and push initial image
docker build -t gcr.io/liquid-ui-prod/liquid-ui:initial .
docker push gcr.io/liquid-ui-prod/liquid-ui:initial

# Deploy to Cloud Run
gcloud run deploy liquid-ui \
    --image gcr.io/liquid-ui-prod/liquid-ui:initial \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 3000 \
    --memory 2Gi \
    --cpu 2 \
    --max-instances 20 \
    --min-instances 1
```

## Step 5: Automated Deployment

Once configured, deployments are fully automated:

- **Push to `main`** → Triggers production deployment
- **Push to `develop`** → Triggers staging deployment (optional)
- **Pull requests** → Runs tests and builds

### Deployment Flow
1. **Quality Gates** - Tests, linting, type checking
2. **Security Audit** - Dependency vulnerability scan
3. **Build** - Creates optimized production build
4. **Deploy** - Pushes to Google Cloud Run
5. **Domain Mapping** - Configures custom domain
6. **Health Check** - Verifies deployment success
7. **Release** - Creates GitHub release

## Step 6: Monitoring and Maintenance

### View Deployment Status
```bash
# Check service status
gcloud run services describe liquid-ui --region us-central1

# View logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=liquid-ui" --limit 50

# Check domain mapping
gcloud run domain-mappings describe liquid-ui.strayeye.com --region us-central1
```

### Performance Optimization
The deployment includes:
- **Multi-stage Docker build** for optimized images
- **Standalone Next.js build** for minimal runtime
- **Cloud Run autoscaling** (1-20 instances)
- **2GB memory / 2 CPU** allocation
- **Static asset optimization**

### Security Features
- **Least privilege** service account permissions
- **Container security** with non-root user
- **HTTPS only** with automatic SSL certificates
- **Vulnerability scanning** in CI/CD pipeline

## Architecture Overview

```
GitHub Push (main) 
    ↓
GitHub Actions CI/CD
    ↓
Quality Gates (tests, lint, security)
    ↓
Docker Build (multi-stage)
    ↓
Google Container Registry
    ↓
Google Cloud Run
    ↓
Custom Domain (liquid-ui.strayeye.com)
```

## Troubleshooting

### Common Issues

1. **Domain mapping failed**
   - Verify DNS CNAME record is set correctly
   - Wait for DNS propagation (up to 24 hours)

2. **Deployment timeout**
   - Check build logs in GitHub Actions
   - Verify service account permissions

3. **Service not accessible**
   - Check Cloud Run service status
   - Verify firewall rules allow traffic

### Useful Commands
```bash
# Check deployment status
gcloud run services list

# View service details
gcloud run services describe liquid-ui --region us-central1

# Check logs
gcloud logging read "resource.type=cloud_run_revision" --limit 10

# Test health endpoint
curl https://liquid-ui.strayeye.com/health
```

## Cost Optimization

- **Pay per request** - No charges when not in use
- **Automatic scaling to zero** when no traffic
- **Minimum 1 instance** for faster cold starts
- **Estimated cost**: $10-50/month depending on traffic

---

🎉 **Your Liquid UI deployment is ready!**

Visit: **https://liquid-ui.strayeye.com**