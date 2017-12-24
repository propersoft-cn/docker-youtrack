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
  title: '必须填写评估工时',
  action: function(ctx) {
    var issue = ctx.issue;
    var assigning = issue.isChanged('Assignee') && issue.Assignee !== null;
    var verifing = issue.State.presentation === 'Verified';
    if (assigning || verifing) {
      var isBug = issue.Type.name.toLowerCase().indexOf('bug') > -1;
      var period = issue.fields.Estimation;
      var minutes = !period ? 0 : (period.getMinutes() + 60 * (period.getHours() + 8 * (period.getDays() + 5 * period.getWeeks())));
      var hasEstimation = minutes > 0;
      var requireEstimation = !isBug && !hasEstimation;
      workflow.check(!requireEstimation, '非 bug 类型任务，指派或验证时必须填写评估工时！');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});