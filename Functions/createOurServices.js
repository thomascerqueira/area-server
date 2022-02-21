import * as fs from "fs";

const githubEvent = [
  'check_run',
  'check_suite',
  'code_scanning_alert',
  'commit_comment',
  'create',
  'delete',
  'deploy_key',
  'deployment',
  'deployment_status',
  'fork',
  'gollum',
  'issue_comment',
  'issues',
  'label',
  'member',
  'meta',
  'milestone',
  'package',
  'package_v2',
  'page_build',
  'project',
  'project_card',
  'project_column',
  'public',
  'pull_request',
  'pull_request_review',
  'pull_request_review_comment',
  'push',
  'registry_package',
  'release',
  'repository',
  'repository_import',
  'repository_vulnerability_alert',
  'star',
  'status',
  'team_add',
  'watch'
]

function createJsonServices() {
  let ourServices = {}
  let GitHub = {
    name: "GitHub",
    actions: [],
    reaction: []
  };
  let Mail = {
    name: "Mail",
    actions: [],
    reaction: []
  }

  githubEvent.forEach((evt) => {
    GitHub.actions.push({
      name: evt,
      input: [
        {
          name: "githubName",
          type: "string"
        },
        {
          name: "repository",
          type: "string"
        }]
    })
  })

  Mail.reaction.push({
    name: 'send_mail',
    input: [
      {
        name: "email",
        type: "email"
      }]
  })

  ourServices = [
    GitHub,
    Mail
  ]

  const data = JSON.stringify(ourServices)

  fs.writeFile('service.json', data, (err => {
    if (err) {
      console.log(err)
    }
  }))
}

createJsonServices();
