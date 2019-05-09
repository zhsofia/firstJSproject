//every time the 'submit'-button is clicked, the funktion saveIssue is called
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//saves the new issue into the local storage
function saveIssue(e) {
    var issueId = chance.guid(); //creates a universal ID for each issue
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

//changes the status of the issue to closed
function setStatusClosed(id) {
    //gets the issues from local storage parses the issues into an array
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }
    //turns the issues-array into a JSON object and saves it in the local storage
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

//deletes the issue
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

//fetches the issues from the local storage, parses them into an array and saves them into local variable 'issues'
//creates the  inner html-part of the 'issuesList'-div
function fetchIssues() {
    //retrieving issues from local storage and turning them into an array
    var issues = JSON.parse(localStorage.getItem('issues'));
    //creating a variable to store the inner of the 'issuesList'-div
    var issuesList = document.getElementById('issuesList');
    //initialising it with empty String
    issuesList.innerHTML = '';


    //loop for creating the inner html-part of the 'issuesList'-div
    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;


        issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' +
            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' +
            '</div>';
    }
}