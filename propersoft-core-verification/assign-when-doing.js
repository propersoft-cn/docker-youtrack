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
  title: '请在Assignee状态不为空的情况下调整State到Doing',
  action: function(ctx) {
    var issue = ctx.issue;
    if(issue.State.name == "Doing") {
      var couldAssign = issue.Assignee !== null && issue.Assignee.name != "Unassigned";
      workflow.check(couldAssign, '请在Assignee状态不为空的情况下调整State到Doing');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});