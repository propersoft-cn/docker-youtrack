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
  title: '任务粒度不能超过 3 天评估工时',
  action: function(ctx) {
    var issue = ctx.issue;
    var period = issue.fields.Estimation;
    var minutes = !period ? 0 : (period.getMinutes() + 60 * (period.getHours() + 8 * (period.getDays() + 5 * period.getWeeks())));
    var isOvertime = minutes > 3*8*60;
    var isParent = issue.links["parent for"].size > 0 && issue.links["subtask of"].size === 0;
    var isRestricted = isOvertime && !isParent;
    workflow.check(!isRestricted, '任务([' + issue.id + '])粒度不能超过 3 天评估工时！');
  },
  requirements: {
    // TODO: add requirements
  }
});