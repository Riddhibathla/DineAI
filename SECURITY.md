# Security policy

Report vulnerabilities privately to the project maintainer. Do not open a public issue containing credentials, personal data, authentication bypasses, or reproducible exploit details.

## Security design

- Protected mutations require server-side authentication and role authorization.
- All public identifiers are non-sequential.
- Monetary totals are recalculated on the server using integer cents.
- Passwords are hashed with bcrypt; secrets belong in environment variables.
- SafePlate is decision support and never claims medical certification.
- Production must use HTTPS, a strong `AUTH_SECRET`, verified OAuth callbacks, an authenticated SMTP provider, and a restricted MongoDB Atlas user/IP policy.
