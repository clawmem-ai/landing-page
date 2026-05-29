# Repository Instructions

## Deployment

- `main` represents the staging environment.
- Merging into `main` triggers the Vercel staging deployment.
- Production deployment is triggered by a Git tag.
- Production tags must start with `v` and use the format `vYYYYMMDD-HHMMSS`, for example `v20260506-210920`.
- Do not create, move, delete, or push production tags unless the user explicitly asks for a production deployment.
