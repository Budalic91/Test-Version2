var numberOfElement;
var countLoad = 1;
var countPosition = 1;
var count = 0;

$(document).ready(function() {
	showPartOfPost(1);
    showPartOfPost(2);
	searchPerformed();
	myFunction();
	submitItem();

	$(window).scroll(function(){
        if ($(window).scrollTop() > 100){
			if(countLoad <11)
			{
				countLoad ++;
				showPartOfPost(countLoad);
				var elementOnTop = $('#panel' + countPosition);
				$(document).scrollTop(elementOnTop.offset().top);
				countPosition += 10;
			}
        }
    });

	$(document).on('change','#inp_title',function()
	{
		if(!$(this).val())
		{
			$(this).removeClass('valid').addClass('invalid');
		}
		else if($(this).val())
		{
			$(this).removeClass('invalid').addClass('valid');
		}	
	});

	$('#div_body').on('change','#inp_body',function()
	{
		if(!$(this).val())
		{
			$(this).removeClass('valid').addClass('invalid');
		}
		else if($(this).val())
		{
			$(this).removeClass('invalid').addClass('valid');
		}	
	});

	 $(document).on('click', '.delete-me', function() { 
		var id = $(this).attr("id");
		var idPanel = id;
		showSpinner();

		if (id > 100)
		{
			id = 100;
		}

		$.ajax({
			url: 'https://jsonplaceholder.typicode.com/posts/' + id,
			type: 'DELETE',
			success: function(result) {
				console.log(result);
				$('#panel' + idPanel).remove();
			}
		});
		hideSpinner(); 
	});
	 
});

function myFunction() 
{
	$("div.tab-wrapper").click(function() 
    {
		$("div.tab-wrapper").removeClass('displayed');
		$(this).addClass('displayed');
		var linkId = $(this).attr('id');
		if(linkId === "allItems") {
			$('#divAllItems').show();
			$('#divNewItem').hide();
		}
		else if (linkId === "newItem") 
		{
			$('#divAllItems').hide();
			$('#divNewItem').show();
		}
	});
}

function showAllPosts() 
{
	showSpinner();
	$.ajax({
	type: "GET",
	url: "https://jsonplaceholder.typicode.com/posts",
	success: function(result)
	{
		console.log(result);
		var count2 = 0;

		for (propName in result) 
		{
			count2 ++;
			var expandableDiv = '<div id="panel' + count2 + '" class="panel panel-default lazy">';
			expandableDiv += '<div class="panel-heading">';
			expandableDiv += '<h4 class="panel-title">';
			expandableDiv += '<a class="links" data-toggle="collapse" href="#collapse' + count2 +'">' + result[propName]["title"] +'</a>';
			expandableDiv += '<button id="' + count2 + '" class="delete-me">Delete</button>';
			expandableDiv += '</h4>';
			expandableDiv += '</div>';
			expandableDiv += '<div id="collapse' + count2 +'" class="panel-collapse collapse">';
			expandableDiv += '<div class="panel-body">' + result[propName]["body"] +'</div>';
			expandableDiv += '</div></div></div>';		
			$('.panel-group').append(expandableDiv);	
		}
		numberOfElement = count2;
		hideSpinner();
	}
	});	
}

function showPartOfPost(uid) 
{
	showSpinner();
	$.ajax({
	type: "GET",
	url: "https://jsonplaceholder.typicode.com/posts/?userId=" + uid,
	success: function(result)
	{
		console.log(result);
		for (propName in result) 
		{
			count ++;
			var expandableDiv = '<div id="panel' + count + '" class="panel panel-default lazy">';
			expandableDiv += '<div class="panel-heading">';
			expandableDiv += '<h4 class="panel-title">';
			expandableDiv += '<a class="links" data-toggle="collapse" href="#collapse' + count +'">' + result[propName]["title"] +'</a>';
			expandableDiv += '<button id="' + count + '" class="delete-me">Delete</button>';
			expandableDiv += '</h4>';
			expandableDiv += '</div>';
			expandableDiv += '<div id="collapse' + count +'" class="panel-collapse collapse">';
			expandableDiv += '<div class="panel-body">' + result[propName]["body"] +'</div>';
			expandableDiv += '</div></div></div>';		
			$('.panel-group').append(expandableDiv);	
		}
		numberOfElement = count;
		hideSpinner();
	}
	});	
}

function searchPerformed() {
	$('#inp_search').on("keyup", function() {
		var value = $(this).val();
		$(".panel-group .panel-default").each(function() {
				$row = $(this);

				var id = $row.find("a.links").text();
				id = id.toLowerCase();
				value = value.toLowerCase();

				if (id.indexOf(value) === -1) {
					$row.hide();
				}
				else {
					$row.show();
				}
		});
	});
}

function addNewItem(titleItem, bodyItem, numberOfEl)
{
	showSpinner();
	$.ajax({
		url: "https://jsonplaceholder.typicode.com/posts",
		type: "POST",
		data: JSON.stringify({
			title: titleItem,
			body: bodyItem,
			userId: 1
		}),
		success: function(response){
			console.log(response);
			numberOfEl ++;
			var expandableNewDiv = '<div id="panel' + numberOfEl + '" class="panel panel-default lazy">';
			expandableNewDiv += '<div class="panel-heading">';
			expandableNewDiv += '<h4 class="panel-title">';
			expandableNewDiv += '<a class="links" data-toggle="collapse" href="#collapse' + numberOfEl +'">' + titleItem + '</a>';
			expandableNewDiv += '<button id="' + numberOfEl + '" class="delete-me">Delete</button>';
			expandableNewDiv += '</h4>';
			expandableNewDiv += '</div>';
			expandableNewDiv += '<div id="collapse' + numberOfEl +'" class="panel-collapse collapse">';
			expandableNewDiv += '<div class="panel-body">' + bodyItem +'</div>';
			expandableNewDiv += '</div></div></div>';		
			$('.panel-group').append(expandableNewDiv);
			hideSpinner();
		}
	});
}

function submitItem() 
{
	$('#btn_submit').click( function() {
        var newItem = $('#inp_title').val();
        var newBody = $('#inp_body').val();
        
        if (!newBody || !newItem){
			alert("Required fields must be filled out");
            return false;
        }
        else
        {
			alert("New item sucsses added");
			addNewItem(newItem, newBody, numberOfElement);
			$('#inp_title').val("");
			$('#inp_body').val("");
        }
    });
}

/*Spiner */
function hideSpinner() {
    $('.content-wrapper').show();
    $('.overlay').hide();
}

function showSpinner() {
    $('.content-wrapper').hide();
    $('.overlay').show();
}