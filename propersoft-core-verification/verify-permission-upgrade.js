/**
 * This is a template for an on-change rule. This rule defines what
 * happens when a change is applied to an issue.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/standalone/2018.1/Quick-Start-Guide-Workflows-JS.html
 */

var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: '验证权限升级',
  guard: function(ctx) {
    var issue = ctx.issue;
    if (issue.isChanged('State') && issue.State.presentation === 'Verified') {
      var period = issue.fields.Estimation;
      var minutes = !period ? 0 : (period.getMinutes() + 60 * (period.getHours() + 8 * (period.getDays() + 5 * period.getWeeks())));
      var delays = issue.Delays || 0;
      var rejects = issue.Rejects || 0;
      var difficulty = issue.Difficulty || 1;
      var result = minutes * (1 - delays * 0.1) * (1 - rejects * 0.1) * difficulty / 60 / 8;
      if (result > 1) {
        return true;
      }
    }
    return false;
  },
  action: function(ctx) {
    var issue = ctx.issue;
    var project = issue.project;
    var hasPermission = false;
    var currentUser = entities.User.current.login;
    hasPermission = currentUser === project.leader.login;
    workflow.check(hasPermission, '任务绩效点数超过 1 时，仅项目负责人 ' + project.leader.fullName + ' 可验证任务!');
  },
  requirements: {
    // TODO: add requirements
  }
});