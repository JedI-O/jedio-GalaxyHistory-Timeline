# jedio-GalaxyHistory-Timeline

An AngularJS based TimeLine with day / month / year view for HTML content eventsss

# Install
You can download all necessary angular-horizontal-timeline files manually or install it with bower:

```
$ bower install --save angular-horizontal-timeline
```

# Load
To use the directive, include the angular-horizontal-timeline's javascript and css files in your web page:

```
<script src="angular-horizontal-timeline.js"></script>

<link rel="stylesheet" href = "http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="timeline.less">
```

# Add module dependency
```
var GalaxyApp = angular.module('GalaxyApp', ['angular-horizontal-timeline']);
```


# Usage
```
                <Jedio-GalaxyHistory-Timeline selected-event="selected"
                                              events="events"
                                              currentday="currentday"
                                    >
                </Jedio-GalaxyHistory-Timeline>
```
