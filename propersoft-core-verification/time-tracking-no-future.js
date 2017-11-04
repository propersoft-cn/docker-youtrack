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
  title: 'Time tracking 不能填写未来的时间！',
  action: function(ctx) {
    var issue = ctx.issue;
    issue.workItems.forEach(function(item) {
      var notInFuture = item.created >= item.date;
      workflow.check(notInFuture, 'Time tracking 不能填写未来的时间！内容为“' + item.description + '”的记录不符合要求，请联系填写人(' + item.creator.fullName + ')重新填写！');
    });
  },
  requirements: {
    // TODO: add requirements
  }
});