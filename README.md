# RoboZone Website

Runs both the site and a PocketBase backend to manage data.

Deployment steps:

- Clone repository, install Docker
- Create volume with `docker volume create data`
- Run `docker compose up`
- Head to admin dashboard
- Set up `signups` with the following fields:
    - Text: `name`
    - Text: `guardian`
    - Email: `email`
    - Email: `guardian_email`
    - Number: `grade`
- Make sure you can create entries without admin
