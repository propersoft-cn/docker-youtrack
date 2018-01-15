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
  title: '绩效因子仅项目负责人和任务创建人可调整',
  action: function(ctx) {
    var issue = ctx.issue;
    var project = issue.project;
    if (issue.isChanged('Delays') || issue.isChanged('Rejects') || issue.isChanged('Type') || issue.isChanged('Priority')) {
      var hasPermission = false;
      var isDelaysChanged = issue.hasOwnProperty('Delays') && issue.isChanged('Delays');
      var isRejectsChanged = issue.hasOwnProperty('Rejects') && issue.isChanged('Rejects');
      var isDifficultyChanged = issue.hasOwnProperty('Difficulty') && issue.isChanged('Difficulty');
      var onlyPriorityChangedWhenAssign = issue.isChanged('Priority') && issue.isChanged('Assignee') && !isDelaysChanged && !isRejectsChanged && !issue.isChanged('Type') && !isDifficultyChanged;
      var currentUser = entities.User.current.login;
      var changedByWorkflow = currentUser.indexOf('workflow') > -1;
      hasPermission = currentUser === issue.reporter.login || currentUser === project.leader.login || onlyPriorityChangedWhenAssign || changedByWorkflow;
      workflow.check(hasPermission, '绩效因子仅项目负责人 ' + project.leader.fullName + ' 和任务创建人 ' + issue.reporter.fullName + ' 可调整!');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});