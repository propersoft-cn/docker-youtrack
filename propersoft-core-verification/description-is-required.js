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
  title: '必须填写任务描述',
  action: function(ctx) {
    var issue = ctx.issue;
    var assigning = issue.isChanged('Assignee') && issue.Assignee !== null;
    var verifing = issue.State.presentation === 'Verified';
    if (assigning || verifing) {
      var hasDescription = issue.description > '';
      workflow.check(hasDescription, '任务必须有明确的描述、任务内容、验收标准等，否则不能进行指派及验收！');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});