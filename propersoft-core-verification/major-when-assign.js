/**
 * This is a template for an on-change rule. This rule defines what
 * happens when a change is applied to an issue.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/standalone/2017.2/Quick-Start-Guide-Workflows-JS.html
 */

var entities = require('v1/entities');

exports.rule = entities.Issue.onChange({
  title: '指派任务的同时，优先级提升为 Major',
  action: function(ctx) {
    var issue = ctx.issue;
    if(issue.isChanged('Assignee') && issue.Assignee !== null) {
      issue.Priority = issue.project.findFieldByName('Priority').findValueByName('Major');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});