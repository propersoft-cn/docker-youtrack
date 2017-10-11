/**
 * This is a template for an on-schedule rule. This rule defines
 * operations that are performed on a set schedule.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/standalone/2017.2/Quick-Start-Guide-Workflows-JS.html
 */

var entities = require('v1/entities');

exports.rule = entities.Issue.onSchedule({
  title: '优先级自动升级',
  search: '#Unresolved #Major #Critical #Show-stopper ',
  cron: '0 0 2 * * ?',
  action: function(ctx) {
    var issue = ctx.issue;
    var major = issue.project.findFieldByName('Priority').findValueByName('Major');
    var critical = issue.project.findFieldByName('Priority').findValueByName('Critical');
    var ss = issue.project.findFieldByName('Priority').findValueByName('Show-stopper');
    if (issue.Priority.name === 'Major') {
      issue.Priority = critical;
    } else if (issue.Priority.name === 'Critical') {
      issue.Priority = ss;
    } else if (issue.Priority.name === 'Show-stopper') {
      var dd = issue.Delays || 0;
      issue.Delays = dd + 1;
    }
  },
  requirements: {
    // TODO: add requirements
  }
});