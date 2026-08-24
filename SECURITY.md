# Security Policy — platform-decision-kit

## Reporting a vulnerability

**Do not open a public issue for security problems.** Report privately so the fix ships before
the details are public:

- Preferred: [GitHub private vulnerability reporting](https://github.com/leonkoellerwirth-arch/platform-decision-kit/security/advisories/new)
- Or email: mhlihel@googlemail.com

Please include: what you found, how to reproduce it, and the impact you expect. A proof of
concept helps but is not required.

## What to expect

- Acknowledgement within **72 hours**.
- An assessment and, if valid, a fix timeline within **7 days**.
- Credit in the release notes once a fix is out, unless you prefer to stay anonymous.

## Scope

Secrets never live in this repository (CONSTITUTION §1); they are supplied only via the
environment. If you find a committed secret, treat it as a live incident and report it the same
way — do not test it.
