/**
 * Jedio-GalaxyHistory-Timeline
 *
 * halemo91
 * https://github.com/JedI-O/jedio-timelime.git
 * Licensed under the MIT license
 */


//**************************************************************************************************
// Html Template for the Jedio-GalaxyHistory-Timeline directive
//**************************************************************************************************

 var template_Combined =
 '<div align="center" ng-init="clearr();" > '+
     '<button  class="btn btn-primary " ng-click=" shows = true; zoomout() ; " ><span class="glyphicon glyphicon-zoom-out "></span> Year</button>   &nbsp; '+
     '<button  class="btn btn-primary" ng-click="shows = false;zoomin();" ><span  class="glyphicon glyphicon-zoom-in"></span> Month</button>  &nbsp;'+
     '<button  class="btn btn-primary" ng-click="shows = false;today();" ><span class="glyphicon glyphicon-time"></span> Today</button>  &nbsp;'+
     '<button  class="btn btn-primary" ng-click="shows = false;defaultt(); " ><span ></span> DefaultView</button>'+
'</div>'+
 '<br> '+
 '<div class="timeline">'+

 '<div class="timeline-left">'+
 '	<label> StartDate {{startDate}}</label>'+
 '</div>'+


 '<div class="timeline-center">'+
 '<div class="timeline-progress">'+
 '	<span ng-style="{width:timeline-progress_percent+\'%\'}"></span>'+

 '	<ul class="timeline-events">'+

 '  <div  ng-if=" ( (event.date >= startDate) && (event.date <= endDate) )" '+
 '  <section   class="timeline-event"   ng-repeat="event in events"     '+
 '			ng-click="setSelected($index)"'+
 '			event-date="event.date"'+
 '			title="{{event.date}}"'+
 '			timeline-event-marker> <span  class="glyphicon glyphicon-tags"></span> '+
 '       	<div  ng-show="selectedEvent === $index" '+

'		       class="timeline-event" > '+
 '           <span  class="glyphicon glyphicon-chevron-down " style ="color : white ;" ></span> '+

 '       </div>'+
    '		</section>'+
 '	</section>'+
 '	</div>'+




 '	<div  ng-if="day.date >startDate && day.date < endDate" '+
 '		<section   class="timeline-event"   ng-repeat="day in currentday"'+
 '			title="{{day.date}}"'+
 '			timeline-event-marker> <span  class="glyphicon glyphicon-time"></span>'+
 '			</section>'+
 '	</div>'+

 '	</ul>'+

 '	<ul class="timeline-bg">'+
 '		<li class="timeline-month"  ng-repeat="month in months "'+
 '			timeline-month><span title="{{month.date}}"> &nbsp;&nbsp;&nbsp;&#1161;  {{month.name}}</span>'+
 '			<ul>'+

 '				<li class="timeline-day" ng-hide ="shows == true" ng-repeat="day in month.days"'+
 '					ng-style="{ \'left\' : ($index * (97/month.days.length) )+\'%\'}">'+
 '					<span title="{{month.date + \'-\' + day}}"><i></i> {{day}}</span>'+
 '				</li>'+


 '			</ul></li>'+
 '  <div ng-show = " shows == true " > '+
 '<div  class="yearposleft"> {{CurrentYear1}}</div> <div  class="yearposright"> {{CurrentYear2}}</div>  '+

 '		</div>'+
 '	</ul>'+
 '</div>'+
 '</div>'+
 '<div class="timeline-right">'+
 '	<label>EndDate {{endDate}}</label>'+
 '</div>'+
 '	<div align ="center">'+
'<button class="btn btn-primary btn-lg" ng-click="left()" style="float:left;"><span class="glyphicon glyphicon-backward"></span> </button> '+
 '<button class="btn btn-primary btn-lg" ng-click="right()" style="float:right;" ><span class="glyphicon glyphicon-forward"></span> </button> '+

 '</div>'+
 '<br> '+ '<br> '+ '<br> '+ '<br> '+
  '<br> '+ '<br> '+ '<br> '+ '<br> '+
  '<br> '+ '<br> '+ '<br> '+ '<br> '+
   '	<div  ng-hide = " selectedEvent <= 0"  >'+
  '<button  class="btn btn-primary btn-lg" ng-click="selectedEvent = selectedEvent -1 " style="float:left;"><span class="glyphicon glyphicon-chevron-left"></span> </button>  '+
  '</div>'+
  '<div  ng-hide = " selectedEvent >= events.length -1 "  >'+
'<button  class="btn btn-primary btn-lg"   ng-click="selectedEvent = selectedEvent +1 " style="float:right;"><span class="glyphicon glyphicon-chevron-right"></span> </button>'+
 '</div>'+
  '<div  class=" EventsSlider2 ui-grid ng-isolate-scope grid " >'+

    '  <table class="table table-hover  "   style = "border-radius: 25px;" >'+
      '  <tr  " >'+

        '     <th >Title</th>'+
          '     <th >Content</th>'+
            '     <th >Date</th>'+

        ' </tr>'+
          '<tr " >'+

            '  <td ><div ng-bind-html="events[selectedEvent].title "></div></td>'+

              '<td ><div ng-bind-html="events[selectedEvent].content "></div></td>'+

              '<td><div ng-bind-html="events[selectedEvent].date "></div></td>'+
          '</tr>'+

      '</table>'+
    '</div>'


;


angular.module('angular-horizontal-timeline', ['ngSanitize'])
   //**************************************************************************************************
   // Jedio-GalaxyHistory-Timeline Directive
   //**************************************************************************************************

.directive('jedioGalaxyhistoryTimeline', function(){
	function controller($scope){



	$scope.months= [];
  $scope.view ='';

	$scope.getPosition = function(date)
  {

			date = moment(date);
      $scope.dates = new Date();
      $scope.mydate = "";
      $scope.mydate2 = "";

			var diff = date.diff(moment($scope.startDate), 'months');
			var curWeekWidth = 100/$scope.months[diff].days.length;
			var monthsWidth = 100/$scope.months.length;
			var ixOfWeek = Math.ceil(date.format('D')/7) - 1;
			var curDOfMPercent = (date.format('D') - $scope.months[diff].days[ixOfWeek] ) * 14.28; // default

      var ixOfWeek2 = Math.ceil(date.format('D')/60) - 1;
      var curDOfMPercent2 = (date.format('D') - $scope.months[diff].days[ixOfWeek] ) * 110.28; // monthsview

      var ixOfWeek3 = Math.ceil(date.format('D')/60) - 1;
      var curDOfMPercent3 = (date.format('D') - $scope.months[diff].days[ixOfWeek2] ) * 120.28; // yearview


    if ($scope.view === "default")
    return ( (monthsWidth * diff) + (((ixOfWeek * curWeekWidth) + (curDOfMPercent/ 100 * curWeekWidth)) / 100 * monthsWidth) );

    else if ($scope.view === "zoomout")
    return ( (monthsWidth * diff) + (((ixOfWeek * curWeekWidth) + (curDOfMPercent/ 100 * curWeekWidth)) / 100 * monthsWidth) );
    else {
        return ( (monthsWidth * diff) + (((ixOfWeek * curWeekWidth) + (curDOfMPercent/ 100 * curWeekWidth)) / 100 * monthsWidth) );
        }
  };

	$scope.init = function()
  {
		$scope.months = [];
		var range  = moment().range(moment($scope.startDate), moment($scope.endDate));
		range.by('months', function(month) {
			$scope.months.push({
				'date':month.format('YYYY-MM'),
				'name':month.format('MMM'),
       'new':moment(),
				'days':[]});

			var dayrange = moment().range(month.startOf('month').format('YYYY-MM-DD'), month.endOf('month').format('YYYY-MM-DD'));
			dayrange.by('weeks', function(week) {
				$scope.months[$scope.months.length - 1].days.push(week.format('DD'));
		           	});

	      	});
	}

  var clearall= $scope.$watch('startDate', $scope.init);


if ( $scope.events.length == 0)
  {

     $scope.startDate = moment().startOf('months').subtract(2, 'months').format('YYYY-MM-DD')
     $scope.endDate= moment().add(3, 'months').endOf('months').format('YYYY-MM-DD');
     $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
     $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;

     $scope.right = function()
     {
       $scope.startDate = moment($scope.startDate).startOf('months').add(1, 'months').format('YYYY-MM-DD');
       $scope.endDate = moment($scope.endDate).add(1, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');
       $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
       $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
     }

     $scope.left = function()
     {
       $scope.startDate = moment($scope.startDate).startOf('months').subtract(1, 'months').format('YYYY-MM-DD');
       $scope.endDate = moment($scope.endDate).endOf('months').subtract(1, 'months').subtract(1,'hour').format('YYYY-MM-DD');
       $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
       $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
     }
     $scope.zoomin = function()
    {
      $scope.startDate = moment( ).startOf('months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
      $scope.endDate = moment().add(1, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');

    }

    $scope.zoomout = function()
    {

      $scope.startDate = moment( ).startOf('year').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
      $scope.endDate = moment().endOf('year').add(1,'hour').subtract(59,'minute').subtract(59,'second').subtract(999,'millisecond').format('YYYY-MM-DD ');
      $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
      $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
     }
    $scope.today = function()
     {
      $scope.currentday.push({'date': moment().add(0, 'days').format('YYYY-MM-DD')});
      $scope.startDate = moment( ).startOf('months').subtract(4, 'months').format('YYYY-MM-DD');
     $scope.endDate = moment().add(3, 'months').endOf('months').format('YYYY-MM-DD');
      }
    $scope.defaultt = function()
    {
        $scope.startDate = moment( ).startOf('months').subtract(2, 'months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
        $scope.endDate = moment().add(3, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');
        $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
        $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
    }

} // end if
else   // if there is history events
{

    $scope.selectedEvent=$scope.events.length - 1;
    $scope.startDate = moment($scope.events[$scope.events.length - 1].date).startOf('months').subtract(2, 'months').format('YYYY-MM-DD');
    $scope.endDate= moment($scope.events[$scope.events.length - 1].date).endOf('months').add(2, 'months').subtract(1,'hour').format('YYYY-MM-DD ');
    $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
    $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
    $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;

    $scope.right = function()
    {
        $scope.startDate = moment($scope.startDate).startOf('months').add(1, 'months').format('YYYY-MM-DD');
        $scope.endDate = moment($scope.endDate).add(1, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');
        $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
        $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
          $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;
        $scope.$watch('startDate', $scope.init);
    }

    $scope.left = function()
    {
        $scope.startDate = moment($scope.startDate).startOf('months').subtract(1, 'months').format('YYYY-MM-DD');
        $scope.endDate = moment($scope.endDate).endOf('months').subtract(1, 'months').subtract(1,'hour').format('YYYY-MM-DD');
        $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
        $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
        $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;
        $scope.$watch('startDate', $scope.init);
    }

    var clearr = $scope.$watch('selectedEvent', function(newVal)   // intial view
          {


                this.mydate= $scope.events[newVal].date;
                        if (this.mydate > $scope.endDate || this.mydate <  $scope.startDate  )
                         {
                              $scope.startDate = moment(this.mydate).startOf('months').subtract(2, 'months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
                              $scope.endDate = moment(this.mydate).endOf('months').add(3, 'months').subtract(1,'hour').format('YYYY-MM-DD');
                         }
                           $scope.init();

          })  ;

        $scope.cleardef =    $scope.$watch('selectedEvent', function(newVal)
                      {


                      })  ;
          $scope.clearzoom =     $scope.$watch('selectedEvent', function(newVal)
                  {

                     });
          $scope.clearzoomout =     $scope.$watch('selectedEvent', function(newVal)
                      {


                          });

    $scope.zoomin = function()
    {
      if ( $scope.events.length == 0)
        {
          $scope.startDate = moment( ).startOf('months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
          $scope.endDate = moment().add(1, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');

        }
        else{

      $scope.view = "zoom";


      clearr();
      clearall();
     $scope.cleardef();
     $scope.startDate = moment( $scope.events[$scope.selectedEvent].date).startOf('months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
     $scope.endDate = moment($scope.events[$scope.selectedEvent].date).add(1, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');

       $scope.clearzoom =     $scope.$watch('selectedEvent', function(newVal)
               {
                  this.mydate= $scope.events[newVal].date;

                           if (this.mydate >= $scope.endDate || this.mydate <=  $scope.startDate  )
                           {

                           $scope.startDate = moment(this.mydate).startOf('months').format('YYYY-MM-DD');
                           $scope.endDate = moment(this.mydate).add(1, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');

                         }
                        $scope.init();


                  });
                     	$scope.$watch('startDate');



 $scope.clearzoomout();


}
    }



    $scope.defaultt = function()
    {

      if ( $scope.events.length == 0)
        {
          $scope.startDate = moment( ).startOf('months').subtract(2, 'months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
          $scope.endDate = moment().add(3, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');
          $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
          $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
        }

        else{

       $scope.view = "default";


           $scope.startDate = moment( $scope.events[$scope.selectedEvent].date).startOf('months').subtract(2, 'months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
          $scope.endDate = moment( $scope.events[$scope.selectedEvent].date).add(3, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');
          $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
          $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
          $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;
          $scope.cleardef =    $scope.$watch('selectedEvent', function(newVal)
                      {

                            this.mydate= $scope.events[newVal].date;

                                    if (this.mydate > $scope.endDate || this.mydate <  $scope.startDate  )
                                     {

                                          $scope.startDate = moment(this.mydate).startOf('months').subtract(2, 'months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
                                          $scope.endDate = moment(this.mydate).add(3, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');
                                          $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
                                          $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
                                          $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;
                                     }
                                        $scope.init();
                      })  ;

                                  	$scope.$watch('startDate', $scope.init());



                                   clearr();
    $scope.clearzoom();
     $scope.clearzoomout();

   }
    }

    $scope.$watch('selectedEvent', function(newValue){
      if(!$scope.events) return;

    });

    $scope.zoomout = function()
    {
      if ( $scope.events.length == 0)
        {
          $scope.startDate = moment( ).startOf('year').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
          $scope.endDate = moment().endOf('year').add(1,'hour').subtract(59,'minute').subtract(59,'second').subtract(999,'millisecond').format('YYYY-MM-DD ');
          $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
          $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
        }
        else{


      $scope.view = "zoomout";
     clearr();
     clearall();
      $scope.startDate = moment( $scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
      $scope.endDate = moment( $scope.events[$scope.selectedEvent].date).endOf('year').add(1,'hour').subtract(59,'minute').subtract(59,'second').subtract(999,'millisecond').format('YYYY-MM-DD ');
      $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
      $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
      $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;
          $scope.clearzoomout =    $scope.$watch('selectedEvent', function(newVal)
                 {
                this.mydate= $scope.events[newVal].date;

                             if (this.mydate >= $scope.endDate || this.mydate <=  $scope.startDate  )
                             {
                               $scope.startDate = moment( this.mydate).startOf('year').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
                                $scope.endDate = moment(this.mydate).endOf('year').add(1,'hour').subtract(59,'minute').subtract(59,'second').subtract(999,'millisecond').format('YYYY-MM-DD ');
                                $scope.CurrentYear1 = moment($scope.startDate).format('YYYY ') ;
                                $scope.CurrentYear2 = moment($scope.endDate).format('YYYY ') ;
                                $scope.CurrentYear3 = moment($scope.events[$scope.selectedEvent].date).startOf('year').format('YYYY') ;
                             }
                               $scope.init();
                    });

                     $scope.$watch('startDate');
$scope.clearzoom();
$scope.cleardef();
}
    }
    $scope.today = function()
    {

       clearr();
        $scope.currentday.push({'date': moment().add(0, 'days').format('YYYY-MM-DD')});
        $scope.startDate = moment( ).startOf('months').format('YYYY-MM-DD'); // for scrooling between years but give error when only zoom to month
        $scope.endDate = moment().add(0, 'months').endOf('months').subtract(1,'hour').format('YYYY-MM-DD');

        	$scope.$watch('startDate', $scope.init());
            if (  $scope.zoomin == true)
            {
              $scope.startDate = moment( ).startOf('month').format('YYYY-MM-DD');
             $scope.endDate= moment( ).endOf('month').format('YYYY-MM-DD');

            }
      $scope.clearzoom();
    }




    $scope.setSelected = function(index){
      $scope.selectedEvent = index;
    }


} // end of else

		}; // end of scope



	return {
		restrict: 'E',
		controller: controller,
		scope: {
      startDate: '@',
      			endDate: '@',
      			events: '=' ,
            zoomout: '&',
      			zoomin: '&',
           	today: '&',
      			defaultt: '&',
            left:'&',
            right:'&',
			events: '=' ,
      currentday: '=' ,
      selectedEvent: '=',
      translation:'=',
      filters : '='
		},
	template:template_Combined

	};
})

.directive('timelineMonth', function() {
	function link(scope, element, attr) {
		var monthWidth = 100/scope.months.length;
		element.css({'width': monthWidth+'%'});
	}
	return {
		restrict: 'A',
		link : link
	};
})

.directive('timelineEventMarker', function() {
	function link(scope, element, attr) {
		var eventDate = scope.$eval(attr.eventDate);
		var pos = scope.getPosition(eventDate);
		element.css({'left': pos+'%'});
		scope.$watch(function(){return scope.getPosition(eventDate)}, function(pos){
			element.css({'left': pos+'%'});
		});

	}
	return {
		restrict: 'A',
		link : link,
		scope: false
	};


});


//**************************************************************************************************
// The outscope controller
//**************************************************************************************************
var GalaxyApp = angular.module('GalaxyApp', ['angular-horizontal-timeline']);

GalaxyApp.controller('GalaxyCtrl', function ($scope,$http) {
  $scope.currentday = [] ;


         $scope.startDate = moment().startOf('months').subtract(3, 'months').format('YYYY-MM-DD');
        $scope.endDate = moment().endOf('months').add(3, 'months').format('YYYY-MM-DD');
   $scope.events = [
 {'date':moment().subtract(9, 'months').format('YYYY-MM-DD'), 'title' : 'Main Website for our company'  , 'content':'<a href="https://daz-services.com/">Daz Service </a>' },
       {'date':moment().startOf('months').subtract(2, 'months').format('YYYY-MM-DD'), 'title' : 'Job Offers'  , 'content':' <a href="http://www.jedio.de/"> JedI/O(Offers) </a> '   },
       {'date':moment().subtract(1, 'months').format('YYYY-MM-DD'), 'title' : 'Dark side of IT universe'  , 'content':' <a href="http://www.jedio.de/"> JedI/O </a> '   }

       ];



});
