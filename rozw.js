/* model z zadaniem */
    Zadanie = Backbone.Model.extend({
        defaults: {
	    arkusz: 0,/* numer makiety na ktorej wyswietlamy zadanie */
            kolejnosc: 0,/* kolejnosc zadania na makiecie */
            odpowiedz: 'sleep'/* prawidlowa tekstowa odpowiedz na zadanie */
        },
                dajodpowiedz: function( answer ){
            	var correct = this.get("odpowiedz");
		if ( answer.toLowerCase().replace(/ /g, '') == correct.toLowerCase() ) 
			return true; 
		else 
			return false;
        }
    });
    /* inicjalizacja prawidlowych odpowiedzi */
    var zad1 = new Zadanie({ arkusz: 0, kolejnosc: 0,odpowiedz: 'foggy',example: true});
    var zad2 = new Zadanie({ arkusz: 0, kolejnosc: 1,odpowiedz: 'raining'});
    var zad3 = new Zadanie({ arkusz: 0, kolejnosc: 2,odpowiedz: 'sunny'});
    var zad4 = new Zadanie({ arkusz: 0, kolejnosc: 3,odpowiedz: 'cloudy'});
    var zad5 = new Zadanie({ arkusz: 0, kolejnosc: 4,odpowiedz: 'windy'});
    var zad6 = new Zadanie({ arkusz: 0, kolejnosc: 5,odpowiedz: 'snowing'});
    var zad7 = new Zadanie({ arkusz: 1, kolejnosc: 0,odpowiedz: '2'});
    var zad8 = new Zadanie({ arkusz: 1, kolejnosc: 1,odpowiedz: '3'});
    var zad9 = new Zadanie({ arkusz: 1, kolejnosc: 2,odpowiedz: '4'});
    var zad10 = new Zadanie({ arkusz: 1, kolejnosc: 3,odpowiedz: '1'});
    var zad11 = new Zadanie({ arkusz: 1, kolejnosc: 4,odpowiedz: '5'});
    var zad12 = new Zadanie({ arkusz: 1, kolejnosc: 5,odpowiedz: '6'});
/* kolekcja zadan */
    var Lekcja = Backbone.Collection.extend({
        model: Zadanie
    });
    var mojaLekcja = new Lekcja([ zad1, zad2, zad3, zad4, zad5, zad6,zad7,zad8,zad9,zad10,zad11,zad12]);
    
/* klikniecie na rozwiazanie zadania i toggle na refresh */
    Klikacz = Backbone.Model.extend({
        defaults: {
	    count: 0
        },
		next: function(){
			var nc = this.get("count");
			nc++;
			this.set({count:nc});
		},
    });
        var klikacz = new Klikacz({ count: 1});
/* widok lekcji pierwszej */
     Lekcja0View = Backbone.View.extend({
        initialize: function(){
            this.render();
	    var ex = mojaLekcja.findWhere({arkusz: 0,example: true});
	    var cnt = ex.get("kolejnosc");
	    $('#pytanie'+cnt+'_input').val(ex.get("odpowiedz"));
        },
        render: function(){
            //Pass variables in using Underscore.js Template
	    var zadarr = mojaLekcja.where({arkusz: 0});
	    var odpow = "";
	    for ( var i = 0 ; i < zadarr.length ; i++ ) 
		odpow += zadarr[i].get("odpowiedz")+ " ";
/* dodawan ie zmiennych do szablonu */
            var variables = { zacheta: "Label the weather symbols",pytanie0: '1',pytanie1: '2',pytanie2: '3',pytanie3: '4',pytanie4: '5',pytanie5: '6',odpo: odpow };
            // Compile the template using underscore
            var template = _.template( $("#lesson0_template").html(), variables );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
        },
        events: {/* zdarzenie klikniecia na odpowiedz */
            "click #odp_button0": "doAnswer"  
        },
        doAnswer: function( event ){

	    klikacz.next();
	    if ( klikacz.get("count") % 2 == 0 ) {//dajemy odpowiedz w pp. refresh 
	    for ( var i = 0 ; i < 6 ; i++ )
	    {
		var user_answer = $('#pytanie'+i+'_input').val();
	    	var zad = mojaLekcja.findWhere({arkusz: 0,kolejnosc: i});
		var praw = zad.dajodpowiedz(user_answer);
		$('#ans'+i).html(( praw == true ? '<img src="images/icons/wrong.png"/>' : '<img src="images/icons/correct.png"/>' ));
		}
	    $('#odp_button0').css('background',"url('images/icons/refresh_white.png') no-repeat");
	    }
	    else { //refresh
	        for ( var i = 0 ; i < 6 ; i++ )
	    	{
		$('#pytanie'+i+'_input').val('');
		$('#ans'+i).html("");		
}

	    $('#odp_button0').css('background',"url('images/icons/tick_white.png') no-repeat");
		}
        }
    });
     Lekcja1View = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            //Pass variables in using Underscore.js Template
            var variables = { zacheta: "What school activities do you see on the picture?",pytanie0: '1',pytanie1: '2',pytanie2: '3',pytanie3: '4',pytanie4: '5',pytanie5: '6',hint1: 'enyoying a field trip',hint2: 'working on computers',hint3: 'taking a test',hint4: 'doing a project',hint5: 'giving a presentation',hint6: 'practicing yoga', };
            // Compile the template using underscore
            var template = _.template( $("#lesson1_template").html(), variables );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
        },
        events: {
            "click input[type=button]": "doAnswer"  
        },
        doAnswer: function( event ){

	    for ( var i = 0 ; i < 2 ; i++ )
	    {
	    klikacz.next();
	    if ( klikacz.get("count") % 2 == 0 ) {//dajemy odpowiedz
	    for ( var i = 0 ; i < 6 ; i++ )
	    {
		var user_answer = $('#pytanie'+i+'_input').val();
	    	var zad = mojaLekcja.findWhere({arkusz: 1,kolejnosc: i});
		var praw = zad.dajodpowiedz(user_answer);
		$('#ans'+i).html(( praw == true ? '<img src="images/icons/wrong.png"/>' : '<img src="images/icons/correct.png"/>' ));
		}
	    $('#odp_button0').css('background',"url('images/icons/refresh_white.png') no-repeat");
	    }
	    else { //refresh
	        for ( var i = 0 ; i < 6 ; i++ )
	    	{
		$('#pytanie'+i+'_input').val('');
		$('#ans'+i).html("");		
}

	    $('#odp_button0').css('background',"url('images/icons/tick_white.png') no-repeat");
		}
		}
        }
    });
    var lesson_view = new Lekcja0View({ el: $("#lekcja_container") });
	/* nawigacja */
    Suwak = Backbone.Model.extend({
        defaults: {
	    count: 0,/* numer makiety na ktorej wyswietlamy zadanie */
	    nmax: 1,
	    nmin: 0
        },
		next: function(){
			var nc = this.get("count");
			if ( nc < this.get("nmax") )
				nc++;
			this.set({count:nc});
		},
		prev: function(){
			var nc = this.get("count");
			if ( nc > this.get("nmin") ) 
				nc--;
			this.set({count:nc});
		}
    });
        var suwak = new Suwak({ count: 0});
     SuwakView = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            //Pass variables in using Underscore.js Template
            var variables = { count: suwak.get("count") };
            // Compile the template using underscore
            var template = _.template( $("#suwak_template").html(), variables );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
        },
        events: {
            "click #next": "doNext",
	    "click #prev": "doPrev"  
        },
        doNext: function( event ){
		suwak.next();
		var count = suwak.get("count");
		switch(count) { 
		case 0 : lesson_view.undelegateEvents();lesson_view = new Lekcja0View({ el: $("#lekcja_container") });klikacz.set({count: 1});;break;
		case 1 : lesson_view.undelegateEvents();lesson_view = new Lekcja1View({ el: $("#lekcja_container") });klikacz.set({count: 1});break;
		default : break;
		}

        },
	doPrev: function( event ){
		suwak.prev();
		var count = suwak.get("count");
		switch(count) { 
		case 0 : lesson_view.undelegateEvents();lesson_view = new Lekcja0View({ el: $("#lekcja_container") });klikacz.set({count: 1});break;
		case 1 : lesson_view.undelegateEvents();lesson_view = new Lekcja1View({ el: $("#lekcja_container") });klikacz.set({count: 1});break;
		default : break;
		}
        }
    });
    var suwak_view = new SuwakView({ el: $("#suwak_container") });
