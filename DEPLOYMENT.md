# Deployment Guide - Google Cloud Platform

This guide will help you deploy Liquid UI to Google Cloud Platform with the domain `liquid-ui.strayeye.com`.

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Domain ownership** of `strayeye.com`
3. **GitHub repository** access
4. **gcloud CLI** installed locally (for initial setup)

## Step 1: Google Cloud Project Setup

### Use Existing Project
```bash
# Set as default project (using existing strayeye project with billing)
gcloud config set project strayeye

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable domains.googleapis.com
gcloud services enable iamcredentials.googleapis.com
```

### Create Service Account for GitHub Actions
```bash
# Create service account
gcloud iam service-accounts create github-actions-liquid \
    --description="Service account for GitHub Actions deployment" \
    --display-name="GitHub Actions Liquid UI"

# Grant necessary permissions
gcloud projects add-iam-policy-binding strayeye \
    --member="serviceAccount:github-actions-liquid@strayeye.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding strayeye \
    --member="serviceAccount:github-actions-liquid@strayeye.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding strayeye \
    --member="serviceAccount:github-actions-liquid@strayeye.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
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

## Step 3: Setup Workload Identity Federation

Instead of using service account keys (which may be restricted by organizational policies), we use Workload Identity Federation for secure, keyless authentication:

```bash
# Create Workload Identity Pool
gcloud iam workload-identity-pools create "github-actions-pool" \
    --project="strayeye" \
    --location="global" \
    --description="Workload Identity Pool for GitHub Actions"

# Create OIDC Provider for GitHub Actions
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
    --project="strayeye" \
    --location="global" \
    --workload-identity-pool="github-actions-pool" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository=='memo/liquid-ui'"

# Allow GitHub Actions to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding "github-actions-liquid@strayeye.iam.gserviceaccount.com" \
    --project="strayeye" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/877046715242/locations/global/workloadIdentityPools/github-actions-pool/attribute.repository/memo/liquid-ui"
```

### GitHub Configuration

**No secrets required!** The GitHub Actions workflow uses Workload Identity Federation for secure authentication. The workflow is configured with:

- `WORKLOAD_IDENTITY_PROVIDER`: projects/877046715242/locations/global/workloadIdentityPools/github-actions-pool/providers/github-provider
- `GCP_SERVICE_ACCOUNT`: github-actions-liquid@strayeye.iam.gserviceaccount.com
- `GCP_PROJECT_ID`: strayeye

## Step 4: Initial Deployment

### Manual First Deployment (Optional)
```bash
# Build and push initial image
docker build -t gcr.io/strayeye/liquid-ui:initial .
docker push gcr.io/strayeye/liquid-ui:initial

# Deploy to Cloud Run
gcloud run deploy liquid-ui \
    --image gcr.io/strayeye/liquid-ui:initial \
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