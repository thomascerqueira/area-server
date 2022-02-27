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
  let Area = {
    name: "Area",
    actions: [],
    reactions: []
  }
  let Weather = {
    name: "Weather",
    actions: [],
    reactions: []
  }

  githubEvent.forEach((evt) => {
    GitHub.actions.push({
      name: evt,
      inputs: [
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

  Area.reactions.push({
    name: 'send_mail',
    inputs: [
      {
        name: "email",
        type: "email"
      }]
  })

  Weather.actions.push({
      name: "temp",
      inputs: [
        {
          name: "city",
          type: "string"
        },
        {
          name: "check",
          type: "string"
        }
      ]
    },
    {
      name: "pollution",
      inputs: [
        {
          name: "city",
          type: "string"
        },
        {
          name: "check",
          type: "string"
        }
      ]
    })

  ourServices = [
    GitHub,
    Area,
    Weather
  ]

  const data = JSON.stringify(ourServices)

  fs.writeFileSync('./service.json', data, (err => {
    if (err) {
      console.log(err)
    }
  }))
}

export {
  createJsonServices
};
