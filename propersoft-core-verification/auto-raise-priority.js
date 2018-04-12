/**
 * This is a template for an on-schedule rule. This rule defines
 * operations that are performed on a set schedule.
 *
 * For details, read the Quick Start Guide:
 * https://www.jetbrains.com/help/youtrack/standalone/2018.1/Quick-Start-Guide-Workflows-JS.html
 */

var entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onSchedule({
  title: '优先级自动升级',
  search: '#Unresolved #Major #Critical #Show-stopper -Unassigned',
  // From Tuesday to Saturday
  // For format details refer to http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger.html
  cron: '0 0 2 ? * TUE-SAT',
  guard: function(ctx) {
    var issue = ctx.issue;
    if (issue.State.name === 'Done' || issue.State.name === "Verified") {
      console.log('Due to bug of state field, ignore ' + issue.id + ' which has "Done" or "Verified" state.');
      return false;
    }
    return true;
  },
  action: function(ctx) {
    var issue = ctx.issue;
    // console.log('Start to raise priority of ' + issue.id);
    var critical = issue.project.findFieldByName('Priority').findValueByName('Critical');
    var ss = issue.project.findFieldByName('Priority').findValueByName('Show-stopper');
    
    if (issue.Priority.name === 'Major') {
      issue.Priority = critical;
    } else if (issue.Priority.name === 'Critical') {
      issue.Priority = ss;
    } else if (issue.Priority.name === 'Show-stopper') {
      var dd = issue.Delays || 0;
      issue.Delays = dd + 1;
    }
    // console.log('Complete raise priority of ' + issue.id);
  },
  requirements: {
    // TODO: add requirements
  }
});