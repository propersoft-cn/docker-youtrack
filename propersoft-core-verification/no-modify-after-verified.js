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
  title: '任务验证后任何内容不得改动',
  action: function(ctx) {
    var issue = ctx.issue;
    var verified = !issue.isChanged('State') && issue.State.presentation === 'Verified';
    workflow.check(!verified, '任务验证后任何内容不得改动！');
  },
  requirements: {
    // TODO: add requirements
  }
});