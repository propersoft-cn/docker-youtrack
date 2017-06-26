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
  title: '单条 Time Tracking 时间上限为 10 小时',
  action: function(ctx) {
    var issue = ctx.issue;
    issue.workItems.forEach(function(item) {
      workflow.check(item.duration <= 10*60, '单条 Time Tracking 时间上限为 10 小时！');
    });
  },
  requirements: {
    // TODO: add requirements
  }
});