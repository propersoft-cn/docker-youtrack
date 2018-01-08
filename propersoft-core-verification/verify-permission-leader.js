/**
 * This is a template for an on-change rule. This rule defines what
 * happens when a change is applied to an issue.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/standalone/2017.2/Quick-Start-Guide-Workflows-JS.html
 */

var entities = require('v1/entities');
var workflow = require('v1/workflow');

exports.rule = entities.Issue.onChange({
  title: '仅项目负责人可验证任务',
  action: function(ctx) {
    var issue = ctx.issue;
    var project = issue.project;
    if (issue.isChanged('State') && issue.State.presentation === 'Verified') {
      var hasPermission = false;
      var currentUser = entities.User.current.login;
      hasPermission = currentUser === project.leader.login;
      workflow.check(hasPermission, '仅项目负责人 ' + project.leader.fullName + ' 可验证任务!');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});