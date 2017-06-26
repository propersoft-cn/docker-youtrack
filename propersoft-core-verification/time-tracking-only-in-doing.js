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
  // TODO: give the rule a human-readable title
  title: '仅 Doing 状态可以填写 Time Tracking',
  action: function(ctx) {
    var issue = ctx.issue;
    if (issue.State.presentation !== 'Doing') {
      issue.workItems.forEach(function(item) {
        workflow.check(!item.isChanged('duration'), '仅 Doing 状态可以填写 Time Tracking！');
      });
    }
  },
  requirements: {
    // TODO: add requirements
  }
});