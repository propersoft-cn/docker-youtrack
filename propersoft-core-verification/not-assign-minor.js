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
  title: '优先级 Minor 的任务暂不能指派责任人',
  action: function(ctx) {
    var issue = ctx.issue;
    if(issue.isChanged('Assignee')) {
      var couldAssign = issue.Priority.name != 'Minor';
      workflow.check(couldAssign, '请先不要指派优先级为 Minor 的任务！');
    }
  },
  requirements: {
    // TODO: add requirements
  }
});