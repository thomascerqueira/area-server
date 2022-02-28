# GitHub

## Description

For any ActionReaction from github we need:
```json
{
  "githubName": "Name of the User on GitHub": string,
  "repository": "Name of the repository where the User want to put the webhook": string,
  "token": "GitHub Token of the User": string,
  "event": "Event GitHub for the webhook, there are defined in the /services/get route": [string]
}
```
Example:
```json
{
  "githubName": "python",
  "repository": "data-structure",
  "token": "dfsd458df...",
  "event": "push"
}
```
The reaction will occur when a `Push` in the repository `data-structure` of the GitHub `python` is trigger
