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
  title: 'TimeTracking 必须填写 comment',
  action: function(ctx) {
    var issue = ctx.issue;
    if (issue.workItems.size > 0) {
	  workflow.check(issue.workItems.last().description !== null, 'Time Tracking 必须填写备注！');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});