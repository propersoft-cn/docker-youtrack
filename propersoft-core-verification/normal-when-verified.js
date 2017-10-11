/**
 * This is a template for an on-change rule. This rule defines what
 * happens when a change is applied to an issue.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/standalone/2017.2/Quick-Start-Guide-Workflows-JS.html
 */

var entities = require('v1/entities');

exports.rule = entities.Issue.onChange({
  title: '任务达到验证状态时，优先级变为 Normal',
  action: function(ctx) {
    var issue = ctx.issue;
    if(issue.State.presentation === 'Verified') {
      issue.Priority = issue.project.findFieldByName('Priority').findValueByName('Normal');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});